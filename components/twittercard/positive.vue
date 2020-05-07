<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-avatar size="42" color="grey darken-3">
        <v-img class="elevation-6" :src="item.avatar"></v-img>
      </v-avatar>
      <v-toolbar-title class="pl-2 headline">{{item.author}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu transition="slide-y-transition" :dark="!item.tcolor" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <v-list :color="item.color">
          <v-list-item v-for="(item, index) in menulists" :key="index" @click="item.func">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-card-text class="textsyle pl-12 pr-8 py-0 headline font-weight-bold">{{item.text}}</v-card-text>
    <v-card-text class="pl-12 pr-6 py-0" style="opacity:.6">
      <b style="opacity: 0.6;
  font-size: 1em;">{{time}}</b>
    </v-card-text>
    <v-card-actions class="justify-space-around" style="opacity:0.7">
      <v-btn @click="addlike" icon>
        <v-badge
          offset-x
          :value="item.like.length"
          :content="item.like.length?item.like.length:'0'"
        >
          <v-icon class="mr-1">mdi-thumb-up</v-icon>赞
        </v-badge>
      </v-btn>

      <v-btn @click="addunlike" icon>
        <!-- <v-badge
            :value="item.unlike&&item.unlike.length"
            :content="item.unlike.length?item.unlike.length:'0'"
        >-->
        <v-icon class="mr-1">mdi-thumb-down</v-icon>踩
        <!-- </v-badge> -->
      </v-btn>

      <v-btn @click="showmsg" icon>
        <v-badge
          :value="item.reply&&item.reply.length"
          :content="item.reply.length?item.reply.length:'0'"
        >
          <v-icon class="mr-1">mdi-message</v-icon>评论
        </v-badge>
      </v-btn>
    </v-card-actions>
    <v-list color="transparent" three-line>
      <template v-for="(item, index) in item.reply.slice(0,1 )">
        <v-divider :key="index" :inset="true"></v-divider>
        <v-list-item :key="item.title" @click="showmsg">
          <v-list-item-avatar size="35">
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <b>{{item.name}}</b>
              <b style="opacity: 0.6;font-size: 0.8em;">{{new Date(item.time).toLocaleString()}}</b>
            </v-list-item-title>
            <v-list-item-subtitle>
              <b>{{item.reply}}</b>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import timeago from '../../static/timeago.js'
import { mapMutations } from 'vuex'
export default {
  props: { item: Object, n: Number },
  data() {
    return {
      menulists: [{ title: '删除', func: this.remove }],
      tflag: false,
      time: ''
    }
  },
  methods: {
    ...mapMutations({
      lettersEdit: 'lettersEdit',
      removed: 'content/remove'
    }),
    remove() {
      this.removed({ type: 'letters', n: this.n })
    },
    addunlike() {
      if (this.$store.state.user.name) {
        this.lettersEdit({ data: this.item, type: 'unlike' })
      } else {
        alert('要先登陆哟!!!')
      }
    },
    addlike() {
      if (this.$store.state.user.name) {
        this.lettersEdit({ data: this.item, type: 'like' })
      } else {
        alert('要先登陆哟!!!')
      }
    },
    showmsg() {
      if (!this.tflag) {
        this.$emit('changeflag')
        setTimeout(() => {
          this.$emit('changeMaxH', '800px')
        }, 600)
      } else {
        this.tflag = false
        setTimeout(() => {
          this.$emit('changeflag')
          setTimeout(() => {
            this.$emit('changeMaxH', '800px')
          }, 600)
        }, 300)
      }
    },

    showtext() {
      this.tflag = !this.tflag
    }
  },
  mounted() {
    this.time = timeago(this.item.time)
  }
}
</script>

<style>
</style>