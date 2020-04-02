<template>
  <div class="searchitem">
    <v-avatar class="mt-1" size="25">
      <img :src="item.avatar" />
    </v-avatar>
    <p>{{item.version}}</p>
    <p>{{item.author}}</p>
    <p>{{item.time}}</p>
  </div>
</template>

<script>
export default {
  name: 'searchItem',
  props: { item: {} },
  methods: {
    linkFunc() {}
  }
}
</script>

<style scoped>
.searchitem {
  margin-bottom: 2px;
  display: flex;
  justify-content: space-around;
  height: 35px;
  width: 100%;
  background: rgb(241, 77, 17);
  text-align: center;
}

p {
  margin: 0;
  line-height: 35px;
}
</style>