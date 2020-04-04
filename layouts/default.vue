<template>
  <v-app :class="gray?'graystyle':''">
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
          <v-list-item-action @click="changeflag1">
            <v-icon>mdi-box</v-icon>
          </v-list-item-action>
          <v-switch v-model="cliped" label="cliped"></v-switch>
        </v-list-item>

        <v-list-item>
          <v-list-item-action @click="changeflag2">
            <v-icon>{{`mdi-chevron-${miniVariant ? 'right' : 'left'}`}}</v-icon>
          </v-list-item-action>
          <v-switch v-model="miniVariant" label="miniVariant"></v-switch>
        </v-list-item>

        <v-list-item>
          <v-list-item-action @click="changeflag3">
            <v-icon>{{`mdi-chevron-${$vuetify.rtl ? 'right' : 'left'}`}}</v-icon>
          </v-list-item-action>
          <v-switch v-model="$vuetify.rtl" label="rightToLeft"></v-switch>
        </v-list-item>

        <v-list-item>
          <v-list-item-action @click="changeflag4">
            <v-icon>{{$vuetify.theme.dark?'mdi-sunshine':'mdi-moon-waxing-crescent'}}</v-icon>
          </v-list-item-action>
          <v-switch v-model="$vuetify.theme.dark" :label="$vuetify.theme.dark?'light':'dark'"></v-switch>
        </v-list-item>

        <v-list-item>
          <v-list-item-action @click="graystyle">
            <v-icon>{{`mdi-chevron-${miniVariant ? 'right' : 'left'}`}}</v-icon>
          </v-list-item-action>
          <v-switch v-model="gray" label="gray"></v-switch>
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

    <v-content :class="$vuetify.theme.dark?'':'backgroundstylecolor'">
      <musicplayer />
      <v-container>
        <transition name="list-complete">
          <search-result
            class="list-complete-item"
            @closeflag="changeFlag"
            v-if="$store.state.content.searchflag"
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
import musicplayer from '~/components/music/musicplayer'
import searchResult from '~/components/searchResult/searchResult'
import blogfoot from '~/components/blogfoot.vue'
// import music from '~/components/music/Music'
import { mapActions, mapMutations } from 'vuex'
export default {
  components: { searchResult, blogfoot, musicplayer },
  data() {
    return {
      cliped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      searchmodeldata: '',
      searchlabel: '搜文章,作者,分类,发布时间',
      gray: true,
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
    ...mapActions({
      userexit: 'userexit',
      userlogin: 'userlogin',
      getdata: 'content/getdata',
      reqMusic: 'music/reqMusic'
    }),
    // ...mapMutations(['setdata', 'searchFunc', 'searchMsgFunc']),
    ...mapMutations({
      setdata: 'content/setdata',
      searchFunc: 'content/searchFunc',
      searchMsgFunc: 'content/searchMsgFunc',
      changeFlag: 'content/changeflag'
    }),
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
    graystyle() {
      this.gray = !this.gray
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
      this.changeFlag()
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
    if (this.$store.state.content.avatars.length < 1) {
      this.getdata({ api: '/api/dlavatar', type: 'avatars' })
    }
  }
}
</script>
<style>
.list-complete-item {
  /* max-width: 625px; */
  transition: all 1.2s;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}
.list-complete-leave-active {
  position: absolute;
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
.graystyle {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  -webkit-filter: grayscale(1);
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
}
.theme--light.v-application {
  /* !!!!!!!!!使网站变灰!!!!!!!!!!!!! */

  /* ^^^^^^^^^^^使网站变灰^^^^^^^^^^ */

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