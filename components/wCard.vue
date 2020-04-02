<template>
  <v-hover v-slot:default="{ hover }" open-delay="200">
    <v-card
      :elevation="hover ? 16 : 0"
      color="rgba(255,255,255,0.5)"
      shaped
      style="overflow:hidden"
      max-height="206px"
      max-width="100%"
      @click="showDetail"
    >
      <v-img
        style="position:absolute;width: 100%;height:auto;filter: blur(35px);opacity:0.1;z-index: 0"
        :src="item.pic?item.pic:'https://i.loli.net/2019/11/03/Ga6gdADXFjo7iL1.jpg'"
      ></v-img>
      <div style="overflow: hidden" class="d-flex justify-start align-center">
        <!-- <v-img
        class="d-none d-sm-flex"
        width="41%"
        :src="item.pic?item.pic:'http://yanxuan.nosdn.127.net/3f93828304a82d7f23c106e24d80eb39.jpg'"
        ></v-img>-->
        <div>
          <v-card-subtitle class="py-2 d-flex justify-start align-center">
            <v-avatar size="30">
              <img :src="item.avatar" />
            </v-avatar>

            <!-- <div class="dot dot1"></div> -->
            {{item.author?item.author:'未知作者'}}
            <div class="dot dot2"></div>
            {{item.type?item.type:'未分类'}}
            <!-- <div class="dot dot3"></div>
            {{item.sorce?item.sorce:"未知来源"}}-->
          </v-card-subtitle>
          <v-list color="transparent" three-line class="py-0">
            <v-list-item>
              <v-list-item-content class="py-0">
                <v-list-item-title class="title font-weight-bold">{{item.blocks[0].data.text}}</v-list-item-title>
                <v-list-item-subtitle
                  class="font-weight-medium"
                  v-if="item.blocks[1]"
                  v-text="item.blocks[1].data.text"
                ></v-list-item-subtitle>
                <!-- <v-list-item-subtitle
                class="font-weight-medium"
                v-if="item.blocks[2]"
                v-text="item.blocks[2].data.text"
                ></v-list-item-subtitle>-->
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <action :item="item" :disabled="false" :flag="true" />
          <!-- <v-card-actions class="py-0">
          <v-btn disabled text>
            <v-icon small>mdi-clock-outline</v-icon>
            {{new Date(item.time).toLocaleDateString()}}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn disabled text>
            <v-icon small>mdi-eye</v-icon>
            {{item.see}}
          </v-btn>
          <v-btn disabled text>
            <v-icon small>mdi-chat-processing</v-icon>
            {{item.reply.length}}
          </v-btn>
          </v-card-actions>-->
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
import action from '~/components/actions.vue'
import { mapMutations } from 'vuex'
export default {
  props: { item: {} },
  components: { action },
  name: 'wCard',
  methods: {
    ...mapMutations(['articleEdit']),
    showDetail() {
      this.$router.push(`/${this.item._id}`)
      this.articleEdit({ data: this.item, type: 'see' })
    }
  }
}
</script>

<style scoped>
.subtitle:hover {
  color: #37bdca;
}
.dot {
  margin: 0px 4px 0px 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fb8c00;
}
.dot2 {
  background: #d81b60;
}
.dot3 {
  background: #00e5ff;
}
</style>
