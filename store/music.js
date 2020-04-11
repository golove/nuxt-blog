export const state = () => ({
    musicserve: "http://39.105.168.171:3000",

    user: {},
    song: {},
    songDetail: {},
    songs: [],
    searchSong: {},
    playlist: [],
    album: {},
    albums: [],
    playing: false,
    songsInfo: {}

})

export const mutations = {

    // 音乐相关
    getmusic(state, json) {
        state[json.type] = json.data
        // console.log(state.album)
    },
    pushMusic(state, e) {
        state.playlist.unshift(e)
    },

    // 当音频播放
    onPlay(state) {
        state.playing = true
    },
    // 当音频暂停
    onPause(state) {
        state.playing = false
    },

}

export const actions = {
    // 列表选择播放
    playlist({ state, commit, dispatch }, data) {

        if (state.playlist.indexOf(data) < 0) {
            commit('pushMusic', data)
        }
        commit('getmusic', { type: 'songsInfo', data })

        dispatch(
            'reqMusic',
            { api: '/song/url?id=' + data.id, type: 'song' }
        )
        if (data.album) {
            dispatch('reqMusic', { type: 'album', api: '/album?id=' + data.album.id })
        }
    },
    //切换上一曲
    lastMusic({ state, commit, dispatch }) {
        state.playlist.forEach((element, index) => {
            if (element.id === state.song.id) {
                if (index - 1 >= 0) {
                    dispatch('playlist', state.playlist[index - 1])
                } else {
                    dispatch('playlist', state.playlist[state.playlist.length - 1])
                }
            }
        })
    },
    //切换下一曲
    nextMusic({ state, commit, dispatch }) {
        state.playlist.forEach((element, index) => {
            if (element.id === state.song.id) {
                if (index + 1 === state.playlist.length) {
                    dispatch('playlist', state.playlist[0])
                } else {
                    dispatch('playlist', state.playlist[index + 1])
                }
            }
        })
    },


    async reqMusic({ state, commit }, json) {
        let res = await this.$axios.get(state.musicserve + json.api)
        if (res.result) { commit('getmusic', { type: json.type, data: res.result }) }
        else if (res.album) {
            commit('getmusic', { type: json.type, data: res.album })
        } else if (res.data) {
            commit('getmusic', { type: json.type, data: res.data[0] })
        }


    },


    getplaylist({ state, commit, dispatch }, json) {

        this.$axios
            .get(state.musicserve + '/playlist/detail?id=' + json.id)
            .then(res => {
                // commit('getmusic', { type: 'album', data: res })
                // 获取歌单全部歌曲id来请求歌曲
                //   console.log(res.playlist.trackIds)
                let idlists = []
                res.playlist.trackIds.forEach((e, i) => {
                    idlists.push(e.id)
                })
                this.$axios
                    .get(
                        state.musicserve +
                        '/song/detail?ids=' +
                        idlists.join(',')
                    )
                    .then(res => {
                        let ar = Object.keys(state.song)
                        if (ar.length === 0) {
                            dispatch('playlist', res.songs[0])
                        }
                        commit('getmusic', { type: 'songs', data: res.songs })
                        commit('getmusic', { type: 'playlist', data: res.songs })



                    })
            })
    }
}

