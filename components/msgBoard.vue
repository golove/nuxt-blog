<template>
  <v-card flat color="transparent">
    <v-list-item two-line>
      <v-list-item-content class="align-self-start">
        <v-textarea solo flat filled v-model="msgcontent" name="input-7-4" label="真的不来写两句吗???"></v-textarea>
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

    <v-list color="transparent">
      <!-- <transition-group appear> -->
      <!-- <template v-for="(e,i) in item.reply">
          
          <v-divider  :key="i" inset></v-divider>
      </template>-->
      <template v-for="(e) in item.reply">
        <v-list-item :key="e._id">
          <live-msg :item="e" :key="e._id" />
        </v-list-item>
      </template>
      <!-- </transition-group> -->
    </v-list>

    <div class="msgfooter"></div>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import liveMsg from './liveMsg'
export default {
  components: { liveMsg },
  props: {
    item: Object
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
          userImg: this.$store.state.user.imgsrc,
          name: this.$store.state.user.name,
          time: Date.parse(date),
          msg: this.msgcontent.trim(),
          like: 0
        }

        this.$axios
          .post('/api/addArray', { id: this.item._id, reply: msgItem })
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


