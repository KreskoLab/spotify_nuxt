<template>
  <div class="py-5" v-if="!$fetchState.pending">

    <h2 class="font-medium text-coolGray-100 mb-3 px-2 sm:px-4">Albums</h2>

    <div class="flex flex-row flex-wrap justify-around sm:justify-start">
      <NuxtLink 
        class="mb-2 w-40 sm:w-50 sm:mx-4 transform hover:scale-105 duration-300 delay-75" 
        v-for="item in albums.items" 
        :key="item.id" 
        :to="`/albums/${item.id}`"
      >
        <img :src="item.images[1].url">
        <p class="truncate text-lg font-medium text-coolGray-100 mt-1">{{item.name}}</p>
      </NuxtLink>
    </div>

  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$axios.$get(`https://api.spotify.com/v1/artists/${this.$route.params.id}/albums?market=${this.$auth.user.country}`)
    .then((res) => {
      this.albums = res
      this.$emit('getAlbum', this.albums.items[0].uri)
    })
  },
  data() {
    return {
      albums: []
    }
  }
}
</script>
