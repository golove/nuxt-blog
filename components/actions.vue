<template>
  <v-card-actions style="opacity:0.5">
    <v-btn class="ma-0" text>
      <v-icon small>mdi-clock-outline</v-icon>
      {{new Date(item.time).toLocaleDateString()}}
    </v-btn>
    <!-- <v-spacer></v-spacer> -->
    <v-btn :disabled="disabled" @click.stop="addLike" icon>
      <v-icon
        :color="item.like.indexOf($store.state.user.name)>-1?'red':'transprant'"
        small
      >mdi-heart</v-icon>
      <p>{{ item.like.length }}</p>
    </v-btn>
    <v-btn :disabled="disabled" class="mx-0" @click.stop="addCollect" icon>
      <v-icon
        :color="item.collect.indexOf($store.state.user.name)>-1?'orange':'transprant'"
        small
      >mdi-star</v-icon>
      <p v-text="item.collect.length"></p>
    </v-btn>

    <v-btn v-if="flag" :disabled="disabled" class="mx-0" icon>
      <v-icon small>mdi-chat-processing</v-icon>
      <p v-text="item.reply.length"></p>
    </v-btn>
    <v-btn v-if="flag" :disabled="disabled" icon>
      <v-icon small>mdi-eye</v-icon>
      <p v-text="item.see"></p>
    </v-btn>

    <!-- <div class="flex-grow-1"></div> -->
    <!--      <v-btn v-if="$store.state.ifEdite" @click="save">保存更改</v-btn>-->
  </v-card-actions>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: { item: {}, flag: Boolean, disabled: Boolean },
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['articleEdit']),
    addLike() {
      if (this.$store.state.user.name) {
        this.articleEdit({ data: this.item, type: 'like' })
      } else {
        alert('make sure you already login!')
      }
    },
    addCollect() {
      if (this.$store.state.user.name) {
        this.articleEdit({ data: this.item, type: 'collect' })
      } else {
        alert('make sure you already login!')
      }
    }
  }
}
</script>
