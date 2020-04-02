
<template>
  <v-row class="rowstyle" align="center" justify="center">
    <v-col cols="12" sm="9" md="6" lg="4">
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
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      vCode: '',
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
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      vcodeRules: [v => !!v || 'verifycode is required', v => this.wharrule(v)],
      passRules: [v => !!v || 'Pass is required']
    }
  },
  methods: {
    ...mapActions(['userlogin']),
    validate() {
      if (this.$refs.form.validate()) {
        this.$axios
          .post('/api/signin', this.user)
          .then(res => {
            console.log(res)
            ;(this.alertflag = true), (this.subtitle = res.msg)
            if (res.status === 200) {
              this.issuc = true
              this.userlogin(res.data)
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
          'http://www.mxnzp.com/api/verifycode/code?len=5&app_id=tguwfpqsppmjnoli&app_secret=cGFyc25Bam80dXFlQ3FlaGtmeS9Kdz09',
          {
            headers: { 'Access-Control-Allow-Origin': 'http://www.mxnzp.com' }
          }
        )
        .then(res => {
          this.vCode = ''
          this.verifycode = res.data
        })
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
  }
}
</script>
<style >
.rowstyle {
  height: 91vh;
}
</style>