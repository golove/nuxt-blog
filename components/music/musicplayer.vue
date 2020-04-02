<template>
  <div class="text-center playstyle">
    <!-- <audio
      ref="audio"
      @loadedmetadata="onLoadedmetadata"
      @pause="onPause"
      @play="onPlay"
      @ended="onEnded"
    >
      <source :src="this.$store.state.music.song.url" type="audio/mpeg" />您的浏览器不支持 audio 元素。
    </audio>-->
    <v-bottom-sheet inset>
      <template v-slot:activator="{ on }">
        <v-btn color="red" dark v-on="on">Open Player</v-btn>
      </template>
      <v-card tile>
        <v-progress-linear :value="50" class="my-0" height="3"></v-progress-linear>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>The Walker</v-list-item-title>
              <v-list-item-subtitle>Fitz & The Trantrums</v-list-item-subtitle>
            </v-list-item-content>

            <v-spacer></v-spacer>

            <v-list-item-icon>
              <v-btn @click="lastMusic()" icon>
                <v-icon>mdi-rewind</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon>
              <v-btn @click="startPlayOrPause" icon>
                <v-icon
                  large
                  color="red"
                >{{$store.state.music.playing?"mdi-pause-circle":"mdi-arrow-right-drop-circle"}}</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon class="ml-0" :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
              <v-btn @click="nextMusic()" icon>
                <v-icon>mdi-fast-forward</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  props: { item: {} },
  methods: {
    ...mapMutations(['onPlay', 'onPause']),
    ...mapActions(['lastMusic', 'nextMusic']),

    // 当加载音蘋流元数据完成后，会触发该事件的回调函数
    // 音蘋元数据主要是音蘋的长度之类的数据
    onLoadedmetadata(res) {
      // console.log('loadedmetadata')
      // console.log(res)
      // this.$store.state.audio.maxTime = parseInt(res.target.duration)
      this.play()
    },
    // 控制音频的播放与暂停
    startPlayOrPause() {
      return this.$store.state.music.playing ? this.pause() : this.play()
    },
    //选择播放音乐
    playMusic(e) {
      // this.$store.state.audio.song = e
      this.$store.commit('playlistPlay', e)
      //根据歌曲专辑id获取对应专辑
      // /album?id=38991
    }
    //   //加载音乐
    //   load() {
    //     this.$refs.audio.load()
    //     // console.log(this.$refs.audio)
    //   },
    //   // 播放音频
    //   play() {
    //     this.$refs.audio.play()
    //   },
    //   // 暂停音频
    //   pause() {
    //     this.$refs.audio.pause()
    //   },
    //   // 播放完毕
    //   onEnded() {
    //     this.nextMusic()
    //   }
    // },
    // computed: {
    //   musicUrl: function() {
    //     return this.$store.state.music.song
    //   }
    // },
    // watch: {
    //   musicUrl: function() {
    //     this.load()
    //   },
    //   playOrPause: function() {
    //     this.startPlayOrPause()
    //   }
  }
}
</script>

<style scoped>
.playstyle {
  z-index: 99;
  position: fixed;
  top: 550px;
  left: 30px;
}
</style>