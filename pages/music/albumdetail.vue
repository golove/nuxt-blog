<template>
  <v-card flat color="transparent" :loading="$store.state.music.albums.length<2">
    <v-card flat color="rgba(255, 255, 255, 0.4)">
      <v-list-item three-line>
        <v-list-item-avatar size="155" tile>
          <v-img
            :src="$store.state.music.album.picUrl?$store.state.music.album.picUrl:$store.state.music.album.coverImgUrl"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="align-self-start">
          <v-list-item-title class="headline mb-2" v-text="$store.state.music.album.name"></v-list-item-title>
          <v-list-item-subtitle v-text="$store.state.music.album.copywriter"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <musiclist :items="$store.state.music.songs" :albflag="true" />
  </v-card>
</template>

<script>
import musiclist from '~/components/music/musiclist'
export default {
  components: {
    musiclist
  }
}
</script>


