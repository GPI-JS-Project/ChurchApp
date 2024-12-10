export default defineNuxtConfig({
  generate: {
    routes: ['/', '/birthday', '/event'], // List of routes to prerender
    exclude: ['/dynamic-route'] 
  },
 

  modules: [
    // '@vite-pwa/nuxt', // Modul PWA
    'vuetify-nuxt-module',
    '@nuxtjs/device',
    'dayjs-nuxt',
    // '@pinia/nuxt',
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

  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'https://services-jaktim.gpijalansuci.org/api/v1/',
    },
  },

  vite: {
    server: {
      fs: {
        allow: ['C:/NOVAL/GPIJSJAKTIM_IT_MINISTRY/Project/TheChurchUI/ChurchApp/']
      }
    }
  },
 
});
