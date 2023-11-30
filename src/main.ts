import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import App from './App.vue'
import { createApp } from 'vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
