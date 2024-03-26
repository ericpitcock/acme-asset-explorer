import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import epDialogPlugin from './plugins/epDialogPlugin';

const app = createApp(App)

import Epicenter from '@ericpitcock/epicenter-vue-components/index.js'

app.use(epDialogPlugin)
app.use(Epicenter)
app.use(store)
app.use(router)
app.mount('#app')

import '@ericpitcock/epicenter-styles/dist/epicenter-design-system.css'
// import app variables and overrides
import './assets/app.scss'