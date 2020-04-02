export const state = () => ({
  user: {},
  searchflag: false,
  content: {
    letters: [],
    letters2: [],
    avatars: [],
    article: [],
    article2: [],
    jokes: [],
    news: [],
    pictures: [],
    collectPic: [],
    types: [],
    userList: [],
    userArticle: [],
    myArticle: [],
    collect: [],
    comment: [],
    searchData: []
  },
  musicserve: "http://39.105.168.171:3000",
  music: {
    user: {},
    song: {},
    songDetail: {},
    songs: [],
    searchSong: {},
    playlist: [],
    album: {},
    album2: {},
    albums: [],
    playing: false,
    songsInfo: {}
  },
})

export const mutations = {
  setdata(state, json) {
    state.content[json.type] = json.data
    state.content[json.type].reverse()
    // console.log(state.content[json.type])
  },
  pushdata(state, json) {
    state.content[json.type].unshift(json.data)
  },

  remove(state, json) {
    state.content[json.type].splice(json.n, 1)
  },
  shuffle(state, type) {
    state.content[type] = _.shuffle(state.content[type])
  },

  // 

  // 音乐相关
  getmusic(state, json) {
    state.music[json.type] = json.data
    // console.log(state.music.album)
  },
  pushMusic(state, e) {
    state.music.playlist.unshift(e)
  },

  // 当音频播放
  onPlay(state) {
    state.music.playing = true
  },
  // 当音频暂停
  onPause(state) {
    state.music.playing = false
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

  // 
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
  changeflag(state) {
    state.searchflag = false
  },
  searchFunc(state, str) {
    if (str !== '') {
      state.searchflag = true
      state.content.searchData = state.content.article.filter((el => {
        return el.author.indexOf(str) > -1 || el.type.indexOf(str) > -1
          || returnFunc(el, str).length > 0 || (new Date(el.time).toLocaleDateString()).indexOf(str) > -1

      }))
    } else {
      state.searchflag = false
    }
  },

  searchMsgFunc(state, str) {
    if (str !== '') {
      state.content.letters = state.content.letters.filter((el => {
        return el.author.indexOf(str) > -1 || el.text.indexOf(str) > -1
          || (new Date(el.time).toLocaleString()).indexOf(str) > -1
      }))
    } else {
      state.content.letters = state.content.letters2
    }

  }

}

// 字符串搜索方法
function returnFunc(el, str) {
  let res = []
  res = el.blocks.filter(e => {
    if (e.data.text) {
      return e.data.text.indexOf(str) > -1
    }
  })
  return res
}


export const actions = {
  async getdata({ commit }, json) {
    let res = await this.$axios.get(json.api)
    if (json.type === 'letters') {
      commit('setdata', { type: 'letters2', data: res })
    }

    if (res instanceof Array) {
      commit('setdata', { type: json.type, data: res })
    } else {
      if (res.data instanceof Array) {
        commit('setdata', { type: json.type, data: res.data })
      } else {
        commit('setdata', { type: json.type, data: res.data.list })
      }
    }
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


  // 列表选择播放
  playlist({ state, commit, dispatch }, data) {

    if (state.music.playlist.indexOf(data) < 0) {
      commit('pushMusic', data)
    }
    commit('getmusic', { type: 'songsInfo', data })
    dispatch(
      'reqSong',
      { api: '/song/url?id=' + data.id, type: 'song' }
    )
    if (data.album) {
      dispatch('reqAlbum', { type: 'album', api: '/album?id=' + data.album.id })
    }
  },
  //切换上一曲
  lastMusic({ state, commit, dispatch }) {
    state.music.playlist.forEach((element, index) => {
      if (element.id === state.music.song.id) {
        if (index - 1 >= 0) {
          dispatch('playlist', state.music.playlist[index - 1])
        } else {
          dispatch('playlist', state.music.playlist[state.music.playlist.length - 1])
        }
      }
    })
  },
  //切换下一曲
  nextMusic({ state, commit, dispatch }) {
    state.music.playlist.forEach((element, index) => {
      if (element.id === state.music.song.id) {
        if (index + 1 === state.music.playlist.length) {
          dispatch('playlist', state.music.playlist[0])
        } else {
          dispatch('playlist', state.music.playlist[index + 1])
        }
      }
    })
  },


  async reqSong({ state, commit }, json) {
    let res = await this.$axios.get(state.musicserve + json.api)
    commit('getmusic', { type: json.type, data: res.data[0] })

  },
  async reqAlbum({ state, commit }, json) {
    let res = await this.$axios.get(state.musicserve + json.api)
    commit('getmusic', { type: json.type, data: res.album })
    // commit('getmusic',{type:'playlist',data:res.songs})
  },

  async reqMusic({ state, commit }, json) {
    let res = await this.$axios.get(state.musicserve + json.api)
    commit('getmusic', { type: json.type, data: res.result })

  },

  requestImg({ commit }) {
    this.$axios.get(`/api/picture`, {}).then(res => {
      commit('getdata', { type: 'pictures', data: res })
    })
  },


}