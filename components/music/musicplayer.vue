<template>
  <div
    id="musicplayer"
    @mouseenter.stop="mucmouseenterfunc"
    @mouseleave.stop="mucmouseleavefunc"
    @mousedown="mousedown"
  >
    <audio
      preload="auto"
      @loadedmetadata="onLoadedmetadata"
      ref="audio"
      @pause="onPause"
      @play="onPlay"
      @ended="onEnded"
    >
      <source :src="$store.state.music.song.url" type="audio/mpeg" />您的浏览器不支持 audio 元素。
    </audio>

    <div class="barstyle" :class="barflag?'barstyle1':'barstyle2'">
      <img
        height="85px"
        width="auto"
        :src="$store.state.music.album.picUrl?$store.state.music.album.picUrl:$store.state.music.album.coverImgUrl"
        alt
      />
      <div>
        <h2>{{$store.state.music.songsInfo.name}}</h2>
        <p>{{$store.state.music.album.name}}</p>
        <p>简介:{{$store.state.music.album.copywriter}}</p>
      </div>
    </div>

    <div class="btnstyle" :class="listflag||barflag?'btnstyle1':''">
      <v-btn :class="mucflag?'abstyle':'restyle'" icon class="playButton" @click.stop="lastMusic()">
        <v-icon large color="red">mdi-skip-previous-circle</v-icon>
      </v-btn>

      <v-btn
        :class="mucflag?'abstyle':'restyle'"
        icon
        class="playButton"
        @click.stop="startPlayOrPause"
      >
        <v-icon
          large
          color="red"
        >{{$store.state.music.playing?"mdi-pause-circle":"mdi-arrow-right-drop-circle"}}</v-icon>
      </v-btn>

      <v-btn :class="mucflag?'abstyle':'restyle'" icon class="playButton" @click.stop="nextMusic()">
        <v-icon large color="red">mdi-skip-next-circle</v-icon>
      </v-btn>

      <v-btn
        :class="mucflag?'abstyle':'restyle'"
        icon
        class="playButton"
        @click.stop="listflag = !listflag"
      >
        <v-icon large color="red">mdi-account-supervisor-circle</v-icon>
      </v-btn>

      <v-btn
        @click.stop="barflag=!barflag"
        ref="mucBtn"
        :class="!mucflag?$store.state.music.playing?'cyclingstyle':'abstyle':'restyle'"
        icon
        class="playButton"
      >
        <v-icon large color="red">mdi-music-circle</v-icon>
      </v-btn>
    </div>
    <div :class="listflag?'liststyle1':'liststyle2'" class="liststyle">
      <musiclist :items="$store.state.music.songs" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import musiclist from '~/components/music/musiclist'
export default {
  props: { item: {} },
  components: { musiclist },
  data() {
    return {
      timeout: Function,
      timeout1: Function,
      timeout2: Function,
      mucflag: false,
      listflag: false,
      barflag: false,
      selectElement: ''
    }
  },
  methods: {
    ...mapMutations({
      onPlay: 'music/onPlay',
      onPause: 'music/onPause'
    }),
    ...mapActions({
      getplaylist: 'music/getplaylist',
      lastMusic: 'music/lastMusic',
      nextMusic: 'music/nextMusic',
      playlist: 'music/playlist'
    }),

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
    // //选择播放音乐
    // playMusic(e) {
    //   // this.$store.state.audio.song = e
    //   this.playlist(e)
    //   //根据歌曲专辑id获取对应专辑
    //   // /album?id=38991
    // },
    //加载音乐
    load() {
      this.$refs.audio.load()
      // console.log(this.$refs.audio)
    },
    // 播放音频
    play() {
      this.$refs.audio.play()
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause()
    },
    // 播放完毕
    onEnded() {
      this.nextMusic()
    },
    mousedown(event) {
      this.selectElement = document.getElementById('musicplayer')
      let div1 = this.selectElement

      this.selectElement.style.cursor = 'move'

      let distanceX = event.clientX - this.selectElement.offsetLeft
      let distanceY = event.clientY - this.selectElement.offsetTop

      document.onmousemove = function(ev) {
        let oevent = ev || event
        if (oevent.clientX - distanceX < 40) {
          div1.style.left = 0
        } else {
          div1.style.left = oevent.clientX - distanceX + 'px'
        }
        if (oevent.clientY - distanceY < 40) {
          div1.style.top = 0
        } else {
          div1.style.top = oevent.clientY - distanceY + 'px'
        }
      }
      document.onmouseup = function() {
        document.onmousemove = null
        document.onmouseup = null
        div1.style.cursor = 'default'
      }
    },
    mucmouseleavefunc() {
      this.timeout = setTimeout(() => {
        this.mucflag = false
      }, 7000)
      this.timeout1 = setTimeout(() => {
        this.barflag = false
      }, 5000)

      this.timeout2 = setTimeout(() => {
        this.listflag = false
      }, 2000)
    },
    mucmouseenterfunc() {
      clearTimeout(this.timeout)
      clearTimeout(this.timeout1)
      clearTimeout(this.timeout2)

      this.mucflag = true
    }
  },
  computed: {
    musicUrl: function() {
      return this.$store.state.music.song
    }
  },
  watch: {
    musicUrl: function() {
      this.load()
    },
    playOrPause: function() {
      this.startPlayOrPause()
    }
  },
  mounted() {
    setTimeout(this.mucmouseenterfunc, 1500)
    setTimeout(this.mucmouseleavefunc, 2000)
    if (this.$store.state.music.songs.length === 0) {
      this.getplaylist({ id: '2801005211' })
    }
  }
}
</script>

