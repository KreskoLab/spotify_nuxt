<template>
  <aside class="flex flex-col sm:justify-between sm:h-full sm:px-8 sm:py-6 bg-emerald-700 text-coolGray-100">
    <div class="flex flex-row flex-wrap justify-between px-2 py-1 sm:flex-col sm:justify-start sm:space-y-5">

      <div class="inline-block text-center sm:flex hover:text-emerald-400" v-for="item in items" :key="item.name">
        <NuxtLink class="sm:flex" :to="`/${item.link}`">
          <svg class="mx-auto w-8 h-8" xmlns="http://www.w3.org/2000/svg" 
            :fill="item.name == 'Albums' || item.name == 'Playlists' ? 'currentColor' : 'none'" 
            viewBox="0 0 24 24" 
            :stroke="item.name == 'Albums' || item.name == 'Playlists' ? '' : 'currentColor'"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
          </svg>
          <span class="font-medium sm:self-end sm:ml-4">{{item.name}}</span>
        </NuxtLink>
      </div>

    </div>

    <div class="hidden sm:flex sm:flex-wrap sm:justify-between sm:items-center">
      <div class="w-12 h-12 rounded-md">
        <img class="rounded" :src="$auth.user.images[0].url" />
      </div>
      <svg @click="logout()" class="w-5 h-5 hover:text-emerald-400 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    </div>

  </aside>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.strategy.token.reset()
      this.$auth.strategy.refreshToken.reset()
    }
  },
  data() {
    return {
      items: [
        {
          name: 'Browse',
          link: 'browse',
          icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        },
        {
          name: 'Artists',
          link: 'artists',
          icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        },
        {
          name: 'Albums',
          link: 'albums',
          icon: 'M24 20.682c-.002 1.555-1.17 2.318-2.24 2.318-.903 0-1.76-.544-1.76-1.616 0-1.104 1.201-2.118 2.515-2.118.161 0 .323.015.485.047v-4.312l-6 1.229v5.45c-.002 1.556-1.18 2.32-2.258 2.32-.906 0-1.742-.542-1.742-1.61 0-1.106 1.201-2.125 2.518-2.125.16 0 .322.015.484.047v-6.52l7.998-1.792v8.682zm-13-6.682c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0-1c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm-1.818 2.646c-1.293-.508-2.319-1.534-2.827-2.827l-1.025.128c.6 1.746 1.979 3.125 3.725 3.724l.127-1.025zm-4.869-2.572l-1 .125c.757 2.648 2.84 4.731 5.488 5.488l.125-1c-2.194-.683-3.93-2.418-4.613-4.613zm8.505-6.72c1.293.508 2.319 1.534 2.827 2.828l1.025-.128c-.6-1.746-1.979-3.125-3.725-3.725l-.127 1.025zm-1.771 15.644c.082-.734.378-1.441.878-2.045-.304.03-.613.047-.925.047-4.963 0-9-4.038-9-9s4.037-9 9-9c4.912 0 8.91 3.957 8.992 8.849l1.978-.443c-.311-5.798-5.096-10.406-10.97-10.406-6.075 0-11 4.925-11 11s4.925 11 11 11l.047-.002zm2.151-18.685l-.125 1c2.195.682 3.931 2.418 4.613 4.613l1-.125c-.755-2.648-2.838-4.732-5.488-5.488z'
        },
        {
          name: 'Favorites',
          link: 'favorites',
          icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
        },
        {
          name: 'Playlists',
          link: 'playlists',
          icon: 'M12 21h-12v-2h12v2zm4-9l8-1v6.681c-.002 1.555-1.18 2.319-2.257 2.319-.907 0-1.743-.542-1.743-1.61 0-.96.903-1.852 2-2.073v-2.317l-4 .5v4.181c-.002 1.555-1.18 2.319-2.257 2.319-.907 0-1.743-.542-1.743-1.61 0-.96.903-1.852 2-2.073v-5.317zm-4 4.976h-12v-2h12v2zm0-3.976h-12v-2h12v2zm12-4h-24v-2h24v2zm0-4h-24v-2h24v2z'
        }
      ]
    }
  }
}
</script>

<style>
.nuxt-link-exact-active {
  color: #34D399;
}

.nuxt-link-active {
  color: #34D399;
}
</style>