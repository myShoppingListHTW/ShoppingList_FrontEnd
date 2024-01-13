<template>

  <div :style="image" class="image">
  <div class="app">
    <div class="app-container">
      <DarkModeSwitch @toggleDarkMode="toggleDarkMode" />

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
  console.log('Dark Mode Toggled:', darkMode.value)

})

onMounted(async () => {
  await isAuthenticated()
  $auth.authStateManager.subscribe(isAuthenticated)
})


</script>


<style>


body {
  background-size: cover;
  background-position: center;
  font-family: sans-serif;
  background-image: url("@/assets/backgroundPic.jpg");
  background-repeat: no-repeat;

}



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
  border-radius: 20px;
  box-shadow: 0 0 10px rgb(0, 0, 0, 5);
  position: fixed;
  min-width: 60%;
  height: fit-content ;
  overflow: hidden;
  padding: 20px;
}



.image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.dark-mode {
  background-color: #2d2d2d;


  .app-container {
    background-color: #2d2d2d;
    color: #ffffff;
  }

}

</style>

