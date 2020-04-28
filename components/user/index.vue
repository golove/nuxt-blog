<template>
  <v-row justify="space-between">
    <v-col v-if="$store.state.myCollects.length>0" class="py-0" cols="12">
      <dividline
        @shuffle="localshuffle('myCollects')"
        :item="{icon:'mdi-book',title:'收藏的文章',badge:false }"
      ></dividline>
    </v-col>

    <v-col cols="12">
      <transition-group name="list-complete" tag="div" class="row">
        <v-col
          class="list-complete-item"
          md="12"
          lg="6"
          xl="6"
          sm="6"
          v-for="(item) in $store.state.myCollects"
          :key="item.time"
        >
          <w-card :item="item"></w-card>
        </v-col>
      </transition-group>
    </v-col>

    <v-col v-if="$store.state.myArticle.length>0" class="py-0" cols="12">
      <dividline @shuffle="localshuffle('myLetters')" :item="item2"></dividline>
    </v-col>

    <v-col cols="12">
      <transition-group name="list-complete" tag="div" class="row">
        <v-col
          class="list-complete-item"
          :key="item._id"
          v-for="(item) in $store.state.myArticle"
          lg="3"
          xl="3"
          md="6"
          sm="4"
          xs="6"
        >
          <h-card :item="item"></h-card>
        </v-col>
      </transition-group>
    </v-col>
  </v-row>
</template>

<script>
import dividline from '~/components/Dividingline.vue'
import hCard from '~/components/hCard.vue'
import wCard from '~/components/wCard.vue'
export default {
  name: 'manageindex',
  components: { wCard, hCard, dividline },
  data() {
    return {
      item2: {
        icon: 'mdi-book',
        title: '我的文章',
        badge: false,
        color: 'red'
      }
    }
  }
}
</script>
