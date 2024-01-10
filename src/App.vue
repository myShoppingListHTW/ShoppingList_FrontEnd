<template>
  <div class="app">
    <div class="app-container">
      <div class="toggle">
    <DarkModeSwitch @toggleDarkMode="toggleDarkMode" />
      </div>
        <div class="App">
            <nav>
                <Header />
            </nav>
            <router-view />
        </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useAuth } from '@okta/okta-vue'
import DarkModeSwitch from '../src/components/modeSwitcher.vue'
import Header from '@/components/Header.vue'
import image from '../src/assets/landingPagePic.jpg'


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
.dark-mode {
  background-color: #2d2d2d;
  color: #fff; /* Adjust text color for better readability in dark mode */
}


.app {
  min-width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 90vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px; /* Adjusted padding for better spacing */
}

.app-container {
  background-color: #f4f4f4; /* Light background color for the container */
  border-radius: 10px; /* Add some rounded corners for a softer look */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Add a subtle box shadow for depth */
  position: absolute; /* Added position relative for better positioning of the toggle */
  min-width: 80%;
  min-height: 80%;
  overflow: hidden; /* Hide the overflow of the container */
  padding: 20px;
}

.toggle {
  position: absolute;
  top: 10px; /* Adjusted top spacing for better positioning */
  right: 10px; /* Adjusted right spacing for better positioning */
}

.content {
  padding: 20px; /* Added padding for better spacing inside the container */
}

.image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
</style>

