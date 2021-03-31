<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-pink-500 to-yellow-400">
    <div>
      <img class="w-2/5 mx-auto" src="spotify_white.png" />
    </div>
    <div class="mt-12">
      <button class="bg-white rounded-full hover:bg-green-50 focus:outline-none focus:ring-4 focus:ring-green-50 focus:ring-opacity-50 py-4 px-20">
        <span class="font-semibold text-xl uppercase tracking-wider">Войти</span>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'login'
}
</script>

<style>

</style>