<style scoped>
.cyclingstyle {
  margin: 0px;
  transition: all 0.8s ease;
  position: fixed;
  overflow: hidden;
  animation-name: cycle;
  background: white;
  animation-duration: 240s;
  animation-iteration-count: 1;
}

@keyframes cycle {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(26000deg);
  }
}

h2 {
  margin-left: 6px;
}
p {
  margin-left: 6px;
  margin-bottom: 0px;
}
#musicplayer {
  border-radius: 5px;
  box-shadow: 3px 3px 12px rgba(23, 24, 39, 0.6);
  z-index: 99;
  position: fixed;
  top: 350px;
  left: 10px;

  background: radial-gradient(
    200% 100% at bottom center,
    rgba(247, 247, 182, 0.6),
    rgba(233, 111, 146, 0.6),
    rgba(117, 81, 125, 0.6)
  );
  background: radial-gradient(
    220% 105% at top center,
    rgba(117, 81, 125, 0.6) 40%,
    rgba(233, 111, 146, 0.6) 65%,
    rgba(247, 247, 182, 0.6)
  );
  background-color: white;
}
.playButton {
  position: absolute;

  z-index: 9;
  transition: all 0.3s ease;
}
.btnstyle {
  position: relative;
}
.btnstyle1 {
  padding: 8px;
  height: 55px;
}
.abstyle {
  background: rgba(254, 254, 255, 1);
}
.abstyle:nth-child(1) {
  margin-left: 40px;
  background: rgba(254, 254, 255, 0.5);
}
.abstyle:nth-child(2) {
  margin-left: 80px;
  background: rgba(254, 254, 255, 0.5);
}
.abstyle:nth-child(3) {
  margin-left: 120px;
  background: rgba(254, 254, 255, 0.5);
}
.abstyle:nth-child(4) {
  margin-left: 160px;
  background: rgba(254, 254, 255, 0.5);
}

.restyle {
  margin: 0;
  background: rgba(254, 254, 255, 0.5);
}
/* .restyle:nth-child(4) {
  transform: rotate(45deg);
} */
.liststyle {
  width: 100%;
  transition: height 0.9s ease;
}

.liststyle1 {
  height: 760px;
  overflow: scroll;
}

.liststyle2 {
  height: 0;
  overflow: hidden;
}

/*滚动条样式*/
.liststyle::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 0px;
}

.liststyle::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(230, 203, 233, 0.2);
  background: rgba(255, 255, 255, 0.3);
}

.liststyle::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(223, 206, 235, 0.2);
  border-radius: 5px;
  background: rgba(234, 204, 235, 0.1);
}
.barstyle {
  overflow: hidden;
  transition: height 0.9s ease;
  display: flex;
}

.barstyle1 {
  padding: 4px;
  height: 85px;
  width: 100%;
}

.barstyle2 {
  height: 0px;
}
</style>