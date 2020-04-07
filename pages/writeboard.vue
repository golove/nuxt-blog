<template>
  <v-card flat color="transparent" min-height="91vh">
    <v-container>
      <editor
        :autofocus="true"
        holder-id="codex-editor"
        :init-data="initData"
        :minHeight="700"
        :placeholder="placeholder"
        :config="config"
        @save="onSave"
        @ready="onReady"
        @change="onChange"
        ref="editor"
      />
    </v-container>
    <v-card-actions>
      <v-text-field color="textcolor" v-model="type" label="填写类别"></v-text-field>
      <v-spacer />
      <v-spacer />
      <v-btn id="save-button" :disabled="$store.state.user.name ? false:true" @click="save">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      initData: {},
      type: '',
      placeholder: '请输入内容吧',
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
    save() {
      this.$refs.editor.save()
    },

    onSave(response) {
      //   console.log(JSON.stringify(response))
      response.type = this.type
      response.author = this.$store.state.user.name
      response.avatar = this.$store.state.user.avatar
      response.like = []
      response.collect = []
      response.reply = []
      response.see = 0
      response.delete = 0
      // console.log(response)
      //   this.$store.state.article.unshift(response)
      if (response.blocks.length > 0) {
        this.$axios
          .post('/api/insert', response)
          .then(res => {
            console.log(res)
            this.$store.commit('content/pushdata', {
              type: 'article',
              data: res.ops[0]
            })
            this.$router.push('/')
            // console.log(res.ops[0])
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        alert('内容不能为空!!!')
      }
    },
    onReady() {
      console.log('ready')
    },
    onChange() {
      console.log('changed')
    }
  }
}
</script>
