<template>
  <v-card flat color="rgba(0,0,0,0)">
    <v-card-title>
      <v-avatar size="42">
        <v-img
          class="elevation-6"
          :src="$store.state.user.avatar?$store.state.user.avatar:'http://yanxuan.nosdn.127.net/8afbf57d821c3049fc156afc07a0d91c.jpg'"
        ></v-img>
      </v-avatar>

      <v-btn
        text
        class="title pl-2 headline"
        :to="$store.state.user.name?'':'/login'"
      >{{$store.state.user.name?$store.state.user.name:'请先登录再来评论吧!'}}</v-btn>
    </v-card-title>

    <v-text-field
      class="ml-6 pl-12 pr-8 py-0"
      counter
      solo
      flat
      filled
      v-model="reply"
      background-color="rgba(255,255,255,0.1)"
      name="input-7-4"
      label="评论一下吧!"
    />
    <v-card-actions>
      <v-btn small color="transparent" @click="$emit('backmsg')">返回</v-btn>
      <v-btn
        :disabled="btnDisabled && $store.state.user.name ? false:true"
        small
        color="warning"
        @click="addmsg"
      >评论</v-btn>
    </v-card-actions>

    <transition-group name="list-complete" tag="ul">
      <live-msg
        class="list-complete-item"
        v-for="(e,i) in item.reply.slice((page-1)*5,5*page)"
        :key="e.time"
        :n="i+(5*(page-1))"
        :item="e"
      />
    </transition-group>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import liveMsg from './liveMsg'
export default {
  components: { liveMsg },
  props: {
    item: Object,
    page: Number
  },
  data() {
    return {
      btnDisabled: false,
      reply: ''
    }
  },

  methods: {
    ...mapMutations(['lettersEdit']),

    addmsg() {
      if (this.$store.state.user.name) {
        let date = new Date()
        let msgItem = {
          articleId: this.item._id,
          userId: this.$store.state.user._id,
          avatar: this.$store.state.user.avatar,
          name: this.$store.state.user.name,
          time: Date.parse(date),
          reply: this.reply.trim(),
          like: 0
        }

        this.$axios
          .post('/api/addArrayletters', { id: this.item._id, reply: msgItem })
          .then(res => {
            this.reply = ''
            this.lettersEdit({ data: msgItem, type: 'reply' })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        alert('你还没登陆呢')
      }
    },
    delmsg(i) {
      let e = this.replys.splice(i, 1)[0]
      this.$axios
        .post('/blog/msgDel', e)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  activated() {},
  computed: {
    lContent() {
      return this.reply.length
    }
  },
  watch: {
    lContent: function(n, o) {
      this.btnDisabled = n > 3
    }
  }
}
</script>
<style scoped>
.list-complete-item {
  transition: all 2s;
  display: inline-block;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>


