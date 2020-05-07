<template>
  <v-card flat color="transparent">
    <v-list-item two-line class="pa-0">
      <v-list-item-content class="align-self-start pa-0">
        <v-textarea
          background-color="rgba(255,255,255,0.6)"
          solo
          flat
          filled
          v-model="msgcontent"
          name="input-7-4"
          label="真的不来写两句吗???"
        ></v-textarea>
        <v-card-actions>
          <v-btn
            :disabled="btnDisabled && $store.state.user.name ? false:true"
            small
            color="warning"
            @click="addmsg"
          >评论</v-btn>
        </v-card-actions>
      </v-list-item-content>
    </v-list-item>

    <table width="100%" border="0" cellspacing="15" cellpadding="8">
      <thead>
        <tr>
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
      msgcontent: ''
    }
  },

  methods: {
    ...mapMutations(['articleEdit']),

    addmsg() {
      if (this.$store.state.user.name) {
        let date = new Date()
        let msgItem = {
          articleId: this.item._id,
          userId: this.$store.state.user._id,
          avatar: this.$store.state.user.avatar,
          name: this.$store.state.user.name,
          time: Date.parse(date),
          reply: this.msgcontent.trim(),
          like: 0
        }

        this.$axios
          .post('/addArray', { id: this.item._id, reply: msgItem })
          .then(res => {
            this.msgcontent = ''
            this.articleEdit({ data: msgItem, type: 'reply' })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        alert('你还没登陆呢')
      }
    },
    delmsg(i) {
      let e = this.msgContents.splice(i, 1)[0]
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
      return this.msgcontent.length
    }
  },
  watch: {
    lContent: function(n, o) {
      this.btnDisabled = n > 3
    }
  }
}
</script>
