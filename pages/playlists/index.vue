<template>
  <div class="py-2 px-2 sm:px-4">
    <Items :items="playlists" :name="type" />
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$axios.$get(`https://api.spotify.com/v1/users/${this.$auth.user.id}/playlists`)
    .then((res) => {
      this.playlists = res.items
    })
  },
  data() {
    return {
      playlists: [],
      type: 'playlists'
    }
  }
}
</script>
