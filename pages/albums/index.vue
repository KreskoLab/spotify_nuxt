<template>
  <div class="py-2 px-2 sm:px-4">  
    <Items :items="albums" :name="type" />
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$axios.$get('https://api.spotify.com/v1/me/albums')
    .then((res) => {
      this.albums = res.items.map(item => {
        return {
          id: item.album.id,
          name: item.album.name,
          images: [
            { url: item.album.images[0].url }
          ]
        }
      })
    })
  },
  data() {
    return {
      albums: [],
      type: 'albums'
    }
  }
}
</script>
