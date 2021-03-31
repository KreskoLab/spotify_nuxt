<template>
  <div class="flex flex-wrap">
    <div class="w-48 h-48 rounded-md border-r-8 border-b-8 border-double shadow p-2">
      <img class="rounded" :src="item.img" />
    </div>
    <div class="flex flex-col ml-6">
      <p class="font-bold text-coolGray-100 text-4xl">{{item.name}}</p>
        <p class="text-coolGray-100 font-medium uppercase underline hover:text-green-500 ml-1 mt-2" v-if="item.owner">
          <NuxtLink :to="`/artists/${item.owner.id}`">
            {{item.owner.name}}
          </NuxtLink>
        </p>
      <ul class="flex mt-auto font-medium text-coolGray-100 space-x-4 ml-1 mb-3">
        <li class="inline-flex items-center" v-if="item.release_date">
          <svg class="h-5 w-5 mr-2 text-coolGray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{item.release_date}}
        </li>
        <li class="inline-flex items-center" v-if="item.followers">
          <svg class="h-5 w-5 mr-2 text-coolGray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {{item.followers}}
        </li>
        <li class="inline-flex items-center">
          <svg class="h-5 w-5 mr-2 text-coolGray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          {{item.total}} треков
        </li>
        <li class="inline-flex items-center"> 
          <svg class="h-5 w-5 mr-2 text-coolGray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          43 мин. 50 сек.
        </li>
      </ul>
      <button @click="play()" class="w-32 inline-flex items-center font-semibold uppercase bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200 duration-150 px-7 py-2 text-white">
        <svg class="text-white w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>
        <span>Play</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    item: Object
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
  }
}
</script>

<style>
.underline {
    text-decoration-color: red;
    text-decoration: underline;
}
</style>
