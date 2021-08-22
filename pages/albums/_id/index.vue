<template>

  <div class="py-2 px-2 sm:px-4" v-if="!$fetchState.pending"> 
    <Info :item="album" :icons="album_icons" />
    
    <Tracks :tracks="album.tracks" />
  </div>

</template>

<script>
export default {
  async fetch(){
    await this.$axios.$get(`https://api.spotify.com/v1/albums/${this.$route.params.id}`)
    .then((res) => {
      this.album = {
        id: res.id,
        uri: res.uri,
        name: res.name,
        img: res.images[0].url,
        owner: {
          id: res.artists[0].id,
          name: res.artists[0].name
        },
        total: res.total_tracks,
        release_date: new Date(res.release_date).getFullYear(),
        tracks: res.tracks.items.map(item => ({
          id: item.id,
          name: item.name,
          duration: new Date(item.duration_ms).toTimeString().substr(3,6)
        }))
      }
    })
  },
  data(){
    return{
      album: {},
      album_icons: [
        {
          name: 'release_date',
          d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
        },
        {
          name: 'total',
          d: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3'
        }
      ]
    }
  }
}
</script>
