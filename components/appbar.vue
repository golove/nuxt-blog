<template>
  <v-app-bar
    flat
    :color="$vuetify.theme.dark?'#232323':'rgba(240,229,237,.98)'"
    dense
    :clipped-left="cliped"
    :fixed="fixed"
    app
  >
    <v-app-bar-nav-icon
      class="d-flex d-sm-none d-none d-sm-flex d-md-none"
      @click.stop="$emit('changedraw')"
    />
    <v-spacer></v-spacer>

    <v-toolbar-title class="mr-4" @click="toHome">
      <!-- <img style="marginTop:10px" height="80px" src="../assets/golove.svg" alt /> -->
      <b class="headline font-weight-bold" style="color:#707070;cursor:pointer">golove</b>
    </v-toolbar-title>
    <v-divider inset class="mx-4" vertical></v-divider>
    <div class="tabstyle d-none d-md-flex">
      <v-tabs background-color="transparent" centered v-model="tab" align-with-title>
        <v-tab :to="e.to" v-for="(e,i) in items" :key="i">
          <b>{{ e.title }}</b>
        </v-tab>
      </v-tabs>
    </div>
    <v-spacer></v-spacer>
    <!-- 搜索框---------------------------- -->
    <div class="searchfather">
      <div
        @mouseenter.stop="mucmouseenter"
        @mouseleave.stop="mucmouseleave"
        class="inputstyle mr-4"
        :class="searhflag?'changesearchinput':'searchinput'"
      >
        <v-icon>mdi-magnify</v-icon>
        <input v-model="searchmodeldata" @change="search" type="text" :placeholder="searchlabel" />
      </div>
    </div>
    <!-- 登录按钮---------------------------- -->
    <span class="d-none d-sm-flex">
      <v-menu v-if="$store.state.user.name" :close-on-click="true" :offset-y="true">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" depressed rounded class="ml-4textcolor--text" color="#FF5E5E" dark>
            <!-- <v-icon>mdi-account-circle</v-icon> -->
            <v-avatar size="30px" class="mr-2">
              <img
                :src=" $store.state.user.avatar||'http://yanxuan.nosdn.127.net/85993c9896fee4a893dc299cd09581d9.jpg'"
                alt="avatar"
              />
            </v-avatar>
            <b>{{$store.state.user.name}}</b>
          </v-btn>
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
        <v-btn color="#FF5E5E" rounded class="mr-4" to="/login" depressed dark>login</v-btn>
      </div>
    </span>

    <!-- <v-btn @click.stop="$emit('changedraw')" icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>-->

    <v-btn @click.stop="$emit('changeflag4')" icon>
      <v-icon
        color="orange"
      >{{!$vuetify.theme.dark?'mdi-white-balance-sunny':'mdi-moon-waxing-crescent'}}</v-icon>
    </v-btn>
    <v-app-bar-nav-icon
      style="color:#98E511"
      class="d-none d-md-flex"
      @click.stop="$emit('changedraw')"
    />
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'appbar',
  props: { items: Array, fixed: Boolean, cliped: Boolean },
  data() {
    return {
      searhflag: false,
      timeout: Function,
      tab: null,
      searchmodeldata: '',
      searchlabel: '搜索文章,作者,分类,发布时间',
      usermenus: [
        // { title: '个人中心', action: this.managepath, icon: 'mdi-account' },

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
      userexit: 'userexit'
    }),
    ...mapMutations({
      filterdatas: 'filterdatas',
      setdata: 'content/setdata',
      searchFunc: 'content/searchFunc',
      searchMsgFunc: 'content/searchMsgFunc',
      changeFlag: 'content/changeflag'
    }),
    toHome() {
      this.$router.push('/')
    },
    search(obj) {
      let string = obj.target.value
      if (this.$route.path.indexOf('/music') !== -1) {
        this.searchMusic(string)
      } else if (this.$route.path.indexOf('/inspire') !== -1) {
        this.searchMsgFunc(string)
      } else {
        this.searchFunc(string)
      }
    },
    //音乐所搜
    searchMusic(e) {
      this.reqMusic({ api: '/search?keywords=' + e, type: 'searchSong' })
      this.$router.push('/music/songlist')
    },

    mucmouseenter() {
      clearTimeout(this.timeout)
      this.searhflag = true
    },
    mucmouseleave() {
      this.timeout = setTimeout(() => {
        this.searhflag = false
      }, 5000)
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
        this.searchlabel = '搜索音乐,歌手,专辑'
      } else if (n.indexOf('/inspire') !== -1) {
        this.searchlabel = '搜索留言,作者,发布时间'
      } else {
        this.searchlabel = '搜索文章,作者,分类'
      }
    }
  }
}
</script>

<style scoped>
.searchfather {
  position: relative;
  height: 35px;
  width: 90px;
}
.inputstyle {
  position: absolute;
  right: 0;
  background: #21b9f2;

  transition: width 0.3s ease;
  border: 1px solid transparent;
  border-radius: 25px;
  padding: 0 12px;
  display: flex;
  overflow: hidden;
}
.searchinput {
  width: 88px;
}
.changesearchinput {
  width: 264px;
}
.inputstyle i {
  color: white;
  position: absolute;
  align-self: center;
}
.inputstyle input {
  height: 35px;
  overflow: hidden;
  width: 100%;
  padding: 0 6px 0 24px;
}
input:focus {
  outline-style: none;
}
.tabstyle {
  width: 500px;
}
</style>