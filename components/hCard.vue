<template>
  <v-hover v-slot:default="{hover}" open-delay="100">
    <v-card @click="showDetail" max-width="100%">
      <v-img
        class="white--text align-end"
        width="auto"
        height="159px"
        :src="imageBlocks[0]?imageBlocks[0].data.file.url:'https://i.loli.net/2019/11/03/ShRIkmuvKeCBLgE.jpg'"
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
        <svg class="gbsoubadge" :style="{fill:$vuetify.theme.dark?'#1E1E1E': 'white'}">
          <use slot="icon" xlink:href="#bg_source_badge" />
        </svg>
        <v-avatar class="avatar" size="30">
          <img :src="item.avatar" />
        </v-avatar>
      </div>

      <v-toolbar class="mt-1" color="transparent" dense flat>
        <div class="d-flex justify-start align-center">
          <div class="dot"></div>
          {{item.author?item.author:'未知作者'}}
          <div class="dot"></div>
          {{item.type?item.type:'未分类'}}
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
                v-if="item.blocks"
                class="title font-weight-black"
              >{{headerBlocks[0]?headerBlocks[0].data.text:paragraphBlocks[0]?paragraphBlocks[0].data.text:'作者很懒居然什么文字都没写'}}</v-list-item-title>

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
            class="st0"
            d="M57.7,11.4c-1.4-1.4-2.7-2.9-4.1-4.4c-0.2-0.3-0.5-0.5-0.8-0.8c-0.2-0.2-0.3-0.3-0.5-0.5l0,0
	C48.6,2.2,43.5,0,38,0S27.4,2.2,23.6,5.7l0,0c-0.2,0.2-0.3,0.3-0.5,0.5c-0.3,0.3-0.5,0.5-0.8,0.8c-1.4,1.5-2.7,3-4.1,4.4
	c-5,5.1-11.7,6.1-18.3,6.3V31h9.4h8.9h39.4h4.9H76V17.6C69.4,17.4,62.7,16.5,57.7,11.4z"
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
      articleEdit: 'content/articleEdit',
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
</style>