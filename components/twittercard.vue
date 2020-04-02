<template>
  <div
    class="wrap"
    :min-height="maxheight"
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down')
    }"
  >
    <v-card
      :min-height="maxheight"
      :class="flag?'card1_1':''"
      class="card1 mx-auto"
      :color="item.color"
      :dark="!item.tcolor"
      ref="cHeight"
      shaped
    >
      <v-toolbar flat :color="item.color">
        <v-avatar size="42" color="grey darken-3">
          <v-img class="elevation-6" :src="item.avatar"></v-img>
        </v-avatar>
        <v-toolbar-title class="pl-2 headline">{{item.author}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu transition="slide-y-transition" :dark="!item.tcolor" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon dark v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list :color="item.color">
            <v-list-item v-for="(item, index) in menulists" :key="index" @click="item.func">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- <v-btn @click="remove" icon>
          
        </v-btn>-->
      </v-toolbar>

      <v-card-text
        :class="tflag?'tstyle':'wstyle'"
        class="textsyle pl-12 pr-8 py-0 headline font-weight-bold"
      >{{item.text}}</v-card-text>
      <v-card-text class="pl-12 pr-6 py-0" style="opacity:.6">
        <b style="opacity: 0.6;
  font-size: 1em;">{{new Date(item.time).toLocaleString()}}</b>
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
          <!-- <v-badge
            :value="item.reply&&item.reply.length"
            :content="item.reply.length?item.reply.length:'0'"
          >-->
          <v-icon class="mr-1">mdi-message</v-icon>评论
          <!-- </v-badge> -->
        </v-btn>

        <!-- <v-btn icon>
          <v-icon class="mr-1">mdi-share-variant</v-icon>分享
        </v-btn>-->
        <button @click="showtext" icon>
          <v-icon>{{tflag?'mdi-chevron-double-up':'mdi-chevron-double-down'}}</v-icon>
          {{tflag?'收起':'更多'}}
        </button>
      </v-card-actions>
      <!-- <v-list color="transparent" three-line>
        <template v-for="(item, index) in item.reply.slice(0,1 )">
          <v-divider :key="index" :inset="true"></v-divider>
          <v-list-item :key="item.title" @click="showmsg">
            <v-list-item-avatar>
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
      </v-list>-->
    </v-card>

    <v-card
      :height="maxheight"
      :color="item.color"
      :dark="!item.tcolor"
      class="card2 overflow-hidden"
      :class="flag?'card2_1':''"
      shaped
    >
      <msgboard @backmsg="backmsg" :page="page" :item="item" />
      <v-pagination
        class="paginatsss"
        v-if="Math.ceil(item.reply.length/sliceN)>1&&item.reply"
        light
        circle
        v-model="page"
        :length="Math.ceil(item.reply.length/sliceN)"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
      <!-- <simplereply @backmsg="backmsg" :item="item" /> -->
    </v-card>
  </div>
</template>

<script>
import msgboard from '~/components/msgBoardTwitter.vue'
// import simplereply from '~/components/simpleReply.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'twittercard',
  props: { item: Object, n: Number },
  components: { msgboard },
  data() {
    return {
      tflag: false,
      page: 1,
      sliceN: 9,
      flag: false,
      maxheight: '250px',
      menulists: [{ title: '删除', func: this.remove }]
    }
  },

  methods: {
    ...mapMutations(['lettersEdit']),
    swipe(direction) {},
    watchnow() {
      this.lettersEdit({ data: this.item, type: 'see' })
    },
    remove() {
      this.$store.commit('remove', { type: 'letters', n: this.n })
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
      // console.log(this.$refs.cHeight)
      if (!this.tflag) {
        this.flag = !this.flag
        setTimeout(() => {
          this.maxheight = '800px'
        }, 600)
      } else {
        this.tflag = false
        setTimeout(() => {
          this.flag = !this.flag
          setTimeout(() => {
            this.maxheight = '800px'
          }, 600)
        }, 300)
      }
    },
    backmsg() {
      this.maxheight = '250px'
      setTimeout(() => {
        this.flag = !this.flag
      }, 620)
    },
    showtext() {
      this.tflag = !this.tflag
    },
    addmsg() {}
  }
}
</script>

<style scoped>
/* 保证正反面一样大，不然反转会很突兀*/
.wrap {
  position: relative;
  opacity: 0.8;
}
.wrap,
.card1,
.card2 {
  width: 100%;
  transition: all 0.6s;
}

.card1,
.card2 {
  backface-visibility: hidden;
}

.card2 {
  top: 0;

  position: absolute;
  transform: rotateY(180deg);
}
.card2_1 {
  transform: rotateY(0deg);
}
.card1_1 {
  transform: rotateY(180deg);
}

.tstyle {
  transition: all 0.3s;
  height: auto;
}
.wstyle {
  transition: all 0.3s;
  height: 130px;
  overflow: hidden;
}
.paginatsss {
  position: absolute;
  bottom: 0;
}
</style>