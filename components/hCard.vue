<template>
  <v-hover v-slot:default="{hover}" open-delay="100">
    <v-card :color="$vuetify.theme.dark?'#5A5A5A':'#F0E5ED'" max-width="100%">
      <v-img
        @click="showDetail"
        class="white--text align-end"
        width="auto"
        height="159px"
        :src="imageBlocks[0]?imageBlocks[0].data.file.url:'http://39.105.168.171:8090/image/image-1584819051368.jpg'"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out blue darken-2 v-card--reveal display-3 white--text"
            style="height:100%"
          >{{item.author}}</div>
        </v-expand-transition>
      </v-img>
      <div class="svgfather">
        <svg class="gbsoubadge" :style="{fill:$vuetify.theme.dark?'#5A5A5A': '#F0E5ED'}">
          <use slot="icon" xlink:href="#bg_source_badge" />
        </svg>
        <v-avatar class="avatar" size="30">
          <img :src="item.avatar" />
        </v-avatar>
      </div>

      <v-toolbar class="mt-1" color="transparent" dense flat>
        <div class="d-flex justify-start align-center">
          <div class="dot"></div>
          <a @click.stop="searchFunc(item.author)">{{item.author?item.author:'未知作者'}}</a>
          <div class="dot"></div>
          <a @click.stop="searchFunc(item.type)">{{item.type?item.type:'未分类'}}</a>
        </div>
        <v-spacer></v-spacer>
        <v-menu transition="slide-y-transition" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in menulists" :key="index" @click="item.func">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>

      <v-card-text class="text--primary py-0">
        <v-list color="transparent" three-line class="pa-0">
          <v-list-item class="pa-0">
            <v-list-item-content class="pa-0">
              <v-list-item-title
                @click="showDetail"
                v-if="item.blocks"
                class="title font-weight-black"
              >
                <a
                  class="astyle"
                >{{headerBlocks[0]?headerBlocks[0].data.text:paragraphBlocks[0]?paragraphBlocks[0].data.text:'作者很懒居然什么文字都没写'}}</a>
              </v-list-item-title>

              <v-list-item-subtitle
                class="font-weight-medium"
                v-if="paragraphBlocks[0]"
                v-text="paragraphBlocks[0].data.text"
              ></v-list-item-subtitle>
              <!-- <v-list-item-subtitle
              class="font-weight-medium"
              v-if="item.blocks[2]"
              v-text="item.blocks[2].data.text"
              ></v-list-item-subtitle>-->
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <action :item="item" :flag="false" :disabled="false" />
      <svg
        style="display:none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <symbol viewBox="0 0 76 31" id="bg_source_badge">
          <title>bg_source_badge</title>
          <path
            d="M57.8,11.4C56.4,10,55.1,8.5,53.7,7a6,6,0,0,0-.8-.8l-.5-.5h0A20.89,20.89,0,0,0,38.1,0,21.33,21.33,0,0,0,23.7,5.7h0l-.5.5-.8.8c-1.4,1.5-2.7,3-4.1,4.4-5,5.1-11.7,6.1-18.3,6.3l76.1-.1C69.5,17.4,62.8,16.5,57.8,11.4Z"
          />
        </symbol>
      </svg>
    </v-card>
  </v-hover>
</template>




<script>
import action from '~/components/actions.vue'

import { mapMutations } from 'vuex'
export default {
  name: 'hCard',
  props: { item: {}, n: Number },
  components: { action },
  data() {
    return {
      headerBlocks: [],
      imageBlocks: [],
      paragraphBlocks: [],
      menulists: [{ title: '删除', func: this.remove }]
    }
  },
  methods: {
    ...mapMutations({
      searchFunc: 'content/searchFunc',
      articleEdit: 'articleEdit',
      removed: 'content/remove'
    }),
    showDetail() {
      this.$router.push(`/${this.item._id}`)
      this.articleEdit({ data: this.item, type: 'see' })
    },
    remove() {
      this.removed({ type: 'article', n: this.n })
    },
    filterData(item) {
      for (let e of item.blocks) {
        if (e.type === 'header') {
          this.headerBlocks.push(e)
        } else if (e.type === 'image') {
          this.imageBlocks.push(e)
        } else if (e.type === 'paragraph') {
          this.paragraphBlocks.push(e)
        }
      }
    }
  },
  mounted() {
    this.filterData(this.item)
  }
}
</script>

<style>
.svgfather {
  position: absolute;
  width: 100%;
  top: 137px;
}
.gbsoubadge {
  top: 0;
  left: 0;
  width: 98px;
  height: 40px;
  position: absolute;
}
.avatar {
  left: 34px;
  top: 4px;
  margin: auto;
  position: absolute;
}

.dot {
  margin: 0px 4px 0px 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fb8c00;
}
.dot:nth-child(2) {
  background: #d81b60;
}
.dot:nth-child(3) {
  background: #00e5ff;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.6;
  position: absolute;
  width: 100%;
}
.astyle {
  text-decoration: none;
}

.astyle:hover {
  text-decoration: none;
  border-bottom: solid 2px rgb(0, 132, 255);
}
</style>