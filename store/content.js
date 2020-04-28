import FiltterType from './FiltterType'

export const state = () => ({

    letters: [],
    letters2: [],
    avatars: [],
    article: [],
    noticewords: [],
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
    searchflag: false,
    string: ''
})

// export const getters = () => ({
//     category: state => {
//         let arr = state.article.map(e => {
//             return e.type
//         })

//         return Array.from(new Set(arr))
//     }
// })

export const getters = {
    categoryType: state => {
        let arr = state.article.map(e => {
            return e.type
        })
        let arrFil = new FiltterType(Array.from(new Set(arr)))
        return arrFil.types
    },
    categoryUser: state => {
        let arr = state.article.map(e => {
            return { author: e.author, avatar: e.avatar }
        })
        // 对象数组去重
        let result = arr.reduce((prev, cur) => {
            const ids = prev.map(item => item.author)
            return ids.includes(cur.author) ? prev : [...prev, cur]
        }, []);

        let arrFil = new FiltterType(result)
        return arrFil.types
    },

}

export const mutations = {
    setdata(state, json) {
        state[json.type] = json.data
        // console.log(state[json.type])
    },
    pushdata(state, json) {
        state[json.type].unshift(json.data)
    },

    remove(state, json) {
        state[json.type].splice(json.n, 1)
    },
    deletedata(state, json) {

        state[json.type].forEach((e, i) => {
            if (e[json.key] === json.node) {
                state[json.type].splice(i, 1)
            }
        })


    },
    shuffle(state, type) {
        state[type] = _.shuffle(state[type])
    },

    changeflag(state) {
        state.searchflag = false
    },
    searchFunc(state, str) {
        if (str !== '') {
            state.searchflag = true
            state.string = str
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
                console.log(res)
                // commit('setdata', { type: json.type, data: res.data.list })
            }
        }
    },
    requestImg({ commit }) {
        this.$axios.get(`/picture`, {}).then(res => {
            commit('setdata', { type: 'pictures', data: res })
        })
    },
}