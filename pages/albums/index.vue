<template>
  <div class="h-screen py-6 px-10">
      
    <h1 class="text-2xl font-medium text-coolGray-100">Your albums</h1>

    <div class="flex flex-row flex-wrap mt-4">
      <div class="mr-6 mb-3" v-for="item in albums" :key="item.id">
        <NuxtLink :to="`/albums/${item.album.id}`">
          <img width="220" height="220" :src="item.album.images[0].url" :alt="item.album.name">
          <p class="text-center text-lg font-medium text-coolGray-100 mt-1">{{item.album.name}}</p>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  async fetch(){
    await this.$axios.$get('https://api.spotify.com/v1/me/albums')
    .then((res) => {
      this.albums = res.items
    })
  },
  data(){
    return{
      albums: []
    }
  }
}
</script>

<style>

</style>
