//main.ts
import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import mitt from 'mitt';
import App from './App.vue';
import { createApp } from 'vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';


const emitter = mitt();
const app = createApp(App);

// Use the Mitt emitter as a global property
app.config.globalProperties.emitter = emitter;

app.use(router);
library.add(faCopy);
library.add(faUserSecret);
app.component('font-awesome-icon', FontAwesomeIcon);


app.mount('#app');
