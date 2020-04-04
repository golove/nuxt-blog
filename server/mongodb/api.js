let Router = require('koa-router');
const Passport = require('../utils/passport.js')
const DB = require('./mongodb');


const router = new Router({
  prefix: '/api' // 路由前缀
})

router //bolgcontent
  .get('/myblog', async ctx => {
    // let pageSize = 10
    // let page = ctx.request.query.pa ge ? parseInt(ctx.request.query.page) : 1
    // let skip = (page - 1) * pageSize
    let json = {}
    console.log(ctx.request.body)
    if (ctx.request.body._id) {
      json = {
        _id: DB.setObjectId(ctx.request.body._id)
      }
    } else {
      json = ctx.request.body
    }
    let res = await DB.find('mynewblog', json);
    // console.log(ctx.request.body)
    ctx.body = res
  })

  .post('/insert', async ctx => {
    let res = await DB.insert('mynewblog', ctx.request.body);
    try {
      if (res.result.ok) {
        ctx.body = res
      }
    } catch (err) {
      console.log(err)
    }
  })


  .get('/letters', async ctx => {
    // let pageSize = 10
    // let page = ctx.request.query.pa ge ? parseInt(ctx.request.query.page) : 1
    // let skip = (page - 1) * pageSize
    let json = {}
    // console.log(ctx.request.body)
    if (ctx.request.body._id) {
      json = {
        _id: DB.setObjectId(ctx.request.body._id)
      }
    } else {
      json = ctx.request.body
    }
    let res = await DB.find('letters', json);
    // console.log(ctx.request.body)
    ctx.body = res
  })

  .post('/insertletters', async ctx => {

    let res = await DB.insert('letters', ctx.request.body);
    try {
      if (res.result.ok) {
        ctx.body = res
      }
    } catch (err) {
      console.log(err)
    }
  })
  .post('/addArrayletters', async ctx => {
    let e = ctx.request.body
    let id = e.id
    delete (e.id)
    let res = await DB.updateArray('letters', { _id: DB.setObjectId(id) }, e);
    try {
      if (res.result.ok) {
        ctx.body = "更新成功"
      }
    } catch (err) {
      console.log(err)
    }
  })

  .post('/delArrayletters', async ctx => {
    let e = ctx.request.body
    let id = e.id
    delete (e.id)
    let res = await DB.deleteArray('letters', { _id: DB.setObjectId(id) }, e);
    try {
      if (res.result.ok) {
        ctx.body = "更新成功"
      }
    } catch (err) {
      console.log(err)
    }
  })

  .post('/updateIntletters', async ctx => {
    let e = ctx.request.body
    let id = e.id
    delete (e.id)
    console.log(e)
    let res = await DB.updateInt('letters', { _id: DB.setObjectId(id) }, e);
    ctx.body = {
      status: 200,
      msg: 'ok',
      data: res
    }

  })
  //删除blog
  .post("/deleteletters", async ctx => {
    let id = ctx.request.body._id;
    // let artid = ctx.request.body.articleId
    // let msgres = await DB.delete('msgboard', {
    //   articleId: artid
    // })

    let res = await DB.update('letters', {
      _id: DB.setObjectId(id)
    }, {
      delete: true
    })
    if (res.result.ok) { // && msgres.result.ok
      ctx.body = "删除成功"
    }
  })


  // 上传头像图片
  .post("/uploadavatar", async ctx => {
    let res = await DB.insert('avatar', ctx.request.body);
    try {
      if (res.result.ok) {
        ctx.body = res
      }
    } catch (err) {
      console.log(err)
    }
  })
  // 请求头像数据
  .get('/dlavatar', async ctx => {
    let res = await DB.find('avatar', ctx.request.body);
    console.log(res)
    ctx.body = res

  })


  .post('/addArray', async ctx => {
    let e = ctx.request.body
    let id = e.id
    delete (e.id)
    let res = await DB.updateArray('mynewblog', { _id: DB.setObjectId(id) }, e);
    try {
      if (res.result.ok) {
        ctx.body = "更新成功"
      }
    } catch (err) {
      console.log(err)
    }
  })

  .post('/delArray', async ctx => {
    let e = ctx.request.body
    let id = e.id
    delete (e.id)
    let res = await DB.deleteArray('mynewblog', { _id: DB.setObjectId(id) }, e);
    try {
      if (res.result.ok) {
        ctx.body = "更新成功"
      }
    } catch (err) {
      console.log(err)
    }
  })

  .post('/updateInt', async ctx => {
    let e = ctx.request.body
    let id = e.id
    delete (e.id)
    console.log(e)
    let res = await DB.updateInt('mynewblog', { _id: DB.setObjectId(id) }, e);
    ctx.body = {
      status: 200,
      msg: 'ok',
      data: res
    }

  })
  //删除blog
  .post("/delete", async ctx => {
    let id = ctx.request.body._id;
    // let artid = ctx.request.body.articleId
    // let msgres = await DB.delete('msgboard', {
    //   articleId: artid
    // })

    let res = await DB.update('mynewblog', {
      _id: DB.setObjectId(id)
    }, {
      delete: true
    })
    if (res.result.ok) { // && msgres.result.ok
      ctx.body = "删除成功"
    }
  })


  // msgboard
  .post('/msgSearch', async ctx => {
    let res = await DB.find('msgboard', ctx.request.body);
    ctx.body = res
  })

  .post('/msgInsert', async ctx => {
    let res = await DB.insert('msgboard', ctx.request.body);
    try {
      if (res.result.ok) {
        ctx.body = res
      }
    } catch (err) {
      console.log(err)
    }
  })

  .post('/msgUpdate', async ctx => {
    let id = ctx.request.body.id;
    let like = ctx.request.body.like;
    let res = await DB.update('msgboard', {
      _id: DB.setObjectId(id)
    }, {
      like
    });
    try {
      if (res.result.ok) {
        ctx.body = "更新成功"
      }
    } catch (err) {
      console.log(err)
    }
  })


  .post('/msgDel', async ctx => {
    let id = ctx.request.body._id
    let res = await DB.remove('msgboard', {
      _id: DB.setObjectId(id)
    });
    try {
      if (res.result.ok) {
        ctx.body = "删除成功";
      }
    } catch (err) {
      console.log(err)
    }
  })


  // 用户登录注册api

  .get('/getUser', async (ctx) => {
    // 判断用户是否登录，Passport内置的
    if (ctx.isAuthenticated()) {
      const {
        name,
        email
      } = ctx.session.passport.user
      ctx.body = {
        name,
        email
      }
    } else {
      ctx.body = {
        user: '',
        email: ''
      }
    }

  })
  // 注册

  .post('/signup', async (ctx) => {

    let name = ctx.request.body.name
    let email = ctx.request.body.email
    let user = await DB.find('users', {
      name
    })
    let uemail = await DB.find('users', {
      email
    })
    // console.log(user)
    if (user.length === 0 && uemail.length === 0) {
      // 创建新用户
      let res = await DB.insert('users', ctx.request.body);
      console.log(res)
      try {
        if (res.result.ok) {
          ctx.body = {
            status: 200,
            data: {
              "name": res.ops[0].name,
              "id": res.ops[0]._id,
              "email": res.ops[0].email,
              "avatar": res.ops[0].avatar,
              "delFlag": res.ops[0].delflag,
              "tel": res.ops[0].tel,
              "time": res.ops[0].createdate,
              "gender": res.ops[0].gender,
              "age": res.ops[0].age,
              "signature": res.ops[0].signature,
            },
            msg: '注册成功'
          }
        }
      } catch (error) {
        ctx.body = {
          status: 0,
          msg: '注册失败'
        }
        console.log(error);
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '该用户名或者邮箱已被注册,请从新输入!'
      }
    }

  })
  // 登录
  .post('/signin', async (ctx) => {
    let res = await DB.find('users', ctx.request.body);
    console.log(ctx.request.body)
    try {

      ctx.body = {
        status: 200,
        data: {
          "name": res[0].name,
          "id": res[0]._id,
          "email": res[0].email,
          "avatar": res[0].avatar,
          "delflag": res[0].delflag,
          "tel": res[0].tel,
          "time": res[0].createdate,
          "gender": res[0].gender,
          "age": res[0].age,
          "signature": res[0].signature,
        },
        msg: '登录成功'
      }

    } catch (error) {
      ctx.body = {
        status: 0,
        msg: '登录失败'
      }
      console.log(error);
    }
  })

  // 更新用户信息
  .post('/updateUser', async (ctx) => {
    let data = ctx.request.body;
    let id = data.id;
    delete (data.id)
    let res = await DB.update('users', {
      '_id': DB.setObjectId(id)
    }, data);
    try {
      if (res.result.ok) {
        ctx.body = res
      }
    } catch (err) {
      console.log(err);
    }
  })

  // 图片上传
  .post('/upload', async ctx => {
    console.log(ctx)
  })

