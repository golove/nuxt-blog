<template>
  <div class="chipsstyle">
    <transition-group name="list-complete">
      <v-chip
        @click="searchFunc(e.name)"
        v-for="(e) in chips"
        :key="e.name"
        class="list-complete-item ma-2"
        :color="e.color"
        text-color="white"
      >
        <v-avatar left>
          <img v-if="e.avatar" :src="e.avatar" alt />
          <v-icon v-else-if="e.icon">{{e.icon}}</v-icon>
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-avatar>
        {{e.name}}
      </v-chip>
    </transition-group>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'chips',
  props: { chips: null },
  methods: {
    ...mapMutations({
      searchFunc: 'content/searchFunc'
    })
  }
}
</script>

<style>
.chipsstyle {
  width: 100%;
  height: 145px;
  overflow: hidden;
}
.chipsstyle::before {
  content: '';
  width: 100vw;
  height: 145px;
  position: absolute;
  left: 0;
  margin: 0 auto;
  background: rgba(250, 250, 250, 0.3);
}
.list-complete-item {
  transition: all 1.2s;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>