export default defineNuxtConfig({
  app:{
    head:{
      title:"HIKANOS - gpijsjaktim",
      link: [
        { rel: 'icon', type: 'image/png', href: '/icons/icon512_rounded.png' },
      ],
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
    'dayjs-nuxt'
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
  }
});
