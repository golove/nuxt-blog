<template>
  <v-card flat color="transparent">
    <v-img
      style="position: absolute ;width: 100%;height: auto;filter: blur(55px);opacity:0.2;z-index: 0"
      v-if="$store.state.music.album"
      :src="$store.state.music.album.picUrl?$store.state.music.album.picUrl:$store.state.music.album.coverImgUrl"
    ></v-img>
    <v-list-item three-line>
      <v-list-item-avatar size="220">
        <v-img
          :class="$store.state.music.playing?'cycleimg':''"
          v-if="$store.state.music.album"
          :src="$store.state.music.album.picUrl?$store.state.music.album.picUrl:$store.state.music.album.coverImgUrl"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content class="align-self-start">
        <v-list-item-title class="mb-2" v-text="$store.state.music.songsInfo.name"></v-list-item-title>
        <v-list-item-subtitle v-text="'专辑名'"></v-list-item-subtitle>
        <v-list-item-subtitle v-text="$store.state.music.album.name"></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content
        class="lyricstyle"
        style="height: 250px;overflow: auto"
      >{{musicLyric?musicLyric.lyric:'没有歌词'}}</v-list-item-content>
    </v-list-item>
    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-row>
        <v-col lg="8">
          <template v-for="(item, index) in musicCommentHot">
            <v-list-item three-line :key="item.id" @click>
              <v-list-item-avatar>
                <v-img :src="item.user.avatarUrl"></v-img>
              </v-list-item-avatar>
              <v-list-item-content class="pa-0">
                <v-list-item-subtitle>
                  <a style="text-decoration:none" href>{{item.user.nickname}}</a>
                  : {{item.content}}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <span>{{new Date(item.time).toLocaleDateString() }}</span>
                  <v-list-item-icon>
                    <v-icon x-small color="red">mdi-music-circle</v-icon>
                  </v-list-item-icon>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mb-4" v-if="index + 1 < musicCommentHot.length" inset :key="index"></v-divider>
          </template>
        </v-col>
        <v-col lg="4">
          <v-list three-line color="transparent">
            <v-subheader v-text="'包含此歌的歌单'"></v-subheader>
            <v-divider inset></v-divider>
            <template v-for="(item) in RelatedRecommend">
              <v-list-item :key="item.title" @click="getMusicAlbumm(item)">
                <v-list-item-avatar tile>
                  <v-img :src="item.coverImgUrl"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{item.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{item.description}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-subheader>相似歌曲</v-subheader>
            <v-divider inset></v-divider>
            <template v-for="(item) in similarSongs">
              <v-list-item :key="item.id" @click="getPlay(item)">
                <v-list-item-avatar size="45" tile>
                  <v-img :src="item.album.blurPicUrl"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle>{{item.name}}({{item.alias[0]}})</v-list-item-subtitle>
                  <v-list-item-subtitle>{{item.artists[0].name}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-subheader>喜欢这首歌的人</v-subheader>
            <v-divider inset></v-divider>
            <!-- <template v-for="(item) in similarSongs">
              <v-list-item :key="item.id" @click>
                <v-list-item-avatar size="45" tile>
                  <v-img :src="item.album.blurPicUrl"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle>{{item.name}}({{item.alias[0]}})</v-list-item-subtitle>
                  <v-list-item-subtitle>{{item.artists[0].name}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>-->
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      // 歌曲评论
      musicCommentHot: [],
      musicComment: [],
      //相关推荐歌单
      RelatedRecommend: [],
      // 相似歌曲
      similarSongs: [],
      // 喜欢此歌的人
      likeUser: [],
      // 歌词
      musicLyric: {}
    }
  },

  methods: {
    getMusicAlbumm(e) {
      this.$store.commit('getmusic', { type: 'album', data: e })
      this.$router.push('/music/albumDetail')
      this.$axios
        .get(this.$store.state.musicserve + '/playlist/detail?id=' + e.id)
        .then(res => {
          this.musicCardFlag = false //musicAlbum && !musicCardFlag
          // 获取歌单全部歌曲id来请求歌曲
          //   console.log(res.playlist.trackIds)
          let idlists = []
          res.playlist.trackIds.forEach((e, i) => {
            idlists.push(e.id)
          })

          this.$axios

            .get(
              this.$store.state.musicserve +
                '/song/detail?ids=' +
                idlists.join(',')
            )
            .then(res => {
              this.$store.commit('getmusic', { type: 'songs', data: res.songs })
              // this.$store.commit('getmusic',{type:'playlist',data:res.songs})
            })
        })
    },

    // 获取歌曲评论
    getMusicComment() {
      this.$axios
        .get(
          this.$store.state.musicserve +
            '/comment/music?id=' +
            this.$store.state.music.song.id
        )
        .then(res => {
          //   console.log(res)
          this.musicCommentHot = res.hotComments
          this.musicComment = res.comments
        })
    },
    // 获取歌词
    // /lyric?id=33894312
    getMusicLyric() {
      this.$axios
        .get(
          this.$store.state.musicserve +
            '/lyric?id=' +
            this.$store.state.music.song.id
        )
        .then(res => {
          //   console.log(res)

          this.musicLyric = res.lrc
        })
    },
    // 获取相关歌单
    getRelatedRecommend() {
      // /simi/playlist?id=
      this.$axios
        .get(
          this.$store.state.musicserve +
            '/simi/playlist?id=' +
            this.$store.state.music.song.id
        )
        .then(res => {
          //   console.log(res)  sideTitle
          this.RelatedRecommend = res.playlists
        })
    },
    // 获取相似歌曲 similarSongs
    getSimilarSongs() {
      // /simi/playlist?id=
      this.$axios
        .get(
          this.$store.state.musicserve +
            '/simi/song?id=' +
            this.$store.state.music.song.id
        )
        .then(res => {
          //   console.log(res)
          this.similarSongs = res.songs
        })
    },
    // 播放相似歌曲
    getPlay(e) {
      this.$store.dispatch('playlist', e)
    },
    getLikeUser() {
      //  /simi/user?id=
      this.$axios
        .get(
          this.$store.state.musicserve +
            '/simi/user?id=' +
            this.$store.state.music.song.id
        )
        .then(res => {
          console.log(res)
          //   this.likeUser = res
        })
    }
  },
  activated() {
    this.getMusicComment()
    this.getMusicLyric()
    this.getRelatedRecommend()
    this.getSimilarSongs()
  },
  computed: {
    changed: function() {
      return this.$store.state.music.songsInfo
    }
  },
  watch: {
    changed: {
      handler(n, o) {
        this.getMusicComment()
        this.getMusicLyric()
        this.getRelatedRecommend()
        this.getSimilarSongs()
      },
      deep: true
    }
  }
}

// this.getLikeUser()
</script>

<style>
.cycleimg {
  animation: cyclepic 6s linear infinite forwards;
}
@keyframes cyclepic {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

/*滚动条样式*/
.lyricstyle::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 0px;
}

.lyricstyle::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(230, 203, 233, 0.2);
  background: rgba(255, 255, 255, 0.3);
}

.lyricstyle::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(223, 206, 235, 0.2);
  border-radius: 5px;
  background: rgba(234, 204, 235, 0.1);
}
</style>
