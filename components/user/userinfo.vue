<template>
  <v-col class="px-0">
    <v-card flat color="rgba(255,255,255,0)" dark>
      <v-card-title class="headline font-weight-medium">个人详细信息</v-card-title>
      <v-row justify="space-around">
        <v-col class="pa-0" lg="8" md="8" sm="8" xs="9">
          <v-form ref="form" v-model="valid">
            <v-text-field label="姓名" :rules="nameRules" :disabled="editflag" v-model="user.name"></v-text-field>
            <v-text-field label="邮箱" :rules="emailRules" :disabled="editflag" v-model="user.email"></v-text-field>
            <v-text-field label="手机" :rules="telRules" :disabled="editflag" v-model="user.tel"></v-text-field>
            <v-text-field label="年龄" :rules="ageRules" :disabled="editflag" v-model="user.age"></v-text-field>
            <v-text-field
              label="性别"
              :rules="genderRules"
              :disabled="editflag"
              v-model="user.gender"
            ></v-text-field>
          </v-form>
        </v-col>
        <v-col lg="3" md="4" sm="4" xs="3">
          <img width="100%" :src="user.avatar" alt />

          <v-textarea
            name="input-7-1"
            label="个性签名"
            auto-grow
            rows="1"
            :disabled="editflag"
            v-model="user.signature"
          ></v-textarea>
        </v-col>
        <v-col cols="12" class="pa-0">
          <h4>更换头像</h4>
          <v-container>
            <useravatar
              :size="'32px'"
              @imgclick="imgsrcicon"
              :items="$store.state.content.avatars"
            />
          </v-container>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn color="transparent" @click="editflag=!editflag">{{editflag?'修改':'取消'}}</v-btn>
        <v-btn v-show="!editflag" :disabled="!valid" color="transparent" @click="updateFunc">提交</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
  <!-- </v-row> -->
</template>

<script>
import useravatar from '~/components/useravatar.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'userinfo',
  components: { useravatar },
  data: () => ({
    editflag: true,
    valid: true,
    user: {},
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    genderRules: [
      v => !!v || 'gender is required',
      v => (v && v.length === 1) || '请输入男或女'
    ],
    ageRules: [v => !!v || 'gender is required'],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passRules: [
      v => !!v || 'password is required',
      v => (v && v.length > 5) || 'password must be more than 5 characters'
    ],

    telRules: [
      v => !!v || 'tel is required',
      v => /^1[3456789]\d{9}$/.test(v) || '请输入正确手机号码!'
    ]
  }),
  methods: {
    ...mapMutations(['USERLOGIN']),
    updateFunc() {
      if (this.$refs.form.validate()) {
        this.$axios.post('/updateUser', this.user).then(res => {
          this.editflag = true
          let user = window.sessionStorage.getItem('user')
          this.USERLOGIN({ user: this.user, flag: user !== null })
        })
      }
    },
    imgsrcicon(e) {
      this.user.avatar = e.url
      this.editflag = false
      // console.log(this.user.imgsrc)
    }
  },
  mounted() {
    this.user = Object.assign({}, this.$store.state.user)
  }
}
</script>
