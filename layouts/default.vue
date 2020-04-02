<template>
  <v-app>
    <v-navigation-drawer
      color="rgba(255, 255, 255, 0.1)"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="cliped"
      :fixed="fixed"
      app
    >
      <v-list>
        <v-list-item three-line>
          <v-list-item-avatar size="65">
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

        <v-list-item v-for="item in actions" :key="item.text" @click.stop="item.action">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar dense :clipped-left="cliped" :fixed="fixed" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-text-field
        @change="search"
        v-model="searchmodeldata"
        solo-inverted
        flat
        clearable
        dense
        rounded
        hide-details
        :label="searchlabel"
      ></v-text-field>
      <v-spacer></v-spacer>
      <span class="d-sm-none d-md-flex d-none">
        <v-menu v-if="$store.state.user.name" :close-on-click="true" :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              depressed
              class="ml-4textcolor--text"
              color="transparent"
              v-text="$store.state.user.name"
            ></v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in usermenus" :key="index" @click="item.action">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <div v-else>
          <v-btn class="mr-4" to="/login" text>login</v-btn>
        </div>
        <v-avatar size="40px">
          <img
            :src=" $store.state.user.avatar||'http://yanxuan.nosdn.127.net/85993c9896fee4a893dc299cd09581d9.jpg'"
            alt="avatar"
          />
        </v-avatar>
      </span>

      <v-spacer />
    </v-app-bar>
    <music
      :musicdata="$store.state.music.albums[0]"
      :tracks="$store.state.music.songs"
      style="zIndex:999 ;position:fixed"
    />
    <v-content :class="$vuetify.theme.dark?'':'backgroundstylecolor'">
      <v-container>
        <transition name="list-complete">
          <search-result
            class="list-item"
            v-if="$store.state.searchflag"
            :searchData="$store.state.content.searchData"
          />
        </transition>
        <nuxt />
      </v-container>
    </v-content>
    <blogfoot :item="{author:'Laughter',time:'2020',version:'V5.0'}" />
    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>-->
  </v-app>
</template>

<script>
// import musicplayer from '~/components/musicplayer'
import searchResult from '~/components/searchResult/searchResult'
import blogfoot from '~/components/blogfoot.vue'
import music from '~/components/music/Music'
import { mapActions, mapMutations } from 'vuex'
export default {
  components: { searchResult, blogfoot, music },
  data() {
    return {
      cliped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      searchmodeldata: '',
      searchlabel: '搜文章,作者,分类,发布时间',
      actions: [
        {
          text: 'fixed',
          action: this.changeflag,
          icon: 'mdi-minus'
        },
        {
          text: 'cliped',
          action: this.changeflag1,
          icon: 'mdi-box'
        },
        {
          text: 'miniVariant',
          action: this.changeflag2,
          icon: `mdi-chevron-${this.miniVariant ? 'right' : 'left'}`
        },
        {
          text: 'rightToLeft',
          action: this.changeflag3,
          icon: 'mdi-chevron-right'
        },
        {
          text: 'dark',
          action: this.changeflag4,
          icon: 'mdi-moon-waxing-crescent'
        }
      ],
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
        { title: '个人中心', action: this.managepath, icon: 'mdi-account' },

        {
          title: '注销',
          action: this.userexit,
          icon: 'mdi-arrow-left-bold-box-outline'
        }
      ],
      title: 'goLove'
    }
  },
  methods: {
    ...mapActions([
      'getdata',
      'userexit',
      'userlogin',
      'nextMusic',
      'reqMusic',
      'lastMusic',
      'playlist'
    ]),
    ...mapMutations(['setdata', 'searchFunc', 'searchMsgFunc']),
    // 控件方法
    changeflag() {
      this.fixed = !this.fixed
    },
    changeflag1() {
      this.cliped = !this.cliped
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

    search(string) {
      if (this.$route.path.indexOf('/music') !== -1) {
        this.searchMusic(string)
      } else if (this.$route.path.indexOf('/message') !== -1) {
        this.searchMsgFunc(string)
      } else {
        this.searchFunc(string)
      }
    },
    //音乐所搜
    searchMusic(e) {
      this.reqMusic({ api: '/search?keywords=' + e, type: 'searchSong' })
      this.$router.push('/music/songlist')
    }
  },
  computed: {
    isActive() {
      return this.$route.path
    }
  },

  watch: {
    isActive: function(n, o) {
      this.$store.commit('changeflag')
      this.searchmodeldata = ''
      if (n.indexOf('/music') !== -1) {
        this.searchlabel = '搜音乐,歌手,专辑'
      } else if (n.indexOf('/message') !== -1) {
        this.searchlabel = '搜留言,作者,发布时间'
      } else {
        this.searchlabel = '搜文章,作者,分类,发布时间'
      }
    }
  },
  created() {
    if (this.$store.state.content.article.length < 1) {
      this.getdata({ api: '/api/myblog', type: 'article' })
    }
    if (this.$store.state.content.letters.length < 1) {
      this.getdata({ api: '/api/letters', type: 'letters' })
    }
  }
}
</script>
<style  scoped>
.backgroundstylecolor {
  background: rgba(255, 255, 255, 0.6);
}
.musicsyle {
  position: fixed;
  top: 500px;
  left: 30px;
  z-index: 999;
}
.theme--light.v-application {
  /* animation: rotate 90s infinite linear; */
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
}
</style>