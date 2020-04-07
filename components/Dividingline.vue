<template>
  <div @click="$emit('shuffle',item.type)" class="divline align-center">
    <v-badge
      @click="$emit('changebadge')"
      overlap
      bordered
      :content="item.content"
      :value="item.badge"
      :color="item.color"
    >
      <div class="dividline" :class="dark?'dividline1':'dividline2'">
        <v-icon>{{item.icon}}</v-icon>
        {{item.title}}
      </div>
    </v-badge>
    <!-- <v-divider light inset></v-divider> -->
  </div>
</template>

<script>
export default {
  props: { item: Object, dark: { type: Boolean, default: false } },
  methods: {}
}
</script>

<style>
.divline {
  cursor: pointer;
  position: relative;
  width: 100%;
  /* height: 45px; */
}
/* hr {
  position: absolute;
  top: 16px;
  opacity: 0.3;
  width: 100%;
} */
.dividline {
  width: 130px;
  padding: 4px 10px;
  border-radius: 4px;
}
.dividline1 {
  background-color: #272727;
  color: white;
}
.dividline2 {
  background-color: rgb(255, 255, 255, 0.6);
}
</style>