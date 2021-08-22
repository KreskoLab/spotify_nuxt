export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Spotify Nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  tailwindcss: {
    jit: true
  },

  auth: {
    redirect: {
      login: '/',
      //logout: '/',
      home: '/browse',
      callback: '/callback'
    },
    strategies: {
      spotify: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://accounts.spotify.com/authorize',
          token: 'https://accounts.spotify.com/api/token',
          userInfo: 'https://api.spotify.com/v1/me',
          // logout: 'https://example.com/logout'
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 3600
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        responseType: 'code',
        grantType: 'authorization_code',
        accessType: 'offline',
        redirectUri: 'https://spotify-nuxt.vercel.app/callback',
        clientId: '9e5240aae3b8460e8517656c6eb5800a',
        codeChallengeMethod: 'S256',
        scope: ['user-library-modify','user-modify-playback-state','user-read-playback-state','streaming','user-read-email','user-read-private','playlist-read-private','playlist-read-collaborative','user-follow-read','user-library-read']
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  server: {
    host: '0.0.0.0'
  }
}
