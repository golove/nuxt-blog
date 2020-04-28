<template>
  <v-card flat color="rgba(255,255,255,0)">
    <v-row justify="center">
      <v-col cols="12" xl="7" lg="9" md="11">
        <editor
          v-if="initData"
          :autofocus="true"
          :init-data="initData"
          :minHeight="900"
          :config="config"
          ref="editor"
          @ready="onReady"
          @change="onChange"
        />
        <v-card-actions>
          <action v-if="initData" :item="initData" :flag="true" :disabled="false" />
        </v-card-actions>
        <msg-board v-if="initData" :item="initData" />
      </v-col>
    </v-row>
  </v-card>
  <!-- </div> -->
</template>

<script>
import action from '~/components/actions.vue'
import msgBoard from '~/components/msgBoard.vue'
export default {
  async asyncData({ app, store, params }) {
    debugger
    if (store.state.content.article.length > 0) {
      return {
        initData: store.state.content.article.find(e => {
          return e._id === params.id
        })
      }
    } else {
      let res = await app.$axios.post('/searchBlog', { _id: params.id })
      return {
        initData: res[0]
      }
    }
  },
  async fetch({ app, store, params }) {
    // let { data } = app.$axios.get('/token')
    // store.commit('setToken', data.token)
  },
  components: { msgBoard, action },

  data() {
    return {
      switch2: true,

      savedData: {},
      config: {
        image: {
          endpoints: {
            byFile: 'http://39.105.168.171:8090/image',
            byUrl: 'http://39.105.168.171:8090/image-by-url'
          },
          field: 'image',
          types: 'image/*'
        },
        personality: {
          endpoint: 'http://39.105.168.171:8090/image'
        }
      }
    }
  },
  methods: {
    onSave(response) {
      // console.log(response)
      this.savedData = response
    },
    onReady() {
      console.log('ready')
    },
    onChange() {
      console.log('changed')
    }
  },
  mounted() {}
}
</script>

