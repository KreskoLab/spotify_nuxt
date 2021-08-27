<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-pink-500 to-yellow-400"></div>
</template>

<script>
export default {
  layout: 'login',
  mounted() {
    console.log(this.$auth.user);
  }
}
</script>
