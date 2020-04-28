
export const state = () => ({

  user: {},
  myCollects: [],
  myArticle: [],
})


export const getters = {
  manageArticle: state => {

    let usersArts = state.content.article.filter(e => {
      return e.author === state.user.name
    })

    let arr = usersArts.map(e => {
      let titles = [];
      for (const el of e.blocks) {
        if (el.type === "header") {
          titles.push(el.data.text)
        }
      }
      return {
        id: e._id,
        type: e.type,
        title: titles[0],
        comment: e.reply.length,
        like: e.like.length,
        see: e.see,
        collect: e.collect.length
      }
    })
    console.log(arr)
    return arr
  }
}

export const mutations = {
  //user login 
  USERLOGIN(state, json) {
    state.user = json.user;
    //save login infomations
    if (json.flag) {
      window.sessionStorage.setItem('user', JSON.stringify(json.user))
    }

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
            this.$axios.post('/delArray', { id: e._id, [json.type]: state.user.name })
              .then(res => {
                console.log(res)
              })
          } else {
            e[json.type].push(state.user.name)
            this.$axios.post('/addArray', { id: e._id, [json.type]: state.user.name })
              .then(res => {
                console.log(res)
              })
          }
        } else if (json.type === 'see') {
          e[json.type]++
          this.$axios.post('/updateInt', { id: e._id, see: 1 })
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

            this.$axios.post('/delArrayletters', { id: e._id, [json.type]: state.user.name })

          } else {
            e[json.type].push(state.user)

            this.$axios.post('/addArrayletters', { id: e._id, [json.type]: state.user.name })

          }
        } else if (json.type === 'see') {
          e[json.type]++
          this.$axios.post('/updateIntletters', { id: e._id, see: 1 })
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

  filterdatas(state) {

    for (let e of state.content.article) {
      let n = e.collect.indexOf(state.user.name)

      if (n > -1) {
        state.myCollects.push(e)
      }
      if (state.user.name === e.author) {
        state.myArticle.push(e)
      }
    }
  },

}


export const actions = {


  // user login
  userlogin({
    commit
  }, data) {
    commit('USERLOGIN', data);
  },
  // user exit
  userexit({
    commit
  }) {
    commit('USEREXIT');
    this.$axios.get("/exit").then(res => {
      if (res.status == 200) {
        this.$router.push({ path: '/' });
      }
    });
  },

}
