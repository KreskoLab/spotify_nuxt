<template>
  <div>
    <h1 class="flex justify-evenly mx-1 mb-3 sm:justify-start sm:mx-4 text-2xl font-medium text-coolGray-100">Your {{name}}</h1>  

    <div class="flex flex-row flex-wrap justify-evenly sm:justify-start">
      <NuxtLink 
        class="mx-1 mb-2 w-40 sm:w-56 sm:mx-4 sm:mb-2 transform hover:scale-105 duration-300 delay-75" 
        v-for="item in items" 
        :key="item.id" 
        :to="`/${name}/${item.id}`"
      >
        <img :src="item.images[0].url">
        <p class="text-center text-lg font-medium text-coolGray-100 mt-2">{{item.name}}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    name: String
  },
  head() {
    return {
      title: this.$auth.user.display_name + ' ' + this.name + ' - Nuxt Spotify'
    }
  }
}
</script>
