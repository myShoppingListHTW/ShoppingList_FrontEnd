<template>

  <div :style="image" class="image">
  <div class="app">
    <div class="app-container">

        <div class="App">
            <nav>
                <Header />
            </nav>
            <router-view />
        </div>
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


body {
  background-size: cover;
  background-position: center;
  font-family: sans-serif;
  background-image: url("@/assets/backgroundPic.jpg");
  background-repeat: no-repeat;}

.app {
  min-width: fit-content;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.app-container {
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(0, 0, 0, 5);
  position: fixed;
  min-width: 80%;
  min-height: 80%;
  overflow: hidden;
  padding: 20px;
}

.toggle {
  position: absolute;
  top: 10px;
  right: 10px;
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

