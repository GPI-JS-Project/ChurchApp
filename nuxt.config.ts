export default defineNuxtConfig({
  generate: {
    routes: ['/', '/birthday', '/event'], // List of routes to prerender
   },
  app: {
    head: {
      title: "HIKANOS - gpijsjaktim",
      link: [
        { rel: 'icon', type: 'image/png', href: '/icons/icon512_rounded.png' },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: 'width=device-width, initial-scale=1' },
        { hid: "description", name: "description", content: "gpijsjaktim" }
      ]
    }
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

  // Konfigurasi PWA
 pwa: {
    registerType: 'autoUpdate', // Mengatur tipe pendaftaran
    manifest: {
      name: 'GPI JS Jamtim',
      short_name: 'GPIJSJAKTIMM',
      description: 'GPi Jalan Suci Jaktim',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/icons/icon512_rounded.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.destination === 'image',
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 1 minggu
            },
          },
        },
      ],
    },
  },
});
