<template>
  <table width="100%" border="0" cellspacing="0" cellpadding="4" class="tabtop" align="center">
    <thead>
      <tr class="etdstyle">
        <th class="text-left" style="width:30px;margin:8px"></th>
        <th class="text-left" style="margin:8px">歌曲</th>
        <th class="text-left" style="margin:8px">歌手</th>
        <th v-show="albflag" class="text-left" style="margin:8px">专辑</th>
        <th class="text-left" style="margin:8px">时长</th>
        <!-- <th class="text-left" style="width:80px">热度</th> -->
      </tr>
    </thead>
    <tr
      :class="index%2==0?'otdstyle':'etdstyle'"
      @dblclick="playMusic(item)"
      v-for="(item,index) in items"
      :key="item.id"
    >
      <td>
        <v-icon
          color="red"
        >{{$store.state.music.song.id===item.id?($store.state.music.playing?"mdi-pause-circle":"mdi-arrow-right-drop-circle"):""}}</v-icon>
      </td>
      <td>{{ item.name }}</td>
      <td v-if="item.ar">{{ item.ar[0].name}}</td>
      <td v-else>{{ item.artists[0].name }}</td>
      <td v-show="albflag" v-if="item.al">{{ item.al.name }}</td>
      <td v-show="albflag" v-else>{{ item.album.name }}</td>
      <td v-if="item.dt">{{timeToMinute(item.dt) }}</td>
      <td v-else>{{timeToMinute(item.duration) }}</td>
      <!-- <td>{{ item.mark }}</td> -->
    </tr>
  </table>
</template>
 

<script>
export default {
  props: {
    items: Array,
    albflag: Boolean
  },
  methods: {
    playMusic(e) {
      this.$store.dispatch('music/playlist', e)
    },
    // 格式化时间
    timeToMinute(times) {
      if (times > -1) {
        let s = times / 1000
        let m = 0
        let st = 0
        if (s < 60) {
          m = 0
        } else {
          m = Math.floor(s / 60)
          st = Math.floor(s % 60)
        }

        return `${m}:${st}`
      }
    }
  }
}
</script>

<style>
tr:hover {
  background-color: rgba(253, 60, 124, 0.1);
}
.tabtop td {
  height: 35px;
  line-height: 150%;
}

.otdstyle {
  background-color: rgba(255, 255, 255, 0.5);
}

.etdstyle {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
