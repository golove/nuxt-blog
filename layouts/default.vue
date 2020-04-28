<template>
  <v-app :class="gray?'graystyle':''">
    <!-- <star></star>x -->
    <v-navigation-drawer
      :color="$vuetify.theme.dark?'#272727':'#F0E5ED'"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="cliped"
      :fixed="fixed"
      app
    >
      <v-list>
        <v-list-item three-line>
          <v-list-item-avatar size="45">
            <img
              :src="$store.state.user.avatar?$store.state.user.avatar:'http://yanxuan.nosdn.127.net/85993c9896fee4a893dc299cd09581d9.jpg'"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              v-if="$store.state.user.name"
              class="subtitle-1"
            >{{$store.state.user.name}}</v-list-item-title>

            <v-list-item-title v-else class="subtitle-1">
              <v-btn class="mr-4" to="/login" text>login</v-btn>
            </v-list-item-title>
            <v-list-item-subtitle>{{$store.state.user.signature||'自在飞花轻似梦,无边丝雨细如愁'}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-subheader>SUBSCRIPTIONS</v-subheader>

        <v-list-item>
          <v-list-item-action @click="changeflag2">
            <v-icon>{{`mdi-chevron-${miniVariant ? 'right' : 'left'}`}}</v-icon>
          </v-list-item-action>
          <v-switch v-model="miniVariant" label="迷你"></v-switch>
        </v-list-item>

        <v-list-item>
          <v-list-item-action @click="changeflag3">
            <v-icon>{{`mdi-dock-${$vuetify.rtl ? 'right' : 'left'}`}}</v-icon>
          </v-list-item-action>
          <v-switch v-model="$vuetify.rtl" :label="$vuetify.rtl?'正向':'反向'"></v-switch>
        </v-list-item>

        <v-list-item>
          <v-list-item-action @click="changeflag4">
            <v-icon>{{!$vuetify.theme.dark?'mdi-white-balance-sunny':'mdi-moon-waxing-crescent'}}</v-icon>
          </v-list-item-action>
          <v-switch v-model="$vuetify.theme.dark" :label="!$vuetify.theme.dark?'亮':'暗'"></v-switch>
        </v-list-item>

        <v-list-item>
          <v-list-item-action @click="graystyle">
            <v-icon>mdi-image-filter-black-white</v-icon>
          </v-list-item-action>
          <v-switch v-model="gray" label="灰阶"></v-switch>
        </v-list-item>

        <template v-if="$store.state.user.name">
          <v-subheader>SUBSCRIPTIONS</v-subheader>
          <v-list-item v-for="item in usermenus" :key="item.title" @click="item.action">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <appbar
      :items="items"
      @changeflag4="changeflag4"
      @changedraw="changedraw"
      :cliped="cliped"
      :fixed="fixed"
    />

    <v-content :class="$vuetify.theme.dark?'':'backgroundstylecolor'">
      <musicplayer />
      <transition name="list-complete">
        <search-result
          class="list-complete-item"
          @closeflag="changeFlag"
          :str="$store.state.content.string"
          v-if="$store.state.content.searchflag"
          :searchData="$store.state.content.searchData"
        />
      </transition>
      <v-container class="pa-0" :class="$store.state.content.searchflag?'searchblur':''">
        <transition name="list-complete">
          <nuxt class="list-complete-item" />
        </transition>
      </v-container>
    </v-content>
    <blogfoot
      :color="$vuetify.theme.dark?'#121212':'rgba(255,255,255,.6)'"
      :item="{author:'golove',time:'2020',version:'V5.0'}"
    />
  </v-app>
</template>

<script>
import appbar from '~/components/appbar.vue'
import star from '~/components/star.vue'
import musicplayer from '~/components/music/musicplayer.vue'
import searchResult from '~/components/searchResult/searchResult.vue'
import blogfoot from '~/components/blogfoot.vue'
import { mapActions, mapMutations } from 'vuex'
export default {
  components: { appbar, searchResult, blogfoot, musicplayer, star },
  data() {
    return {
      cliped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      gray: false,
      items: [
        {
          icon: 'mdi-apps',
          title: '主页',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '留言',
          to: '/inspire'
        },
        { title: '写文章', to: '/writeboard', icon: 'mdi-pencil' },
        { title: '音乐', to: '/music', icon: 'mdi-music' }
      ],
      usermenus: [
        { title: '管理中心', action: this.managepath, icon: 'mdi-account' },

        {
          title: '注销',
          action: this.userexit,
          icon: 'mdi-logout'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      userexit: 'userexit',
      userlogin: 'userlogin',
      getdata: 'content/getdata',
      reqMusic: 'music/reqMusic',
      getUser: 'getUser'
    }),
    ...mapMutations({ changeFlag: 'content/changeflag' }),

    changedraw() {
      this.drawer = !this.drawer
    },

    managepath() {
      this.$router.push('/manage')
    },
    // 控件方法
    changeflag() {
      this.fixed = !this.fixed
    },

    changeflag2() {
      this.miniVariant = !this.miniVariant
    },
    changeflag3() {
      this.$vuetify.rtl = !this.$vuetify.rtl
    },
    changeflag4() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    graystyle() {
      this.gray = !this.gray
    }
  },
  async mounted() {
    let user = window.sessionStorage.getItem('user')

    if (user !== null) {
      let res = await this.$axios.get('/getUser')
      this.userlogin({ user: res, flag: true })
      // this.filterdatas()
    }
  }
}
</script>
<style>
.theme--light.v-application {
  background: radial-gradient(
    200% 100% at bottom center,
    #f7f7b6,
    #e96f92,
    #75517d,
    #1b2947
  );
  background: radial-gradient(
    220% 105% at top center,
    #1b2947 10%,
    #75517d 40%,
    #e96f92 65%,
    #f7f7b6
  );
  background-attachment: fixed;
  overflow: hidden;
}
.backgroundstylecolor {
  background: rgba(255, 255, 255, 0.6);
}

.musicsyle {
  position: fixed;
  top: 500px;
  left: 30px;
  z-index: 999;
}
.searchblur {
  -webkit-filter: blur(55px);
  -moz-filter: blur(55px);
  -ms-filter: blur(55px);
  -o-filter: blur(55px);
  filter: blur(55px);
}

.graystyle {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  -webkit-filter: grayscale(1);
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
}
</style>