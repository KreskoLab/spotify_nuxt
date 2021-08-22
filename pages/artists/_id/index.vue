<template>
  <div class="py-2 px-2 sm:px-4" v-if="!$fetchState.pending">

    <Info :item="artist" :icons="artist_icons" />

    <Albums @getAlbum="album = $event" />

  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$axios.$get(`https://api.spotify.com/v1/artists/${this.$route.params.id}`)
    .then((res) => {
      this.artist = {
        id: res.id,
        uri: res.uri,
        name: res.name,
        img: res.images[0].url,
        genres: res.genres,
        popularity: res.popularity,
        followers: res.followers.total
      }
    })
  },
  data() {
    return {
      artist: {},
      artist_icons: [
        {
          name: 'popularity',
          d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        },
        {
          name: 'followers',
          d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        }
      ],
    }
  }
}
</script>
