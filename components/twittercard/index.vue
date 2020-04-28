<template>
  <div
    class="wrap"
    :min-height="maxheight"
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down')
    }"
  >
    <v-card
      :min-height="maxheight"
      :class="flag?'card1_1':''"
      class="card1 mx-auto"
      :color="item.color"
      :dark="!item.tcolor"
      ref="cHeight"
      shaped
    >
      <positive :item="item" @changeMaxH="changemaxheight" @changeflag="changeflag" />
    </v-card>

    <v-card
      :height="maxheight"
      :color="item.color"
      :dark="!item.tcolor"
      class="card2 overflowstyle"
      :class="flag?'card2_1':''"
      shaped
    >
      <msgboard @backmsg="backmsg" :item="item" />
    </v-card>
  </div>
</template>

<script>
import msgboard from '~/components/twittercard/back.vue'
import positive from '~/components/twittercard/positive.vue'

export default {
  name: 'twittercard',
  props: { item: Object, n: Number },
  components: { msgboard, positive },
  data() {
    return {
      flag: false,
      maxheight: '250px'
    }
  },

  methods: {
    swipe(direction) {},
    watchnow() {
      this.lettersEdit({ data: this.item, type: 'see' })
    },

    changemaxheight(number) {
      this.maxheight = number
    },
    changeflag() {
      this.flag = !this.flag
    },
    backmsg() {
      this.maxheight = '250px'
      setTimeout(() => {
        this.flag = !this.flag
      }, 620)
    },
    addmsg() {}
  }
}
</script>

<style scoped>
/* 保证正反面一样大，不然反转会很突兀*/
.wrap {
  position: relative;
  opacity: 0.8;
}
.wrap,
.card1,
.card2 {
  width: 100%;
  transition: all 0.6s;
}

.card1,
.card2 {
  backface-visibility: hidden;
}

.card2 {
  top: 0;
  overflow: scroll;
  position: absolute;
  transform: rotateY(180deg);
}
.card2_1 {
  transform: rotateY(0deg);
}
.card1_1 {
  transform: rotateY(180deg);
}
.textsyle {
  transition: max-height 0.3s;
}
.tstyle {
  max-height: 800px;
}
.wstyle {
  max-height: 130px;
  overflow: hidden;
}
.paginatsss {
  position: absolute;
  bottom: 0;
}
</style>