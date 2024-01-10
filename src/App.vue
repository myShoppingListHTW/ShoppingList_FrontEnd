<template>
    <div class="app-container">
        <div class="App">
            <nav>
                <Header />
            </nav>
            <router-view />
            <footer>
                <DarkModeSwitch @toggleDarkMode="toggleDarkMode" />
            </footer>
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
  color: #ffffff;
}


body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
    max-height: 100vh;
    /* Full viewport height to ensure the container can be centered vertically */
    background-color: #f0f0f0; /* Optional: background color for the body */
    width: 100vw;
    font-family: 'Arial', sans-serif
}

.app-container {
    width: 50%; /* Set width to 50% of the viewport */
    min-width: 600px; /* Maximum width to maintain a reasonable size */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Adds shadow for better focus */
    padding: 20px; /* Padding inside the container */
    background-color: #ffffff; /* Background color for the container */
    justify-content: center;
    align-items: center;
    min-height: 20vh;
}

.App {
    flex-direction: column;

    /* Your existing .App styles */
}

.dark-mode {
    background-color: #2d2d2d;
    color: #ffffff;
}
.image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;

}

</style>

