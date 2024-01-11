<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '@okta/okta-vue'
import type { CustomUserClaim } from '@okta/okta-auth-js'
import { reference } from '@popperjs/core'
const $auth = useAuth()
const claims = ref<{claim: string, value: CustomUserClaim |  CustomUserClaim[]}[]>([{
  claim: 'Loading...',
  value: ''
}])
const email = ref('User Email')
const userName = ref('User Name')
const familyName = ref('User Family Name')
const emailVerified = ref('User Email Verified')


onMounted(async () => {
  const userClaims = await $auth.getUser()
  email.value = userClaims.email.toString()
  userName.value = userClaims.given_name.toString()
  familyName.value = userClaims.family_name.toString()
  emailVerified.value = userClaims.email_verified.toString()

})



</script>

<template>
  <div id="profile">
    <h1>My User Profile (ID Token Claims)</h1>
    <p>
      Below is the information from your ID token.
    </p>
    <table>
      <thead>
      <tr>
        <th>Claim</th>
        <th>Value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td> First Name</td>
        <td> {{userName}}</td>
      </tr>
            <tr>
        <td> family Name</td>
        <td> {{familyName}}</td>
            </tr>
            <tr>
        <td> email</td>
        <td> {{email}}</td>
            </tr>
            <tr>
        <td> email Verified</td>
        <td> {{emailVerified}}</td>
            </tr>
      </tbody>
      <tbody>
    <tr>
      <td> {{userName}}</td>
    </tr>
      </tbody>
    </table>
  </div>

</template>

<style scoped>

</style>
