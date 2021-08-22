<template>
  <div class="py-2 px-2 sm:px-4">  
    <Items :items="artists" :name="type" />
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$axios.$get('https://api.spotify.com/v1/me/following?type=artist')
    .then((res) => {
      this.artists = res.artists.items
    })
  },
  data() {
    return {
      artists: [],
      type: 'artists'
    }
  }
}
</script>
