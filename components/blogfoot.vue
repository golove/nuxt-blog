<template>
  <v-footer :color="color">
    <span style="opacity: 0.3;width: 100%;text-align: center">
      Copyright &copy; All Rights Reserved {{item.time}} Design by : {{item.author}}
      <b>version: {{item.version}}</b>
    </span>
  </v-footer>
</template>

<script>
export default {
  name: 'blogfoot',
  props: {
    item: Object,
    color: {
      type: String,
      default: () => 'rgba(255,255,255,0.6)'
    }
  }
}
</script>

<style>
</style>