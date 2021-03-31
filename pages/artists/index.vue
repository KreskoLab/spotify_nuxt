<template>
    <div class="h-screen py-6 px-10">
      
      <h1 class="text-2xl font-medium text-coolGray-100">Followed artists</h1>

      <div class="flex flex-row flex-wrap mt-4">
        <div class="w-56 mr-6 mb-2" v-for="item in artists" :key="item.id">
          <NuxtLink :to="`/artists/${item.id}`">
            <img :src="item.images[1].url">
            <p class="text-center text-lg font-medium text-coolGray-100 mt-2">{{item.name}}</p>
          </NuxtLink>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  async fetch(){
    await this.$axios.$get('https://api.spotify.com/v1/me/following?type=artist')
    .then((res) => {
      this.artists = res.artists.items
    })
  },
  methods: {
    
  },
  data(){
    return{
      artists: []
    }
  }
}
</script>

<style>

</style>
