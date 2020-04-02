<template>
  <v-card flat class="mx-auto overflow-hidden" color="transparent">
    <v-row justify="center">
      <v-col sm="12" md="12" lg="9" xl="7">
        <v-row justify="space-between">
          <v-col class="12">
            <carousel :items="pictures.list" :height="'300px'"></carousel>
            <notice-words @random="random" :items="dailyWord"></notice-words>
          </v-col>

          <v-col v-if="$store.state.content.article.length>0" class="py-0" cols="12">
            <dividline @shuffle="shuffle" @changebadge="changebadge(item)" :item="item"></dividline>
          </v-col>
          <v-col>
            <transition-group name="list-complete" tag="div" class="row">
              <v-col
                class="list-complete-item"
                :key="item._id"
                v-for="(item,index) in $store.state.content.article.slice((page-1)*sliceN,page*sliceN)"
                lg="3"
                xl="3"
                md="3"
                sm="4"
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

          <v-col class="py-0" cols="12">
            <v-tabs
              v-model="tab"
              background-color="cyan"
              dark
              next-icon="mdi-arrow-right"
              prev-icon="mdi-arrow-left"
              show-arrows
            >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tab
                @click="getdatas({ type: 'news', api: `news/list?typeId=${i.typeId}&page=1` })"
                v-for="(i,n) in newsTypes"
                :key="i.typeId+n"
              >{{ i.typeName }}</v-tab>
            </v-tabs>
            <v-tabs-items style="background:rgba(0,1,1,0)" v-model="tab">
              <v-tab-item color="transparent" v-for="item in newsTypes" :key="item.typeName">
                <transition-group name="list-complete" tag="div" class="row">
                  <v-col
                    class="list-complete-item"
                    :key="item.newsId+i"
                    v-for="(item,i) in news"
                    lg="3"
                    xl="3"
                    md="3"
                    sm="4"
                    xs="6"
                  >
                    <!-- <v-row justify="center">
                    <v-col lg="12" xl="12" md="12" sm="12">-->
                    <h-cardnews :item="item" />
                    <!-- </v-col>
                    </v-row>-->
                  </v-col>
                </transition-group>

                <!-- <v-card-text>{{ item.typeName }}</v-card-text> -->
              </v-tab-item>
            </v-tabs-items>
          </v-col>

          <v-col class="py-0" cols="12">
            <dividline
              @shuffle="localshuffle('jokes')"
              @changebadge="changebadge(item2)"
              :item="item2"
            ></dividline>
            <!-- <button @click="localshuffle('jokes')">随机</button> -->
          </v-col>
          <v-col>
            <transition-group name="list-complete" tag="div" class="row">
              <v-col
                xl="6"
                lg="6"
                md="6"
                sm="6"
                cols="12"
                class="list-complete-item"
                v-for="(item) in jokes.list"
                :key="item.content"
              >
                <w-card-jokes :item="item"></w-card-jokes>
              </v-col>
            </transition-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import carousel from '../components/carousel.vue'
import noticeWords from '../components/noticeWords.vue'
import dividline from '../components/Dividingline.vue'
import hCard from '../components/hCard.vue'
import hCardnews from '../components/hCard_news.vue'
import wCardJokes from '../components/wCardJokes.vue'

export default {
  components: {
    hCard,
    hCardnews,
    wCardJokes,
    dividline,
    noticeWords,
    carousel
  },
  asyncData() {},
  data() {
    return {
      appid:
        '?app_id=tguwfpqsppmjnoli&app_secret=cGFyc25Bam80dXFlQ3FlaGtmeS9Kdz09',
      tab: null,
      page: 1,
      sliceN: 8,
      item: {
        icon: 'mdi-book',
        title: '精品文章',
        type: 'article',
        content: 'new',
        badge: true,
        color: 'red'
      },
      item2: {
        icon: 'mdi-book',
        title: '笑话',
        type: 'jokes'
      },

      pictures: [],
      newsTypes: [],
      news: [],
      dailyWord: [],
      jokes: []
    }
  },
  methods: {
    async getMusic(api) {
      let res = await this.$axios.get('http://39.105.168.171:3000' + api)
    },
    changebadge(item) {
      item.badge = false
    },
    shuffle: function() {
      this.$store.commit('shuffle', 'article')
    },
    random() {
      this.dailyWord = _.shuffle(this.dailyWord)
    },
    localshuffle(type) {
      this[type].list = _.shuffle(this[type].list)
    },

    // switchType(item){
    //   this.$router.push(`/${item.typeName}`,pagramer:item.typeId)
    // },
    getdatas(json) {
      this.$axios
        .get(`https://www.mxnzp.com/api/${json.api + this.appid}`)
        .then(res => {
          this[json.type] = res.data
        })
    }
  },
  created() {
    this.getdatas({
      type: 'pictures',
      api: 'image/girl/list?page=1'
    })
    this.getdatas({ type: 'newsTypes', api: 'news/types' })
    this.getdatas({
      type: 'news',
      api: `news/list?typeId=509&page=1`
    })
    this.getdatas({
      type: 'dailyWord',
      api: `daily_word/recommend?count=12`
    })
    this.getdatas({ type: 'jokes', api: `jokes/list?page=2` })
  }
}
</script>
<style>
.noticewords {
  /* position: absolute; */
  transition: all 1.6s;
}
.list-complete-item {
  /* max-width: 625px; */
  transition: all 1.2s;
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