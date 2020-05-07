
<template>
  <v-row class="rowstyle" align="center" justify="center">
    <v-col cols="12" sm="10" md="8" lg="6" xl="4">
      <v-card class="elevation-12" color="rgba(255,255,255,0)" dark>
        <v-toolbar color="rgba(255,255,255,0)" dark flat>
          <v-toolbar-title>登录</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="user.name"
              :counter="10"
              :rules="nameRules"
              label="userName"
              name="name"
              prepend-icon="mdi-human"
              type="text"
            />

            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="user.pass"
              :rules="passRules"
            />
            <div class="d-flex">
              <v-text-field
                :prepend-icon="wharrule(vCode)?'mdi-check':'mdi-window-close'"
                :rules="vcodeRules"
                @keyup.13="validate"
                label="请输入验证码"
                v-model="vCode"
                single-line
                clearable
                dense
              ></v-text-field>
              <v-img
                title="看不清?点击更换"
                @click="getVerifycode"
                contain
                style="cursor:pointer"
                aspect-ratio="2.81"
                height="35px"
                :src="this.verifycode.verifyCodeImgUrl"
              ></v-img>
            </div>

            <v-checkbox v-model="autoLogin" label="自动登录"></v-checkbox>
            <v-alert dense outlined v-show="alertflag" :type="isSuccess[issuc]">
              {{
              subtitle
              }}
            </v-alert>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" to="/">取消</v-btn>
          <v-btn color="primary" to="/signup">没有账号?注册</v-btn>
          <v-btn :disabled="!valid" @click="validate" color="primary">登录</v-btn>
          <!-- <v-btn @click="setCookie">cookies</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CryptoJS from 'crypto-js'
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      vCode: '',
      autoLogin: false,
      verifycode: {},
      subtitle: '',
      alertflag: false,
      issuc: false,
      isSuccess: {
        true: 'success',
        false: 'error'
      },
      user: {
        name: '',
        pass: ''
      },
      valid: true,
      nameRules: [
        v => !!v || '忘写名字啦!!!',
        v => (v && v.length <= 10) || '名字不能超过10个字符哦'
      ],
      vcodeRules: [v => !!v || '你忘写了验证码啦', v => this.wharrule(v)],
      passRules: [v => !!v || '嘿等等你密码还没写呢']
    }
  },
  methods: {
    ...mapActions({ userlogin: 'userlogin', getdata: 'content/getdata' }),
    validate() {
      if (this.$refs.form.validate()) {
        this.$axios
          .post('/login', {
            name: this.user.name,
            pass: CryptoJS.MD5(this.user.pass).toString()
          })
          .then(res => {
            this.alertflag = true
            this.subtitle = res.msg
            if (res.status === 200) {
              this.issuc = true
              this.userlogin({ user: res.data, flag: this.autoLogin })
              setTimeout(() => {
                this.$router.go(-1)
              }, 600)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    getVerifycode() {
      this.$axios
        .get(
          'https://www.mxnzp.com/api/verifycode/code?len=5&app_id=tguwfpqsppmjnoli&app_secret=cGFyc25Bam80dXFlQ3FlaGtmeS9Kdz09'
        )
        .then(res => {
          this.vCode = ''
          this.verifycode = res.data
          // console.log(res)
        })
    },

    wharrule(v) {
      if (v !== this.verifycode.verifyCode) {
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    this.getVerifycode()
  }
}
</script>
<style >
.rowstyle {
  min-height: 91vh;
}
</style>