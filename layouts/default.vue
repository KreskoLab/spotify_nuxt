<template>
  <div class="flex flex-col sm:grid sm:grid-rows-6 sm:grid-cols-5 h-screen bg-emerald-700">

    <div class="order-last sm:relative sm:order-first sm:row-span-6">
      <Sidebar />
    </div>

    <div class="mb-auto overflow-auto sm:pt-4 sm:mb-0 sm:row-span-6 sm:col-span-4">
      <Nuxt />
    </div>

    <div class="sm:relative sm:row-start-auto sm:col-span-5">
      <Player />
    </div>
    
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  computed: {
    show() {
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
