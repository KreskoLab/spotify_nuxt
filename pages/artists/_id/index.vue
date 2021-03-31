<template>
    <div v-if="!$fetchState.pending" class="h-screen py-6 px-10">

      <div class="flex">
        <div class="w-48 h-48 rounded-md border-r-8 border-b-8 border-double shadow p-2">
          <img class="rounded" :src="artist.images[0].url" />
        </div>

        <div class="flex flex-col ml-6">
          <p class="font-bold text-coolGray-100 text-4xl">{{artist.name}}</p>
          <ul class="text-coolGray-100 flex font-medium space-x-4 mt-2 ml-1 mb-3">
            <li class="inline-flex items-center">
              <svg class="text-coolGray-100 h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {{artist.popularity}}
            </li>
            <li class="inline-flex items-center">
              <svg class="text-coolGray-100 h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {{artist.followers.total}}
            </li>
          </ul>
          <button @click="" class="w-32 mt-auto inline-flex items-center font-semibold uppercase bg-emerald-500 rounded-full hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-200 duration-150 px-7 py-2 text-white">
            <svg class="text-coolGray-100 w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
            </svg>
            <span>Play</span>
          </button>
        </div>

      </div>

      <Albums @getAlbum="album = $event" />

    </div>
</template>

<script>
export default {
  async fetch(){
    await this.$axios.$get(`https://api.spotify.com/v1/artists/${this.$route.params.id}`)
    .then((res) => {
      this.artist = res
    })
  },
  methods: {
    play(){
      this.$store.commit('player/updateShow', true)
      this.$axios.$put(`https://api.spotify.com/v1/me/player/play`,
        {
          context_uri: this.artist.uri,
          position_ms: 0
        }
      )
    }
  },
  data(){
    return{
      artist: {},
      album: ''
    }
  }
}
</script>

<style>

</style>
