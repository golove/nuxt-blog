
export const state = () => ({
  token: '',
  user: {}
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },

  //user login 
  USERLOGIN(state, user) {
    state.user = user;
    //save login infomations
    window.sessionStorage.setItem('user', JSON.stringify(user))
  },
  //user exit
  USEREXIT(state) {
    state.user = {};
    window.sessionStorage.removeItem('user');
  },
  articleEdit(state, json) {
    state.content.article.forEach(e => {
      if (e._id === json.data._id) {
        if (e[json.type] instanceof Array) {
          let n = e[json.type].indexOf(state.user.name)
          if (n > -1) {
            e[json.type].splice(n, 1)
            this.$axios.post('/api/delArray', { id: e._id, [json.type]: state.user.name })
              .then(res => {
                console.log(res)
              })
          } else {
            e[json.type].push(state.user.name)
            this.$axios.post('/api/addArray', { id: e._id, [json.type]: state.user.name })
              .then(res => {
                console.log(res)
              })
          }
        } else if (json.type === 'see') {
          e[json.type]++
          this.$axios.post('/api/updateInt', { id: e._id, see: 1 })
            .then(res => {
              console.log(res)
            })

        }
      } else if (e._id === json.data.articleId) {
        if (json.type === 'reply') {
          e.reply.unshift(json.data)

        }
      }
    })
  },


  lettersEdit(state, json) {
    state.content.letters.forEach(e => {
      if (e._id === json.data._id) {
        if (e[json.type] instanceof Array) {
          let n = e[json.type].indexOf(state.user.name)
          if (n > -1) {
            e[json.type].splice(n, 1)

            this.$axios.post('/api/delArrayletters', { id: e._id, [json.type]: state.user.name })

          } else {
            e[json.type].push(state.user)

            this.$axios.post('/api/addArrayletters', { id: e._id, [json.type]: state.user.name })

          }
        } else if (json.type === 'see') {
          e[json.type]++
          this.$axios.post('/api/updateIntletters', { id: e._id, see: 1 })
            .then(res => {
              console.log(res)
            })

        }
      } else if (e._id === json.data.articleId) {
        if (json.type === 'reply') {
          e.reply.unshift(json.data)

        }
      }
    })
  },

}


export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let cookie = req.headers.cookie;

    // 将cookie转成json对象（自己实现该方法）
    let token = cookieparse(cookie).token;
    commit('setToken', token);
  },

  // user login
  userlogin({
    commit
  }, data) {
    commit('USERLOGIN', data);
  },
  // user exit
  userexit({
    commit
  }, data) {
    commit('USEREXIT');
  },

}
