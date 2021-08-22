<template>
  <div class="flex space-x-4 bg-blue-200">

      <div class="ml-1 w-32 sm:w-48 sm:ml-4 rounded-md border-r-8 border-b-8 border-double shadow p-2">
        <img class="rounded" :src="item.img" :alt="item.name" />
      </div>

      <div class="flex flex-col sm:ml-6">
        <h1 class="font-bold text-coolGray-100 text-2xl sm:text-4xl">{{item.name}}</h1>
         
        <NuxtLink 
          class="text-coolGray-100 font-medium uppercase underline hover:text-green-500 ml-1 mt-2" 
          :to="`/artists/${item.owner.id}`"
          v-if="item.owner"
        >
          {{item.owner.name}}
        </NuxtLink>
          
        <ul class="flex text-coolGray-100 font-medium space-x-4 mt-2 ml-1">
          <li class="inline-flex items-center" v-for="icon in icons" :key="icon.name" v-if="item[icon.name]">
            <svg class="text-coolGray-100 h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon.d" />
            </svg>
            {{icon.name == 'total' ? item[icon.name] + ' треков' : item[icon.name]}}
          </li>
        </ul>

        <div class="flex mt-auto space-x-4">

          <button @click="play()" class="inline-flex items-center justify-center w-24 sm:w-32 tracking-wider font-semibold uppercase text-coolGray-100 bg-emerald-500 hover:bg-emerald-400 rounded-full focus:outline-none focus:ring focus:ring-emerald-600 transition duration-100 ease-out py-1 sm:py-2 space-x-1">
            <svg class="text-coolGray-100 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
            </svg>
            <span>Play</span>
          </button>

          <button v-if="item.popularity"
            class="inline-flex items-center justify-center w-24 sm:w-32 tracking-wider font-semibold uppercase text-coolGray-100 hover:bg-emerald-400 rounded-full focus:outline-none focus:ring focus:ring-emerald-600 transition duration-100 ease-out py-1 sm:py-2">
            <span>Follow</span>
          </button>

        </div>

      </div>

  </div>
</template>

<script>
export default {
  props:{
    item: Object,
    icons: Array
  },
  methods: {
    play(){
      this.$store.commit('player/updateShow', true)
      this.$axios.$put(`https://api.spotify.com/v1/me/player/play`,
        {
          context_uri: this.item.uri,
          offset: {
            position: 0
          },
          position_ms: 0
        }
      )
    }
  },
  head() {
    return {
      title: this.item.name + ' - Nuxt Spotify'
    }
  }
}
</script>

<style>
.underline {
  text-decoration-color: red;
  text-decoration: underline;
}
</style>
