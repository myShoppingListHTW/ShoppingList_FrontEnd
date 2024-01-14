

<template>
  <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <div class="col-md-3 mb-2 mb-md-0">
      <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
        <img src="@/assets/groceries.png" alt="Groceries" width="50" height="50" aria-label="Groceries">
        <use xlink:href="#groceries"></use>
      </a>
    </div>
    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li v-if="authenticated">
        <router-link to="/ShoppingList" class="nav-link px-2 link-primary">My List</router-link>
      </li>
      <h4 v-if="!authenticated" class="col-lg-10 fst-4">Welcome to My HTW Shopping</h4>
      <li v-if="authenticated">
        <router-link to="/profile" class="nav-link px-2 link-primary">Profile</router-link>
      </li>
    </ul>
    <div class="col-md-3 text-end">
      <button type="button" class="btn btn-outline-primary me-2" to="/login" v-if="!authenticated && $route.path !== '/login'">
        <router-link to="/login" class="nav-link px-2 text-blue">Login</router-link>
      </button>

      <button type="button" class="btn btn-primary me-2" v-if="authenticated">
        <a v-on:click="logout()">Logout</a>
      </button>
    </div>
  </header>
</template>



<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { watch, onMounted, ref } from 'vue'
import { useAuth } from '@okta/okta-vue'
import DarkModeSwitch from '@/components/modeSwitcher.vue'

const $auth = useAuth()
const $route = useRoute()
const authenticated = ref(false)
const darkMode = ref(false)

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


<style scoped>


</style>
