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
    </v-col>

    <transition-group class="justifycenter" name="list-complete">
      <inputbox :key="true" v-show="flag" class="list-complete-item mb-2" @setdata="setdata" />

      <twittercard
        v-for="(item,index) in $store.state.content.letters.slice((page-1)*sliceN,page*sliceN)"
        :key="item._id"
        class="list-complete-item ma-1 align-self-auto"
        :n="index + sliceN * (page - 1)"
        :item="item"
      />
    </transition-group>

    <v-col
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
    </v-col>
  </v-row>
</template>

<script>
import inputbox from '~/components/inputbox'
import twittercard from '~/components/twittercard'
export default {
  name: 'index',
  components: { twittercard, inputbox },
  data: () => ({
    flag: false,
    page: 1,
    sliceN: 12
  }),
  methods: {
    setdata(data) {
      console.log(data)
      this.blogs.unshift(data)
    },

    add: function() {
      this.computedItems.lenght.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove(n) {
      this.$store.commit('remove', n + 12 * (page - 1))
    },

    shuffle: function() {
      this.$store.commit('content/shuffle', 'letters')
    },

    beforeEnter: function(el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function(el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function(el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(
        el,
        {
          rotateZ: '45deg',
          translateY: '30px',
          translateX: '30px',
          opacity: 0
        },
        { complete: done }
      )
    }
  }
}
</script>

<style scoped>
.rowstyle {
  min-height: 95vh;
}
.justifycenter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
/* list-complete-item */
.list-complete-item {
  max-width: 625px;
  transition: all 1.6s;
  display: inline-block;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}
.list-complete-leave-active {
  position: absolute;
}

.groupstyle {
  position: relative;
}
.left-enter,
.left-leave-to {
  opacity: 0;
  transform: translateX(90px);
}

.left-enter-active,
.left-leave-active {
  transition: all 0.6s;
}

.alsdjflajs {
  min-height: 90vh;
}
</style>