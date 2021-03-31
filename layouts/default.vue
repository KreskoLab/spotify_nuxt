<template>
  <div class="bg-emerald-700 grid grid-rows-6 grid-cols-5 h-screen">

    <div class="row-span-6">
      <Sidebar />
    </div>

    <div class="row-span-6 col-span-4 overflow-hidden overflow-y-auto">
      <Nuxt />
    </div>

    <div class="row-start-auto col-span-5">
      <Player />
    </div>
    
  </div>
</template>

<script>
export default {
  computed: {
    show(){
      return this.$store.state.player.show
    }
  }
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