// 本地登录
// return Passport.authenticate('local', function (err, user, info, status) {
//   if (err) {
//     ctx.body = {
//       status: -1,
//       msg: err
//     }
//   } else {
//     if (user) {
//       ctx.body = {
//         status: 200,
//         msg: '登录成功',
//         user: {
//           userName: user.userName,
//           email: user.userPwd
//         }
//       }
//       // Passport中间件带的ctx.login
//       return ctx.login(user)
//     } else {
//       ctx.body = {
//         status: 0,
//         msg: info
//       }
//     }
//   }
// })(ctx, next)
// })

// 退出登录
router.get('/exit', async (ctx) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      status: 200,
      msg: '退出登录'
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

  // picture服务端api
  // picture 数据库查询 api


  .get('/picture', async ctx => {

    let res = await DB.find('picture', ctx.request.body, 60);
    // console.log(res);
    ctx.body = res

  })

  .post('/searchArray', async ctx => {

    let res = await DB.find('picture', ctx.request.body);

    ctx.body = res

  })

  //  picture写入api
  .post('/wpicture', async ctx => {

    let res = await DB.insert('picture', ctx.request.body);
    try {
      if (res.result.ok) {
        ctx.body = '写入成功';
      }
    } catch (err) {
      console.log(err);
    }
  })
  // picture编辑api
  .post('/epicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    delete (data._id)

    let res = await DB.update('picture', {
      '_id': DB.setObjectId(id)
    }, data);

    try {
      if (res.result.ok) {
        ctx.body = res
      }
    } catch (err) {
      console.log(err);
    }

  })
  // picture edit for array
  .post('/arrEpicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    delete (data._id)

    let res = await DB.updateArray('picture', {
      '_id': DB.setObjectId(id)
    }, data);

    ctx.body = {
      status: 200,
      msg: 'ok',
      data: res
    }
  })

  .post('/arrDpicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    delete (data._id)

    let res = await DB.deleteArray('picture', {
      '_id': DB.setObjectId(id)
    }, data);

    ctx.body = {
      status: 200,
      msg: 'ok',
      data: res
    }
  })

  // picture删除api (是假的删除)
  .post('/fdpicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    let delflag = data.delflag;
    let res = await DB.update('picture', {
      '_id': DB.setObjectId(id)
    }, {
      delflag
    });
    try {
      if (res.result.ok) {
        ctx.body = '移除成功;'
      }
    } catch (err) {
      console.log(err)
    }

  })

  // picture删除api (是真的删除)
  .post('/dpicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    console.log(id)
    let res = await DB.remove('picture', {
      '_id': DB.setObjectId(id)
    });
    try {
      if (res.result.ok) {
        ctx.body = '删除成功';
      }
    } catch (error) {
      console.log(error);
    }

  })



  .post('/image', async ctx => {
    console.log(ctx.request.body);
    let res = await DB.find('image', ctx.request.body, 60);

    ctx.body = res

  })

  .post('/imgArray', async ctx => {

    let res = await DB.find('image', ctx.request.body);

    ctx.body = res

  })

  //  image写入api
  .post('/wimage', async ctx => {

    let res = await DB.insert('image', ctx.request.body);
    try {
      if (res.result.ok) {
        ctx.body = '写入成功';
      }
    } catch (err) {
      console.log(err);
    }
  })
  // image编辑api
  .post('/eimage', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    delete (data._id)

    let res = await DB.update('image', {
      '_id': DB.setObjectId(id)
    }, data);

    try {
      if (res.result.ok) {
        ctx.body = res
      }
    } catch (err) {
      console.log(err);
    }

  })
  // image edit for array
  .post('/arrEimage', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    delete (data._id)

    let res = await DB.updateArray('image', {
      '_id': DB.setObjectId(id)
    }, data);
    ctx.body = res


  })

  // image删除api (是假的删除)
  .post('/fdimage', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    let delflag = data.delflag;
    let res = await DB.update('image', {
      '_id': DB.setObjectId(id)
    }, {
      delflag
    });
    try {
      if (res.result.ok) {
        ctx.body = '移除成功;'
      }
    } catch (err) {
      console.log(err)
    }

  })

  // image删除api (是真的删除)
  .post('/dimage', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    console.log(id)
    let res = await DB.remove('image', {
      '_id': DB.setObjectId(id)
    })
  })

module.exports = router;