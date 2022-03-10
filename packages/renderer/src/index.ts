import { createApp } from 'vue'
import App from '/@/App.vue'
import 'virtual:windi.css'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createRouter, createWebHashHistory } from 'vue-router'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// your custom styles here
import './styles/main.css'
import './styles/sw.scss'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

const app = createApp(App)
app.use(router)

app.mount('#app')
