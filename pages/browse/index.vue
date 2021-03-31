<template>
  <div v-if="!$fetchState.pending" class="h-screen py-6 px-10"> 

    <h1 class="text-2xl font-medium text-coolGray-100">New releases</h1>
 
    <div class="flex flex-row flex-wrap mt-4">
      <div class="mr-6 mb-3 w-56 transform hover:scale-110 hover:text-red-500" v-for="item in albums" :key="item.id">
        <NuxtLink :to="`/albums/${item.id}`">
          <img :src="item.img" :alt="item.name" />
          <p class="truncate text-center text-lg font-medium text-coolGray-100 mt-1">{{item.name}}</p>
        </NuxtLink>
      </div>
    </div>

    <h2 class="text-2xl font-medium text-coolGray-100 mt-2">Featured playlists</h2>
 
    <div class="flex flex-row flex-wrap mt-4">
      <div class="mr-6 mb-3 w-56 transform hover:scale-110 hover:text-red-500" v-for="item in playlists" :key="item.id">
        <NuxtLink :to="`/playlists/${item.id}`">
          <img :src="item.img" :alt="item.name">
          <p class="truncate text-center text-lg font-medium text-coolGray-100 mt-1">{{item.name}}</p>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  async fetch(){
    await this.getAlbums()
    await this.getPlaylists()
  },
  methods: {
    async getAlbums(){
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
    async getPlaylists(){
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
  data(){
    return{
      albums: [],
      playlists: []
    }
  }
  
}
</script>