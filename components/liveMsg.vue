<template>
  <tr>
    <td>
      <v-avatar size="35">
        <v-img v-if="item.avatar" :src="item.avatar"></v-img>
        <v-icon v-else large class="textcolor--text">mdi-account-circle</v-icon>
      </v-avatar>
    </td>
    <td align="left" height="25">
      <p>
        <b style="opacity: 0.7;">{{item.name}}</b>
        <b style="opacity: 0.6;
  font-size: 0.8em;">{{time}}</b>
      </p>
      <p>
        <b style="opacity: 0.6;">{{item.reply}}</b>
      </p>
      <hr />
    </td>
  </tr>
</template>

<script>
import timeago from '../static/timeago.js'
export default {
  name: 'liveMsg',
  props: { item: Object, n: Number },
  data() {
    return {
      time: ''
    }
  },

  mounted() {
    this.time = timeago(this.item.time)
  }
}
</script>

<style scoped>
tr:hover {
  background-color: transparent;
}
tr td p {
  margin: 4px;
}
td {
  position: relative;
}
td div {
  position: absolute;
  top: 0;
}
hr {
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-left: 0;
  border-right: 0;
  border-top: 0;
}
</style>
