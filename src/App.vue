<template>
  <div>
    <DarkModeSwitch @toggleDarkMode="toggleDarkMode" />
    <Header />
    <RouterView/>
    <ShoppingListView/>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { watch, onMounted, ref } from 'vue'
import { useAuth } from '@okta/okta-vue'
import DarkModeSwitch from '../src/components/modeSwitcher.vue';
import Header from '@/components/Header.vue'

const $auth = useAuth()
const $route = useRoute()
const authenticated = ref(false)
const darkMode = ref(false)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
}

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

watch(() => darkMode.value, (newDarkMode) => {
  console.log('Dark Mode Toggled:', newDarkMode);
  document.body.classList.toggle('dark-mode', newDarkMode);
})
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
