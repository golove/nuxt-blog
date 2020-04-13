<template>
  <v-row>
    <v-col>
      <v-card flat class="mx-auto" color="rgba(255,255,255,0)" dark>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">MOREBEAUTY</div>
            <v-list-item-title class="headline mb-1">新增头像</v-list-item-title>

            <v-text-field v-model="url"></v-text-field>
          </v-list-item-content>
          <v-list-item-avatar size="80">
            <v-img :src="url"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <useravatar :items="urls" />

        <!-- <v-avatar class="ma-2" size="80" v-for="(e,i) in urls" :key="i">
      <v-img :src="e"></v-img>
        </v-avatar>-->

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :size="'45px'" @click="upload" color="rgba(255,255,255,.3)">upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import useravatar from '~/components/useravatar.vue'
export default {
  name: 'uploadavatar',
  components: { useravatar },
  data() {
    return {
      url: '',
      urls: []
    }
  },
  methods: {
    upload() {
      if (this.url) {
        this.urls.unshift(this.url)
        this.$axios.post('api/uploadavatar', { url: this.url }).then(res => {
          console.log(res)
        })
        this.url = ''
      } else {
        alert('内容不能为空!')
      }
    }
  }
}
</script>

<style>
</style>