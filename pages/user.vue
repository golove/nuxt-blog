<template>
  <div>
    <div class="linkstyle">
      <nuxt-link class="linkstyle-item" v-for="item in items" :key="item.text" :to="item.path">
        <v-icon color="white">{{item.icon}}</v-icon>
        {{item.text}}
      </nuxt-link>
    </div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        {
          icon: 'mdi-view-dashboard',
          text: '总览',
          path: '/user/',
          badge: false
        },
        {
          icon: 'mdi-information',
          text: '个人信息',
          path: '/user/userinfo',
          content: '6',
          badge: true,
          color: 'rgba(255,50,50,.3)'
        },

        { icon: 'mdi-pencil', text: '写文章', path: '/writeboard' },

        // {
        //   icon: 'mdi-book',
        //   text: '我的文章',
        //   path: '/user/myarticle',
        //   content: '6',
        //   badge: true,
        //   color: 'rgba(50,255,150,.3)'
        // },
        // {
        //   icon: 'mdi-star',
        //   text: '我的收藏',
        //   path: '/user/mycollect',
        //   content: '6',
        //   badge: true,
        //   color: 'rgba(60,90,255,.6)'
        // },

        {
          icon: 'mdi-account-circle',
          text: '上传头像',
          path: '/user/uploadavatar',
          badge: false
        }
      ]
    }
  },
  methods: {},
  watch: {
    article: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        this.filterdatas(val)
      },
      deep: true //true 深度监听
    }
  },
  computed: {
    article: function() {
      return this.$store.state.content.article
    }
  },
  mounted() {
    // this.filterdatas(this.$store.state.content.article)
    // console.log(this.$store.state.user.name === undefined)
    // if (this.$store.state.user.name === undefined) {
    //   this.$router.push('/login')
    // }
  }
}
</script>

<style scoped>
.linkstyle {
  margin: 10px 0 20px 0;
}
.linkstyle-item {
  margin: 8px;
  font-weight: 800;
  color: white;
}
.linkstyle-item a {
  color: white;
}
</style>