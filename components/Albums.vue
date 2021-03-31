<template>
  <div class="py-5" v-if="!$fetchState.pending">

    <p class="font-medium text-coolGray-100 mb-3">Albums</p>

    <div class="flex flex-wrap flex-row w-full">

      <div class="w-36 h-36 p-2 mr-4 mb-4 rounded shadow-md hover:shadow duration-150" v-for="item in albums.items" :key="item.id">
        <NuxtLink :to="`/albums/${item.id}`">
          <img class="rounded" :src="item.images[1].url">
        </NuxtLink>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  async fetch(){
    await this.$axios.$get(`https://api.spotify.com/v1/artists/${this.$route.params.id}/albums?market=${this.$auth.user.country}`)
    .then((res) => {
      this.albums = res
      this.$emit('getAlbum', this.albums.items[0].uri)
    })
  },
  data(){
    return{
      albums: []
    }
  }
}
</script>
