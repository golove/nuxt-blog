<template>
  <v-layout column justify-center align-center>
    <v-col class="pa-0" cols="12">
      <banner />
    </v-col>
    <v-col class="pa-0" cols="12">
      <noticeWords @random="shuffle('noticewords')" :items="$store.state.content.noticewords" />
    </v-col>

    <v-col class="pa-0 mt-2" cols="12">
      <chips :chips="categoryUser" />
    </v-col>

    <v-col class="px-0 pb-0" cols="12">
      <dividline
        :dark="$vuetify.theme.dark"
        @shuffle="shuffle('article')"
        @changebadge="changebadge"
        :item="item"
      ></dividline>
      <transition-group name="list-complete" tag="div" class="maincontstyle">
        <h-card
          class="list-complete-item"
          :key="item._id"
          v-for="(item,index) in $store.state.content.article.slice((page-1)*sliceN,page*sliceN)"
          :n="index + sliceN * (page - 1)"
          :item="item"
        ></h-card>
      </transition-group>
    </v-col>

    <v-col
      cols="12"
      class="text-center pa-0"
      v-if="Math.ceil($store.state.content.article.length/sliceN)>1"
    >
      <v-pagination
        circle
        v-model="page"
        :length="Math.ceil($store.state.content.article.length/sliceN)"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </v-col>

    <v-col class="pa-0" cols="12">
      <chips :chips="categoryType" />
    </v-col>
  </v-layout>
</template>

<script>
import banner from '~/components/banner.vue'
import chips from '~/components/chips.vue'
import noticeWords from '../components/noticeWords.vue'
import dividline from '../components/Dividingline.vue'
import hCard from '../components/hCard.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    noticeWords,
    dividline,
    hCard,
    chips,
    banner
  },
  data() {
    return {
      page: 1,
      sliceN: 24,
      item: {
        icon: 'mdi-book',
        title: '全部文章',
        type: 'article',
        content: 'new',
        badge: true,
        color: 'red'
      }
    }
  },
  methods: {
    ...mapActions({ getdata: 'content/getdata' }),
    changebadge() {
      this.item.badge = false
      console.log('ok')
    },
    shuffle(type) {
      this.$store.commit('content/shuffle', type)
    }
  },
  computed: {
    ...mapGetters({
      categoryType: 'content/categoryType',
      categoryUser: 'content/categoryUser'
    })
  },

  created() {
    if (this.$store.state.content.article.length === 0) {
      this.getdata({ api: '/myblog', type: 'article' })
    }
    if (this.$store.state.content.noticewords.length === 0) {
      this.getdata({
        api:
          'https://www.mxnzp.com/api/daily_word/recommend?count=10&len=5&app_id=tguwfpqsppmjnoli&app_secret=cGFyc25Bam80dXFlQ3FlaGtmeS9Kdz09',
        type: 'noticewords'
      })
    }
  }
}
</script>
<style scoped>
.noticewords {
  transition: all 1.6s;
}
.maincontstyle {
  position: relative;
  margin: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  align-content: flex-start;
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