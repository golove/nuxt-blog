<template>
  <v-card shaped class="card6 mx-auto" :color="item.color" :dark="!item.tcolor">
    <v-toolbar flat :color="item.color">
      <v-avatar size="42" color="grey darken-3">
        <v-img
          class="elevation-6"
          :src="$store.state.user.avatar?$store.state.user.avatar:'http://yanxuan.nosdn.127.net/8afbf57d821c3049fc156afc07a0d91c.jpg'"
        ></v-img>
      </v-avatar>

      <v-btn
        text
        class="pl-2 headline"
        :to="$store.state.user.name?'':'/login'"
      >{{$store.state.user.name?$store.state.user.name:'请先登录'}}</v-btn>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>-->
    </v-toolbar>

    <v-textarea
      class="ml-6 pl-12 pr-8 font-weight-bold headline"
      style="opacity:0.8"
      label="文字最多300字,图片暂不支持!"
      hint="文字最多300字,图片暂不支持!"
      counter
      :background-color="item.color"
      name="blog"
      solo
      flat
      v-model="item.text"
    ></v-textarea>

    <v-card-text class="ml-6 pl-12 pr-6 py-0" style="opacity:.6">{{item.time}}</v-card-text>

    <v-card-actions class="justify-space-around" style="opacity:0.7">
      <v-btn icon @click="colorpicker=!colorpicker">
        <v-icon class="mr-1">mdi-palette</v-icon>背景颜色
      </v-btn>
      <v-switch v-model="item.tcolor" label="字体颜色"></v-switch>
      <!-- <v-btn text>
        <v-file-input dense show-size label="File input"></v-file-input>
      </v-btn>-->
      <v-btn :disabled="btnDisabled && $store.state.user.name ? false:true" @click="post" icon>
        <v-icon class="mr-1">mdi-send</v-icon>发送
      </v-btn>
    </v-card-actions>
    <v-color-picker hide-canvas hex light v-show="colorpicker" v-model="item.color"></v-color-picker>
  </v-card>
</template>

<script>
export default {
  name: 'inputbox',
  data: () => ({
    btnDisabled: false,
    swatches: [
      ['#FF0000', '#AA0000', '#550000'],
      ['#FFFF00', '#AAAA00', '#555500'],
      ['#00FFFF', '#00AAAA', '#005555'],
      ['#00FF00', '#00AA00', '#005500'],
      ['#0000FF', '#0000AA', '#000055']
    ],
    colorpicker: false,
    item: {
      text: '',
      author: '',
      avatar: '',
      like: [],
      unlike: [],
      reply: [],
      flag: 0,
      tcolor: false,
      color: '',
      time: new Date()
    },
    user: {}
  }),
  methods: {
    post() {
      this.item.author = this.$store.state.user.name
      this.item.avatar = this.$store.state.user.avatar
      if (this.item.text !== '') {
        this.$axios
          .post('/api/insertletters', this.item)
          .then(res => {
            this.$store.commit('pushdata', {
              type: 'letters',
              data: res.ops[0]
            })
            this.item.text = ''
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    chiocepic() {}
  },
  computed: {
    lContent() {
      return this.item.text.length
    }
  },
  watch: {
    lContent: function(n, o) {
      this.btnDisabled = n > 5
    }
  }
}
</script>

<style>
.card6 {
  width: 100%;
  opacity: 0.8;
}
</style>