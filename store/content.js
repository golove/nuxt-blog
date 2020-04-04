export const state = () => ({
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
    searchData: [],
    searchflag: false
})
export const mutations = {
    setdata(state, json) {
        state[json.type] = json.data
        state[json.type].reverse()
        // console.log(state[json.type])
    },
    pushdata(state, json) {
        state[json.type].unshift(json.data)
    },

    remove(state, json) {
        state[json.type].splice(json.n, 1)
    },
    shuffle(state, type) {
        state[type] = _.shuffle(state[type])
    },
    articleEdit(state, json) {
        state.article.forEach(e => {
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
        state.letters.forEach(e => {
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
            state.searchData = state.article.filter((el => {
                return el.author.indexOf(str) > -1 || el.type.indexOf(str) > -1
                    || returnFunc(el, str).length > 0 || (new Date(el.time).toLocaleDateString()).indexOf(str) > -1

            }))
        } else {
            state.searchflag = false
        }
    },

    searchMsgFunc(state, str) {
        if (str !== '') {
            state.letters = state.letters.filter((el => {
                return el.author.indexOf(str) > -1 || el.text.indexOf(str) > -1
                    || (new Date(el.time).toLocaleString()).indexOf(str) > -1
            }))
        } else {
            state.letters = state.letters2
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
    requestImg({ commit }) {
        this.$axios.get(`/api/picture`, {}).then(res => {
            commit('setdata', { type: 'pictures', data: res })
        })
    },
}