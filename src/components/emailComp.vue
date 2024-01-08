<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '@okta/okta-vue'
import type { CustomUserClaim } from '@okta/okta-auth-js'
const email = ref('')
const $auth = useAuth()

onMounted(async () => {
  const userClaims = await $auth.getUser()
  email.value = userClaims.email.toString()
})

</script>

<template>
  <div id="profile">
    <h1>My User Profile (ID Token Claims)</h1>
    <p> email</p>
    <p>{{ email }}</p>

  </div>
</template>
