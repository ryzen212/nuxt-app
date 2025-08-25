// https://nuxt.com/docs/api/configuration/nuxt-config


import tailwindcss from "@tailwindcss/vite";
import Aura from '@primeuix/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
    modules: [
        '@primevue/nuxt-module',
        '@pinia/nuxt'
    ],
 imports: {
    dirs: [
      'composables',          // default
      'composables/users',    // 👈 add subfolder
    ],
  },
      primevue: {
     importTheme: { from: '@/themes/mytheme.js' },
         options: {
            ripple: true,
            inputVariant: 'filled',
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: 'system',
                    cssLayer: false
                }
            }
        }
    },
  css: ['~/assets/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
    
  devtools: { enabled: true },
  
})
