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

    <table width="100%" border="0" cellspacing="15" cellpadding="8">
      <thead>
        <tr class="etdstyle">
          <th class="text-left" style="width:30px;margin:8px"></th>
          <th class="text-left" style="margin:8px"></th>
        </tr>
      </thead>
      <transition-group name="list-complete" tag="tbody">
        <live-msg class="list-complete-item" v-for="(e) in item.reply" :key="e.time" :item="e" />
      </transition-group>
    </table>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import liveMsg from '../liveMsg'
export default {
  components: { liveMsg },
  props: {
    item: Object
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
        let msgItem = {
          articleId: this.item._id,
          userId: this.$store.state.user._id,
          avatar: this.$store.state.user.avatar,
          name: this.$store.state.user.name,
          time: new Date().getTime(),
          reply: this.reply.trim(),
          like: 0
        }

        this.$axios
          .post('/addArrayletters', { id: this.item._id, reply: msgItem })
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


