<template>
  <v-layout column justify-center align-center>
    <v-col class="py-0" cols="12">
      <dividline
        :dark="$vuetify.theme.dark"
        @shuffle="shuffle"
        @changebadge="changebadge(item)"
        :item="item"
      ></dividline>
    </v-col>
    <v-col>
      <transition-group name="list-complete" tag="div" class="row">
        <v-col
          class="list-complete-item"
          :key="item._id"
          v-for="(item,index) in $store.state.content.article.slice((page-1)*sliceN,page*sliceN)"
          xl="2"
          lg="3"
          md="4"
          sm="6"
          xs="6"
        >
          <h-card :n="index + sliceN * (page - 1)" :item="item"></h-card>
        </v-col>
      </transition-group>
    </v-col>

    <v-col
      cols="12"
      class="text-center"
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
  </v-layout>
</template>

<script>
import noticeWords from '../components/noticeWords.vue'
import dividline from '../components/Dividingline.vue'
import hCard from '../components/hCard.vue'

export default {
  components: {
    noticeWords,
    dividline,
    hCard
  },
  data() {
    return {
      page: 1,
      sliceN: 16,
      item: {
        icon: 'mdi-book',
        title: '精品文章',
        type: 'article',
        content: 'new',
        badge: true,
        color: 'red'
      }
    }
  },
  methods: {
    changebadge(item) {
      item.badge = false
    },
    shuffle() {
      this.$store.commit('content/shuffle', 'article')
    }
  }
}
</script>
<style scoped>
.noticewords {
  transition: all 1.6s;
}
</style>