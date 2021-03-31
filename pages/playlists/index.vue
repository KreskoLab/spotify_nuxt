<template>
  <div class="h-screen py-6 px-10">
      
    <h1 class="text-2xl font-medium text-coolGray-100">Your playlists</h1>

    <div class="flex flex-row flex-wrap mt-4">
      <div class="w-56 mr-6 mb-2" v-for="item in playlists" :key="item.id">
        <NuxtLink :to="`/playlists/${item.id}`">
          <img :src="item.images[0].url">
          <p class="text-center text-lg font-medium text-coolGray-100">{{item.name}}</p>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  async fetch(){
    await this.$axios.$get(`https://api.spotify.com/v1/users/${this.$auth.user.id}/playlists`)
    .then((res) => {
      this.playlists = res.items
    })
  },
  data(){
    return{
      playlists: []
    }
  }
}
</script>
