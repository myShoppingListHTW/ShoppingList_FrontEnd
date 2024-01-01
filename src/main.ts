//main.ts
import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import mitt from 'mitt';
import App from './App.vue';
import { createApp } from 'vue';
import router from './router';

const emitter = mitt();
const app = createApp(App);

// Use the Mitt emitter as a global property
app.config.globalProperties.emitter = emitter;

app.use(router);

app.mount('#app');
