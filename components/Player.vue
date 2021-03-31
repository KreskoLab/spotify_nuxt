<template>
  <div class="flex flex-row flex-wrap  items-center text-coolGray-100 bg-emerald-400 px-8 py-4 space-x-3">

    <div class="flex items-center" v-if="track">
      <img class="h-20 w-20 rounded-full border-4 border-green-100" :src="track.img" />
      <div class="ml-4 w-40">
        <p class="text-xl font-medium truncate">{{track.name}}</p>
        <p class="truncate font-medium hover:text-green-500">{{track.artist}}</p>
      </div>
    </div>

    <div class="flex justify-center items-center space-x-4 w-1/5">

      <button @click="previousTrack()" class="inline-flex items-center justify-center focus:outline-none w-6 h-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M22 24l-18-12 18-12v24zm-19-24v24h-1v-24h1zm2.803 12l15.197 10.132v-20.263l-15.197 10.131z"/>
        </svg>
      </button>

      <button @click="controll()" class="inline-flex items-center justify-center focus:outline-none w-14 h-14">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path v-if="track.paused" d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
          <path v-else d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
        </svg>
      </button>

      <button @click="nextTrack()" class="inline-flex items-center justify-center rounded-full focus:outline-none w-6 h-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M2 24l18-12-18-12v24zm19-24v24h1v-24h-1zm-2.803 12l-15.197 10.132v-20.263l15.197 10.131z"/>
        </svg>
      </button>

    </div>

    <div class="w-2/5 flex flex-row items-center space-x-2">
      <span>{{progress}}</span>
      <div class="bg-warmGray-300 rounded-full w-full h-2 overflow-hidden">
        <div class="bg-coolGray-100 h-2" role="progressbar" :style="{ width: progress_bar }"></div>
      </div>
      <span>{{duration}}</span>

    </div>

    <div @click="shuffle()" class="flex justify-center items-center space-x-6 w-1/6">
      <button class="inline-flex items-center justify-center rounded-full focus:outline-none w-6 h-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M2 7h-2v-2h2c3.49 0 5.48 1.221 6.822 2.854-.41.654-.754 1.312-1.055 1.939-1.087-1.643-2.633-2.793-5.767-2.793zm16 10c-3.084 0-4.604-1.147-5.679-2.786-.302.627-.647 1.284-1.06 1.937 1.327 1.629 3.291 2.849 6.739 2.849v3l6-4-6-4v3zm0-10v3l6-4-6-4v3c-5.834 0-7.436 3.482-8.85 6.556-1.343 2.921-2.504 5.444-7.15 5.444h-2v2h2c5.928 0 7.543-3.511 8.968-6.609 1.331-2.893 2.479-5.391 7.032-5.391z"/>
        </svg>
      </button>
      <button @click="replay()" class="inline-flex items-center justify-center rounded-full focus:outline-none w-6 h-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z"/>
        </svg>
      </button>
      <button @click="like()" class="inline-flex items-center justify-center rounded-full focus:outline-none w-8 h-8">
        <svg xmlns="http://www.w3.org/2000/svg" :fill="checked ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
    

  </div>
</template>

<script>

export default {
  mounted(){
    
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
  head(){
    return{
      script: [
        {
          src: "https://sdk.scdn.co/spotify-player.js",
        }
      ],
    }
  },
  methods:{
    controll(){
      if(this.track.paused){
        this.player.resume().then(() => {
          console.log('Resumed!');
        })
      }
      else{
        this.player.pause().then(() => {
          console.log('Paused!');
        })
      }
    },
    transfer(id){
      this.$axios.$put(`https://api.spotify.com/v1/me/player`,
        {
          device_ids: [id]
        }
      )
    },
    nextTrack(){
      this.player.nextTrack().then(() => {
        console.log('Skipped to next track!');
      });
    },
    previousTrack(){
      this.player.previousTrack().then(() => {
        console.log('Set to previous track!');
      });
    },
    replay(){
      this.player.pause()
      this.$axios.$put(`https://api.spotify.com/v1/me/player/seek?position_ms=0&device_id=${this.id}`)
      .then((res) => {
        this.player.resume()
      })
    },
    shuffle(){
      this.$axios.$put(`https://api.spotify.com/v1/me/player/shuffle?state=true&device_id=${this.id}`)
    },
    like(){
      if(!this.checked){
        this.$axios.$put(`https://api.spotify.com/v1/me/tracks?ids=${this.track.id}`)
        .then((res) => {
          this.$store.commit('player/updateChecked', true)
          console.log(res);
        })
      }
      else{
        this.$axios.$delete(`https://api.spotify.com/v1/me/tracks?ids=${this.track.id}`)
        .then((res) => {
          this.$store.commit('player/updateChecked', false)
          console.log(res);
        })
      }
    },
    updateProgress(){
      if(!this.track.paused){
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
    'track.paused': function (){
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
    progress_bar(){
      return (100 * this.track.progress) / this.track.duration + '%'
    }
  },
  data(){
    return{
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
