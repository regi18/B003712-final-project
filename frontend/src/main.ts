import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $refs: {
      [key: string]: HTMLElement|any,
    },
    // ... more stuff
  }
}