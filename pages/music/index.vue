<template>
  <v-card flat color="rgba(255,255,255,0)">
    <v-row v-if="$store.state.music.albums.length>0" justify="center">
      <v-col
        lg="2"
        md="3"
        sm="4"
        xs="12"
        v-for="(item,index) in $store.state.music.albums.slice((page-1)*nums,page*nums)"
        :key="index"
      >
        <v-card flat color="rgba(255,255,255,0.6)" @click.stop="getMusicAlbumm(item)">
          <v-img :src="item.picUrl" :lazy-src="item.picUrl">
            <v-card-text class="white--text">{{item.copywriter}}</v-card-text>
          </v-img>

          <v-list-item color="transparent" three-line>
            <v-list-item-subtitle v-text="item.name"></v-list-item-subtitle>
            <v-btn @click.stop="playnow(item)" color="red" icon>
              <v-icon>mdi-arrow-right-drop-circle</v-icon>
            </v-btn>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="Math.ceil($store.state.music.albums.length/nums)>1" class="text-center">
      <v-pagination
        circle
        v-model="page"
        :length="Math.ceil($store.state.music.albums.length/nums)"
      ></v-pagination>
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      nums: 36,
      page: 1,
      model: 'tab-2',
      musicItems: [
        { title: '个性推荐', url: '' },
        { title: '歌单', url: '' },
        { title: '歌手', url: '' },
        { title: '最新音乐', url: '' }
      ],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    ...mapActions(['reqSong', 'reqMusic', 'lastMusic', 'nextMusic']),
    ...mapMutations(['getmusic']),
    getMusicAlbumm(e) {
      this.$router.push('/music/albumDetail')
      this.playlist(e)
    },
    playnow(e) {
      this.playlist(e)
      this.nextMusic()
    },
    playlist(e) {
      this.getmusic({ type: 'album', data: e })
      this.$axios
        .get(this.$store.state.musicserve + '/playlist/detail?id=' + e.id)
        .then(res => {
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
              this.getmusic({ type: 'songs', data: res.songs })
              this.getmusic({ type: 'playlist', data: res.songs })
            })
        })
    }
  }
}
</script>

<style>
</style>
