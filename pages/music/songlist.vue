<template>
  <div>
    <musiclist :items="$store.state.music.searchSong.songs" />
  </div>
</template>
 

<script>
import musiclist from '~/components/music/musiclist'
export default {
  components: {
    musiclist
  }
}
</script>
