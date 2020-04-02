<template>
  <v-list three-line color="transparent">
    <v-divider inset></v-divider>
    <v-list-item>
      <v-list-item-avatar>
        <v-img v-if="item.avatar" :src="item.avatar"></v-img>
        <v-icon v-else large class="textcolor--text">mdi-account-circle</v-icon>
      </v-list-item-avatar>
      <v-list-item-content class="pa-0">
        <v-list-item-title class="body-2 font-regular">
          <b style="opacity: 0.7;">{{item.name}}</b>
          <b style="opacity: 0.6;
  font-size: 0.8em;">{{new Date(item.time).toLocaleString()}}</b>
        </v-list-item-title>
        <v-list-item-subtitle>
          <b>{{item.reply}}</b>
        </v-list-item-subtitle>
      </v-list-item-content>
      <!-- <v-list-item-active>
        <v-btn @click="remove(i)" icon>
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </v-list-item-active>-->
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'liveMsg',
  props: { item: Object, n: Number },
  methods: {
    // remove(n) {
    //   this.$store.commit('remove', n)
    // }
  }
}
</script>

<style scoped>
</style>
