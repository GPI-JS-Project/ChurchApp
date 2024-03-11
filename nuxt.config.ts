// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      title:"HIKANOS - gpijsjaktim",
      meta:[
        { charset:"utf-8"},
        { name:"viewport", content:'width=device-width, initial-scal=1'},
        { hid:"description",name:"description", content:"gpijsjaktim"}
      ]
    }
  },
  modules: [
    'vuetify-nuxt-module',
    '@nuxtjs/device',
    'dayjs-nuxt',
    '@vite-pwa/nuxt'
  ],
  plugins: [
    './plugins/device.js'
  ],
  dayjs: {
    locales: ['id'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'id',
    defaultTimezone: 'Asia/Jakarta',
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  },
  devtools: { enabled: true }, 
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'https://services-jaktim.gpijalansuci.org/api/v1/',
    },
  },
  pwa: {
    devOptions: {
      enabled:true,
      type:"module"
    },
    
    workbox: {
      navigateFallback:"/"
    },
    manifest: {
      name: 'gpijsjaktim',
      short_name: 'gpijsjaktim',
      description: "GPI 'Jalan Suci' Jaktim",
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: 'icons/icon512_rounded.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/icon512_rounded.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: '[name].[hash].[ext]'
        }
      }
    }
  },
});
