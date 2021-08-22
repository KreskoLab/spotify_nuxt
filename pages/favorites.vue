<template>
  <div class="py-2 px-2 sm:px-4" v-if="!$fetchState.pending"> 
    <Info :item="info" />
    <Tracks :tracks="tracks" />
  </div>
</template>

<script>
export default {
  async fetch(){
    await this.$axios.$get('https://api.spotify.com/v1/me/tracks')
    .then((res) => {

      this.info.total = res.total 

      this.tracks = res.items.map(item => ({
        id: item.track.id,
        name: item.track.name,
        album: {
          id: item.track.album.id,
          name: item.track.album.name
        },
        duration: new Date(item.track.duration_ms).toTimeString().substr(3,6)
      }))
      
    })
  },
  data(){
    return{
      tracks: [],
      info: {
        img: '/liked.png',
        name: 'Liked Songs',
        total: null
      }
    }
  }
  
}
</script>