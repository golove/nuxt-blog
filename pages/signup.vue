
<template>
  <v-row class="rowstyle" align="center" justify="center">
    <v-col cols="12" sm="10" md="8" lg="6" xl="4">
      <v-card color="rgba(255,255,255,0)" class="elevation-12" dark>
        <v-toolbar color="rgba(255,255,255,0)" dark flat>
          <v-toolbar-title>注册</v-toolbar-title>
          <v-spacer />
          <v-avatar size="42px">
            <img alt="Avatar" v-if="user.avatar" :src="user.avatar" />

            <v-btn icon v-else color="pink">
              <v-icon else>mdi-plus</v-icon>
            </v-btn>
          </v-avatar>
        </v-toolbar>

        <v-container class="py-0">
          <useravatar :size="'32px'" @imgclick="imgsrcicon" :items="$store.state.content.avatars" />
        </v-container>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="user.name"
              label="username"
              name="login"
              prepend-icon="mdi-human"
              type="text"
            />
            <v-text-field
              prepend-icon="mdi-email"
              v-model="user.email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              v-model="user.pass"
              :rules="passRules"
              hint="At least 8 characters"
              counter
              label="password"
              required
              @click:append="show1 = !show1"
              prepend-icon="mdi-lock"
            />
            <div class="d-flex">
              <v-text-field
                prepend-icon="mdi-refresh"
                @click:prepend="getVerifycode"
                :rules="vcodeRules"
                label="请输入验证码"
                v-model="vCode"
                single-line
                clearable
                dense
              ></v-text-field>
              <v-img
                contain
                aspect-ratio="2.81"
                height="35px"
                :src="this.verifycode.verifyCodeImgUrl"
              ></v-img>
            </div>

            <v-radio-group row v-model="user.gender">
              <v-radio
                v-for="(e,n) in genders"
                :key="n"
                :label="e.gender"
                :color="e.color"
                :value="e.gender"
              ></v-radio>
            </v-radio-group>

            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              required
            >
              <template v-slot:label>
                <div>
                  阅读并接受
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <a target="_blank" href="/userAgreement" @click.stop v-on="on">用户协议</a>
                    </template>
                    Opens in new window
                  </v-tooltip>
                </div>
              </template>
            </v-checkbox>
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
          <v-btn color="primary" to="/login">已有账号?登录</v-btn>
          <v-btn :disabled="!valid" color="primary" @click="validate">注册</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CryptoJS from 'crypto-js'
import useravatar from '~/components/useravatar.vue'
import { mapActions } from 'vuex'
export default {
  name: 'signup',
  components: { useravatar },
  data() {
    return {
      autoLogin: false,
      genders: [
        { gender: '男', color: 'cyan' },
        { gender: '女', color: 'red' }
      ],
      vCode: '',
      verifycode: {},
      tempurls: [],
      show2: false,
      avatarflag: false,
      show1: false,
      alertflag: false,
      issuc: false,
      isSuccess: {
        true: 'success',
        false: 'error'
      },
      valid: true,
      subtitle: '',
      user: {
        name: '',
        pass: '',
        email: '',
        gender: '',
        age: '',
        tel: '',
        signature: '',
        createdate: new Date(),
        delflag: false,
        avatar: ''
      },

      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passRules: [
        v => !!v || 'password is required',
        v => (v && v.length > 5) || 'password must be more than 5 characters'
      ],
      vcodeRules: [v => !!v || 'verifycode is required', v => this.wharrule(v)],

      telRules: [
        v => !!v || 'tel is required',
        v => /^1[3456789]\d{9}$/.test(v) || '请输入正确手机号码!'
      ],
      checkbox: false
    }
  },
  methods: {
    ...mapActions({ getdata: 'content/getdata', userlogin: 'userlogin' }),
    validate() {
      if (this.$refs.form.validate()) {
        this.user.pass = CryptoJS.MD5(this.user.pass).toString()
        this.$axios
          .post('/signup', this.user)
          .then(res => {
            this.alertflag = true
            this.subtitle = res.msg
            if (res.status === 200) {
              this.issuc = true
              this.userlogin({ user: res.data, flag: this.autoLogin })
              setTimeout(() => {
                // this.$router.push({ path: "/" });
                // this.$router.go(-1)
                this.$router.push('/')
              }, 1000)
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
        })
    },
    imgsrcicon(e) {
      this.user.avatar = e.url
      // console.log(this.user.imgsrc)
    },
    wharrule(v) {
      // console.log(v, this.verifycode.verifyCode)
      if (v !== this.verifycode.verifyCode) {
        return '验证码错误请从新输入'
      } else {
        return true
      }
    }
  },
  mounted() {
    this.getVerifycode()
    if (this.$store.state.content.avatars.length === 0) {
      this.getdata({ api: '/dlavatar', type: 'avatars' })
    }
  }
}
</script>
<style>
.rowstyle {
  min-height: 91vh;
}
</style>