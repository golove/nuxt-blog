<template>
  <v-card flat color="rgba(255,255,255,0)">
    <v-col>
      <editor
        :autofocus="true"
        :init-data="initData"
        :minHeight="900"
        :config="config"
        ref="editor"
        @ready="onReady"
        @change="onChange"
      />
    </v-col>

    <v-card-actions class="pt-0">
      <action :item="initData" :flag="true" :disabled="false" />
    </v-card-actions>
    <msg-board :item="initData" />
  </v-card>
  <!-- </div> -->
</template>

<script>
import action from '~/components/actions.vue'
import msgBoard from '~/components/msgBoard.vue'
export default {
  components: { msgBoard, action },

  data() {
    return {
      switch2: true,
      initData: this.$store.state.content.article.find(e => {
        return e._id === this.$route.params.id
      }),

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
      console.log(response)
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

