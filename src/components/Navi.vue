<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <b class="navbar-brand" >My Shoppinglist</b>
    <div class="collapse navbar-collapse" id="navbarsExample02">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
/* Add your scoped styles here if needed */
</style>
