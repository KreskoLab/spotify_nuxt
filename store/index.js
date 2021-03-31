  export const state = () => ({
    albums: [],
    artists: [],
    playlists: []
  })
  
  export const mutations = {
    updateAlbums(state, items){
      state.albums = items
    },
    updateArtists(state, items){
      state.artists = items
    },
    updatePlaylists(state, items){
      state.playlists = items
    }
  }

  export const actions = {
    fetchAlbums({ commit }){
      this.$axios.$get(`https://api.spotify.com/v1/me/albums`)
      .then((res) => {
        commit('updateAlbums', res.items)
      })
    },
    fetchArtists({ commit }){
      this.$axios.$get(`https://api.spotify.com/v1/me/following?type=artist`)
      .then((res) => {
        commit('updateArtists', res.artists.items)
      })
    },
    fetchPlaylists({ commit }){
      this.$axios.$get(`https://api.spotify.com/v1/users/${this.$auth.user.id}/playlists`)
      .then((res) => {
        commit('updatePlaylists', res.items)
      })
    },
  }

  export const getters = {

    getAlbums(state){
      return state.albums
    },
    getArtists(state){
      return state.artists
    },
    getPlaylists(state){
      return state.playlists
    }
    
  }