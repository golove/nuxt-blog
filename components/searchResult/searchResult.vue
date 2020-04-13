<template>
  <v-row class="searesult" justify="center">
    <v-col sm="12" md="12" lg="9" xl="7">
      <v-toolbar color="rgba(255,255,255,0.3)" dense>
        <v-toolbar-title
          v-if="searchData.length>0"
        >{{`找到${convert(searchData.length)}条与${str}相关的结果`}}</v-toolbar-title>
        <v-toolbar-title v-else>{{`没有找到任何数据呢`}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('closeflag')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <transition-group name="list-complete" tag="div" class="row">
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
    </v-col>
  </v-row>
</template>

<script>
import hCard from '~/components/hCard.vue'
// import searchItem from './searchItem.vue'
export default {
  name: 'searchResult',
  components: { hCard },
  props: { searchData: Array, str: String },
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
  position: fixed;
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
</style>