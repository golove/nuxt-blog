<template>
  <v-row justify="center" class="rowstyle">
    <v-col cols="12">
      <v-btn v-on:click="shuffle">
        <v-icon>mdi-dice-5-outline</v-icon>随机排列
      </v-btn>
      <v-btn @click="flag=!flag">
        <v-icon>{{flag?'mdi-arrow-left':'mdi-pencil'}}</v-icon>
        {{flag?'返回':'写点什么吧!'}}
      </v-btn>

      <transition-group class="justifycenter" name="list-complete" tag="div">
        <inputbox :key="true" v-show="flag" class="list-complete-item mb-2" @setdata="setdata" />

        <twittercard
          v-for="(item,index) in $store.state.content.letters"
          :key="item._id"
          class="list-complete-item ma-1 align-self-auto"
          :n="index"
          :item="item"
        />
      </transition-group>
    </v-col>

    <!-- <v-col
      cols="12"
      class="text-center"
      v-if="Math.ceil($store.state.content.letters.length/sliceN)>1"
    >
      <v-pagination
        light
        circle
        v-model="page"
        :length="Math.ceil($store.state.content.letters.length/sliceN)"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </v-col>-->
  </v-row>
</template>

<script>
import inputbox from '~/components/inputbox'
import twittercard from '~/components/twittercard/index.vue'
import { mapActions } from 'vuex'
export default {
  name: 'index',
  components: { twittercard, inputbox },
  data: () => ({
    flag: false,
    page: 1,
    sliceN: 12
  }),
  methods: {
    ...mapActions({ getdata: 'content/getdata' }),
    setdata(data) {
      this.blogs.unshift(data)
    },

    add: function() {
      this.computedItems.lenght.splice(this.randomIndex(), 0, this.nextNum++)
    },

    shuffle() {
      this.$store.commit('content/shuffle', 'letters')
    }
  },
  mounted() {
    if (this.$store.state.content.letters.length === 0) {
      this.getdata({ api: '/letters', type: 'letters' })
    }
  }
}
</script>

<style scoped>
.rowstyle {
  min-height: 95vh;
}
.justifycenter {
  position: relative;
  margin: 0 auto;
  width: 100%;
  -moz-column-count: auto;
  -webkit-column-count: auto;
  column-count: auto;
  column-width: 480px;
  -moz-column-gap: 1em;
  -webkit-column-gap: 1em;
  column-gap: 1em;
}

.groupstyle {
  position: relative;
}

.alsdjflajs {
  min-height: 90vh;
}
.list-complete-item {
  /* max-width: 625px; */
  transition: all 1.2s;
}

.list-complete-enter,
.list-complete-leave-to

/* .list-complete-leave-active for below version 2.1.8 */
 {
  opacity: 0;
  transform: translateX(10px);
}

.list-complete-leave-active {
  width: 480px;
  position: absolute;
}
</style>