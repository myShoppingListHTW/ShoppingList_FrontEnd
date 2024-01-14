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
    <h2>My User Profile</h2>
    <p>
      Below is the information of your user profile.
    </p>
    <table class="content-table">
      <thead>
      <tr>
        <th>Claim</th>
        <th>Value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>First Name:</td>
        <td> {{userName}}</td>
      </tr>
            <tr>
        <td>family Name:</td>
        <td> {{familyName}}</td>
            </tr>
            <tr>
        <td>email:</td>
        <td>{{email}}</td>
            </tr>
            <tr>
        <td>email Verified</td>
        <td>{{emailVerified}}</td>
            </tr>
      </tbody>
    </table>
  </div>

</template>

<style scoped>
.content-table  {

  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  min-width: 100%;
  min-height: 10%;
}

.content-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
}

.content-table th,
.content-table td {
  padding: 12px 15px;
}

.content-table tbody tr {
  border-bottom: 1px solid #dddddd;
  background-color: #ffffff;
  color: #000000;
  text-align: center;
}

.content-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.content-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.content-table tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}
.content-table tr td:nth-child(1) {
  text-align: left;
}

</style>

