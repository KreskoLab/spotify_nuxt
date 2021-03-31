<template>

  <div v-if="!$fetchState.pending" class="h-screen py-6 px-10"> 
    <Info :item="album" />
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
      album: {}
    }
  }
}
</script>

<style>

</style>
