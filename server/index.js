
const Koa = require('koa')
const session = require('koa-generic-session')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const consola = require('consola')
const Redis = require('koa-redis')
const passport = require('./utils/passport');
const {
  Nuxt,
  Builder
} = require('nuxt')

const app = new Koa()
DB = require('./mongodb/mongodb');

//跨域解决方案
app.use(cors());



//配置bodyparser的中间件
app.use(bodyParser());


app.use(passport.initialize())

app.use(passport.session())

app.keys = ['xiaofeiiloveyou']

//配置session中间件
app.use(session({
  key: 'fin',
  prefix: 'fin:uid',
  maxAge: 1000,
  /** (number) maxAge in ms (default is 1 days)，cookie的过期时间 */
  overwrite: true,
  /** (boolean) can overwrite or not (default true) */
  httpOnly: true,
  /** cookie是否只有服务器端可以访问 (boolean) httpOnly or not (default true) */
  signed: true,
  /** (boolean) signed or not (default true) */
  store: new Redis() // 将session存入redis 不传options 默认就是连接127.0.0.1:6379
}))



// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 80
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  const myblog = require('./mongodb/api');
  app.use(myblog.routes()).use(myblog.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })





  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
