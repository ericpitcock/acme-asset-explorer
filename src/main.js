import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

import plugin from '@ericpitcock/epicenter-vue-components/index.js'

app.use(plugin)
app.use(store)
app.use(router)
app.mount('#app')

import '@ericpitcock/epicenter-styles/dist/epicenter-design-system.css'