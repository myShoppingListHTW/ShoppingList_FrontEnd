<template>
  <div>
    <DarkModeSwitch @toggleDarkMode="toggleDarkMode"/>
    <div id="nav">
      <RouterLink to="/ShoppingList">List</RouterLink> |
      <RouterLink to="/login" v-if="!authenticated">Login</RouterLink> |
      <RouterLink to="/profile" v-if="authenticated">Profile</RouterLink> |
      <a v-if="authenticated" v-on:click="logout()">Logout</a> |
      <RouterLink to="/ShoppingList" v-if="authenticated">ShoppingList</RouterLink> |
      <RouterLink to="/newList" v-if="authenticated">New List</RouterLink>
    </div>
    <RouterView/>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { watch, onMounted, ref } from 'vue'
import { useAuth } from '@okta/okta-vue'

const $auth = useAuth()
const $route = useRoute()
const authenticated = ref(false)

async function logout() {
  await $auth.signOut()
}

async function isAuthenticated() {
  authenticated.value = await $auth.isAuthenticated()
}

watch(() => $route.path, async () => {
  await isAuthenticated()
})

onMounted(async () => {
  await isAuthenticated()
  $auth.authStateManager.subscribe(isAuthenticated)
})
import DarkModeSwitch from '../src/components/modeSwitcher.vue';

const darkMode = ref(false)

watch(() => darkMode.value, (newDarkMode) => {
  console.log('Dark Mode Toggled:', newDarkMode);

  document.body.classList.toggle('dark-mode', newDarkMode);
});

function toggleDarkMode() {
  darkMode.value = !darkMode.value;
}
</script>

<style>


body {
  font-family: 'Arial', sans-serif;
}

.dark-mode {
  background-color: #2d2d2d;
  color: #ffffff;
}
</style>
