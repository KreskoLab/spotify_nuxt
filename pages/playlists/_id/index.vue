<template>
  <div v-if="!$fetchState.pending" class="h-screen py-6 px-10"> 
 
    <Info :item="playlist" />
    <Tracks :tracks="playlist.tracks" />

  </div>
</template>

<script>
export default {
  async fetch(){
    await this.$axios.$get(`https://api.spotify.com/v1/playlists/${this.$route.params.id}`)
    .then((res) => {
      this.playlist = {
        id: res.id,
        uri: res.uri,
        name: res.name,
        img: res.images[0].url,
        owner: {
          id: res.owner.id,
          name: res.owner.display_name
        },
        total: res.tracks.total,
        followers: res.followers.total,
        tracks: res.tracks.items.map(item => ({
          id: item.track.id,
          name: item.track.name,
          album: {
            id: item.track.album.id,
            name: item.track.album.name
          },
          duration: new Date(item.track.duration_ms).toTimeString().substr(3,6)
        }))
      }
    })
  },
  data(){
    return{
      playlist: {}
    }
  }
}
</script>

<style>

</style>
