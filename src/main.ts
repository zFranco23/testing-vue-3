// main.ts
import { createApp } from 'vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'

// Crea un QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,           // Número de reintentos si falla
      refetchOnWindowFocus: false, // No vuelva a pedir datos al cambiar de pestaña
    },
  },
})

const pinia = createPinia()
const app = createApp(App)

app
  .use(VueQueryPlugin, { queryClient })
  .use(router)
  .use(pinia)

app.mount('#app')
