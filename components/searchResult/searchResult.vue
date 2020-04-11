<template>
  <v-row class="searesult" justify="center">
    <v-col sm="12" md="12" lg="9" xl="7">
      <v-card
        flat
        class="mx-auto"
        :color="$vuetify.theme.dark?'rgba(32,32,32,0.5)':'rgba(255,255,255,0.3)'"
      >
        <v-toolbar :color="$vuetify.theme.dark?'rgba(32,32,32,0.2)':'rgba(255,255,255,0.3)'" dense>
          <v-toolbar-title v-if="searchData.length>0">{{`搜索到${convert(searchData.length)}条相关结果`}}</v-toolbar-title>
          <v-toolbar-title v-else>{{`没有找到任何数据呢`}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('closeflag')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <transition-group justify="center" name="list-complete" tag="div" class="row">
          <v-col
            class="list-complete-item"
            :key="item._id"
            v-for="(item,index) in searchData"
            lg="3"
            xl="3"
            md="3"
            sm="4"
            xs="6"
          >
            <h-card :n="index " :item="item"></h-card>
          </v-col>
        </transition-group>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import hCard from '~/components/hCard.vue'
// import searchItem from './searchItem.vue'
export default {
  name: 'searchResult',
  components: { hCard },
  props: { searchData: Array },
  methods: {
    convert(num) {
      let changeNum = [
        '零',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九'
      ]
      let unit = ['', '十', '百', '千', '万']
      num = parseInt(num)
      let getWan = temp => {
        let strArr = temp
          .toString()
          .split('')
          .reverse()
        let newNum = ''
        for (var i = 0; i < strArr.length; i++) {
          newNum =
            (i == 0 && strArr[i] == 0
              ? ''
              : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
              ? ''
              : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
            newNum
        }
        return newNum
      }
      let overWan = Math.floor(num / 10000)
      let noWan = num % 10000
      if (noWan.toString().length < 4) {
        noWan = '0' + noWan
      }
      return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
    }
  }
}
</script>

<style scoped>
.searesult {
  width: 100vw;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 999;
}
.box {
  background: rgba(255, 255, 255, 0.6);
}
.bar {
  display: flex;
  height: 36px;
  widows: 100%;
  background: pink;
}
.searchR {
  width: 1100px;
  height: 100px;
  min-height: 100px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -400%);
}
</style>