<template>
  <div class="flex flex-row flex-wrap justify-start	pr-3 sm:justify-between sm:px-8 sm:py-4 sm:space-x-3 text-coolGray-100 bg-emerald-400" v-if="player">

    <div class="flex items-center">
      <img class="h-20 w-20 sm:rounded-full border-4 border-green-100" :src="track.img" :alt="track.name" />
      <div class="ml-3 sm:ml-4 w-16 sm:w-auto">
        <h1 class="text-lg sm:text-xl font-medium truncate">{{track.name}}</h1>
        <h2 class="truncate font-medium hover:text-emerald-700 duration-500">{{track.artist}}</h2>
      </div>
    </div>

    <div class="flex items-center space-x-4 ml-auto sm:ml-0">
      <button @click="previousTrack()" class="inline-flex focus:outline-none hover:text-emerald-700 transition duration-500 w-4 h-4 sm:w-6 sm:h-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M22 24l-18-12 18-12v24zm-19-24v24h-1v-24h1zm2.803 12l15.197 10.132v-20.263l-15.197 10.131z"/>
        </svg>
      </button>
      <button @click="controll()" class="inline-flex focus:outline-none hover:text-emerald-700 transition duration-500 w-8 h-8 sm:w-14 sm:h-14">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path v-if="track.paused" d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
          <path v-else d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
        </svg>
      </button>
      <button @click="nextTrack()" class="inline-flex rounded-full focus:outline-none hover:text-emerald-700 transition duration-500 w-4 h-4 sm:w-6 sm:h-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M2 24l18-12-18-12v24zm19-24v24h1v-24h-1zm-2.803 12l-15.197 10.132v-20.263l15.197 10.131z"/>
        </svg>
      </button>
    </div>

    <div class="hidden sm:flex sm:flex-row sm:items-center sm:w-48 md:w-2/5 sm:space-x-2">
      <span>{{progress}}</span>
      <div class="bg-warmGray-300 rounded-full w-full h-2 overflow-hidden">
        <div class="bg-coolGray-100 h-2" role="progressbar" :style="{ width: progress_bar }"></div>
      </div>
      <span>{{duration}}</span>
    </div>

    <div class="flex items-center ml-4 sm:ml-0 sm:space-x-6">
      <button @click="replay()" class="hidden sm:inline-flex rounded-full focus:outline-none hover:text-emerald-700 transition duration-500 w-6 h-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z"/>
        </svg>
      </button>
      <button @click="like()" class="inline-flex rounded-full focus:outline-none hover:text-emerald-700 transition duration-500 w-6 h-6 sm:w-8 sm:h-8">
        <svg xmlns="http://www.w3.org/2000/svg" :fill="checked ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
    
  </div>
</template>

<script>

export default {
  mounted() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = this.$auth.strategy.token.get().replace('Bearer','').trim();

      this.player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
      });

      // Error handling
      this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
      this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
      this.player.addListener('account_error', ({ message }) => { console.error(message); });
      this.player.addListener('playback_error', ({ message }) => { console.error(message); });

      this.player.setName("Nuxt Spotify").then(() => {
        console.log('Player name updated!');
      });

      // Playback status updates
      this.player.addListener('player_state_changed', state => {
        this.$store.commit('player/updateTrack', state) 
        this.$store.dispatch('player/check', state.track_window.current_track.id)
      });

      // Ready
      this.player.addListener('ready', ({ device_id }) => {
        this.id = device_id
        this.transfer(device_id)
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      this.player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      this.player.connect();
    }
  },
  head() {
    return {
      script: [
        {
          src: "https://sdk.scdn.co/spotify-player.js",
        }
      ],
    }
  },
  methods: {
    controll() {
      if(this.track.paused) {
        this.player.resume()
      }
      else {
        this.player.pause()
      }
    },
    transfer(id) {
      this.$axios.$put(`https://api.spotify.com/v1/me/player`, { device_ids: [id] })
    },
    nextTrack() {
      this.player.nextTrack()
    },
    previousTrack() {
      this.player.previousTrack()
    },
    replay() {
      this.player.pause()
      this.$axios.$put(`https://api.spotify.com/v1/me/player/seek?position_ms=0&device_id=${this.id}`)
      .then((res) => {
        setTimeout(() => this.player.resume(), 500)
      })
    },
    like() {
      if(!this.checked) {
        this.$axios.$put(`https://api.spotify.com/v1/me/tracks?ids=${this.track.id}`)
        .then((res) => {
          this.$store.commit('player/updateChecked', true)
        })
      }
      else {
        this.$axios.$delete(`https://api.spotify.com/v1/me/tracks?ids=${this.track.id}`)
        .then((res) => {
          this.$store.commit('player/updateChecked', false)
        })
      }
    },
    updateProgress() {
      if(!this.track.paused) {
        this.interval = setInterval(() => {
          if (this.track.progress + 1000 <= this.track.duration) {
            this.$store.commit('player/updateProgress', this.track.progress + 1000)
          }
        }, 1000);
      }
      else{
        clearInterval(this.interval)
      }
    }
  },
  watch: {
    'track.paused': function () {
      this.updateProgress()
    }
  },
  computed: {
    track() {
      return this.$store.state.player.track
    },
    checked() {
      return this.$store.state.player.checked
    },
    progress() {
      return new Date(this.$store.state.player.track.progress).toTimeString().substr(3,6)
    },
    duration() {
      return new Date(this.$store.state.player.track.duration).toTimeString().substr(3,6)
    },
    progress_bar() {
      return (100 * this.track.progress) / this.track.duration + '%'
    }
  },
  data() {
    return { 
      player: null,
      interval: null,
      id: null
    }
  }
}
</script>

<style>
.volume{
  height: 10px;
  background: #34D399;
}
</style>
