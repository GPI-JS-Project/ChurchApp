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
    'vuetify-nuxt-module'
  ],
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
      baseURL: process.env.BASE_URL || 'https://services-jaktim.gpijalansuci.org/',
    },
  },
});
