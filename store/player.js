  export const state = () => ({
    show: false,
    checked: false,
    track: {}
  })
  
  export const mutations = {
    updateTrack(state, val){
      state.track = {
        id: val.track_window.current_track.id,
        name: val.track_window.current_track.name,
        artist: val.track_window.current_track.artists[0].name,
        album: val.track_window.current_track.album.name,
        img: val.track_window.current_track.album.images[0].url,
        duration: val.duration,
        progress: val.position,
        paused: val.paused
      }
    },
    updateProgress(state, val){
      state.track.progress = val
    },
    updateShow(state, val){
      state.show = val
    },
    updateChecked(state, val){
      state.checked = val
    }
  }

  export const actions = {
    async check({ commit, state }, track_id){
      await this.$axios.$get(`https://api.spotify.com/v1/me/tracks/contains?ids=${track_id}`)
      .then((res) => {
        commit('updateChecked', res[0])
      })
    }
  }