<template>
  <section class="home-view">
    <section  v-if="!authenticated" class="shopping-list-section">
      <h1>Welcome to MyHTWShoppingList</h1>
      <p>
        The Shopping List App is a powerful and user-friendly checklist
        application designed to streamline your shopping experience.
      </p>
      <p>
        It simplifies the process of creating, managing, and sharing your
        shopping lists. No more forgetting items or feeling overwhelmed at
        the store – our app has got you covered!
      </p>
      <p>
        Log in now to unlock a personalized shopping journey. Happy shopping!
      </p>
    </section>
    <section  v-if="authenticated" class="shopping-list-section">
      <h2>Welcome back to your Shopping List</h2>
      <p>Explore your personalized shopping lists and make your shopping experience better.</p>
      <p>Enjoy your shopping journey with MyHTWShoppingList!</p>
    </section>
  </section>
</template>

<script>
import shoppingList from '@/components/ShoppingList.vue'
import { RouterLink, useRoute } from 'vue-router'
import { ref, onMounted, watchEffect } from 'vue'
import { useAuth } from '@okta/okta-vue'
import DarkModeSwitch from '@/components/modeSwitcher.vue'

export default {
  components: { RouterLink },
  setup() {
    const $auth = useAuth()
    const authenticated = ref(false)

    async function logout() {
      await $auth.signOut()
    }

    async function isAuthenticated() {
      authenticated.value = await $auth.isAuthenticated()
    }

    onMounted(async () => {
      await isAuthenticated()
      $auth.authStateManager.subscribe(isAuthenticated)
    })

    return { authenticated }
  },
};
</script>

<style scoped>
.content-container {
  text-align: center;
  color: #050202;
}

.content-container h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.content-container p {
  font-size: 1.2em;
  line-height: 1.5;
}

.container-fluid {
  padding: 0;
  height: 40vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: #050202;
}

.home-view {
  color: #181818;
}
</style>
