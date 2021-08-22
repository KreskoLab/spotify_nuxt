<template>
  <div class="py-2 px-2 sm:px-4" v-if="!$fetchState.pending"> 

    <h1 class="flex justify-evenly mx-1 mb-3 sm:justify-start sm:mx-4 text-2xl font-medium text-coolGray-100">New releases</h1>
    
    <div class="flex flex-row flex-wrap justify-evenly sm:justify-start">
      <NuxtLink 
        class="mx-1 mb-2 w-40 sm:w-56 sm:mx-4 transform hover:scale-105 duration-300 delay-75" 
        v-for="item in albums" 
        :key="item.id"
        :to="`/albums/${item.id}`"
      >
        <img :src="item.img" :alt="item.name">
        <p class="truncate text-lg font-medium text-coolGray-100 mt-1">{{item.name}}</p>
      </NuxtLink>
    </div>

    <h1 class="flex justify-evenly mx-1 mb-3 sm:justify-start sm:mx-4 text-2xl font-medium text-coolGray-100">Featured playlists</h1>

    <div class="flex flex-row flex-wrap justify-evenly sm:justify-start">
      <NuxtLink 
        class="mx-1 mb-2 w-40 sm:w-56 sm:mx-4 sm:mb-2 transform hover:scale-105 duration-300 delay-75" 
        v-for="item in playlists" 
        :key="item.id"
        :to="`/playlists/${item.id}`"
      >
        <img :src="item.img" :alt="item.name">
        <p class="truncate text-lg font-medium text-coolGray-100 mt-1">{{item.name}}</p>
      </NuxtLink>
    </div>

  </div>
</template>

<script>
export default {
  async fetch() {
    await this.getAlbums()
    await this.getPlaylists()
  },
  methods: {
    async getAlbums() {
      await this.$axios.$get('https://api.spotify.com/v1/browse/new-releases?limit=12')
      .then((res) => { 
        this.albums = res.albums.items.map(item => ({
          id: item.id,
          name: item.name,
          img: item.images[1].url,
          artist: item.artists[0].name,
        }))
      })
    },
    async getPlaylists() {
      await this.$axios.$get('https://api.spotify.com/v1/browse/featured-playlists?limit=12')
      .then((res) => { 
        this.playlists = res.playlists.items.map(item => ({
          id: item.id,
          name: item.name,
          img: item.images[0].url,
          owner: item.owner.display_name
        }))
      })
    }
  },
  data() {
    return {
      albums: [],
      playlists: []
    }
  }
}
</script>