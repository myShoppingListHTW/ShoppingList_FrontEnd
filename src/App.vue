<template>
  <div class="App">
    <nav>
      <Header />
    </nav>
    <router-view />
    <footer>
      <DarkModeSwitch @toggleDarkMode="toggleDarkMode" />
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useAuth } from '@okta/okta-vue'
import DarkModeSwitch from '../src/components/modeSwitcher.vue'
import Header from '@/components/Header.vue'

const $auth = useAuth()
const authenticated = ref(false)
const darkMode = ref(false)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}

async function logout() {
  await $auth.signOut()
}

async function isAuthenticated() {
  authenticated.value = await $auth.isAuthenticated()
}

watchEffect(() => {
  document.body.classList.toggle('dark-mode', darkMode.value)
})

onMounted(async () => {
  await isAuthenticated()
  $auth.authStateManager.subscribe(isAuthenticated)
})

watchEffect(() => {
  console.log('Dark Mode Toggled:', darkMode.value)
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
