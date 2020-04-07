<template>
  <v-card flat tile color="rgba(255,255,255,0)">
    <v-row justify="center">
      <v-col cols="12">
        <nuxt-child keep-alive />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      colors: [
        'green',
        'secondary',
        'yellow darken-4',
        'red lighten-2',
        'orange darken-1'
      ],

      musicImgSlides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],

      musicSideItems: [
        { header: '推荐' },
        { title: '发现音乐', icon: 'mdi-music', to: '/music' },
        {
          title: '私人FM',
          icon: 'mdi-access-point',
          url: `/user/dj?uid=${this.$store.state.music.user.id}`
        },
        { title: '朋友', icon: 'mdi-account-supervisor-outline', url: '' },
        { header: '我的音乐' },
        {
          title: '我喜欢的音乐',
          icon: 'mdi-heart-outline',
          url: `/likelist?uid=${this.$store.state.music.user.id}`
        },
        {
          header: '我的歌单',
          url: `/user/playlist?uid=${this.$store.state.music.user.id}`
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      reqMusic: 'music/reqMusic'
    }),
    // 获取每日推荐专辑
    newgetMusic(e) {
      this.reqMusic({ type: 'albums', api: e })
    },
    //音乐所搜
    searchMusic(e) {
      this.reqMusic({ api: '/search?keywords=' + e, type: 'searchSong' })
      this.$router.push('/music/songlist')
    }
  },
  mounted() {
    // this.newgetMusic('/search?keywords=踏行')
    if (this.$store.state.music.albums.length < 1) {
      this.newgetMusic('/personalized')
    }
  }
}
</script>
<style>
.sqIcon {
  opacity: 0;
  font-weight: lighter;
  transition: all 0.2s;
}
.sqIcon:hover {
  opacity: 1;
  transform: scale(1.8);
}
.side {
  position: sticky;
  top: 65px;
}
</style>
