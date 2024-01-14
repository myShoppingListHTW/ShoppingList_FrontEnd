// main.ts
import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import App from './App.vue';
import { createApp } from 'vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaVue from '@okta/okta-vue';
import OktaSignIn from '@okta/okta-signin-widget';
import mitt from 'mitt';

// Okta configuration
const oktaSignIn = new OktaSignIn({
  baseUrl: 'https://dev-70865751.okta.com',
  clientId: '0oaebpzxgt9rJG1bn5d7',
    redirectUri: 'https://myshoppinglistfrontend-f9889051a5f1.herokuapp.com/login/callback',
   // redirectUri: 'http://localhost:3000/login/callback',
  authParams: {
    pkce: true,
    issuer: 'https://dev-70865751.okta.com/oauth2/default',
    display: 'page',
    scopes: ['openid', 'profile', 'email'],
  },
  useClassicEngine: true,
});


const oktaAuth = new OktaAuth({
  issuer: 'https://dev-70865751.okta.com/oauth2/default',
  clientId: '0oaebpzxgt9rJG1bn5d7',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
});

const emitter = mitt();

const app = createApp(App);

app.use(OktaVue, {
  oktaAuth,
  onAuthRequired: () => {
    router.push('/login');
  },
  onAuthResume: () => {
    router.push('/login');
  },
});

app.use(router);
library.add(faCopy);
library.add(faUserSecret);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');

export { oktaAuth, oktaSignIn };
