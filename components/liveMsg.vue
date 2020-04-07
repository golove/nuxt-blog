<template>
  <tr>
    <td>
      <v-avatar size='25'>
        <v-img v-if="item.avatar" :src="item.avatar"></v-img>
        <v-icon v-else large class="textcolor--text">mdi-account-circle</v-icon>
      </v-avatar>
    </td>
    <td align="left"  height="25">
      <b style="opacity: 0.7;">{{item.name}}</b>
      <!-- <b style="opacity: 0.6;
      font-size: 0.8em;">{{new Date(item.time).toLocaleString()}}:</b>-->
      <b style="opacity: 0.6;
  font-size: 0.8em;">{{time}}</b>
      <b style="opacity: 0.6;">: {{item.reply}}</b>
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


