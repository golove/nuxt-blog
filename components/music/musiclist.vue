<template>
  <table width="100%" border="0" cellspacing="0" cellpadding="4" class="tabtop" align="center">
    <thead>
      <tr class="etdstyle">
        <th class="text-left" style="width:30px"></th>
        <th class="text-left">歌曲</th>
        <th class="text-left">歌手</th>
        <th class="text-left">专辑</th>
        <th class="text-left">时长</th>
        <th class="text-left" style="width:80px">热度</th>
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
      <td v-if="item.al">{{ item.al.name }}</td>
      <td v-else>{{ item.album.name }}</td>
      <td v-if="item.dt">{{ item.dt }}</td>
      <td v-else>{{ item.duration }}</td>
      <td>{{ item.mark }}</td>
    </tr>
  </table>
</template>
 

<script>
export default {
  props: {
    items: Array
  },
  methods: {
    playMusic(e) {
      this.$store.dispatch('playlist', e)
    }
  }
}
</script>

<style>
tbody.tr:hover {
  background: #fff;
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
