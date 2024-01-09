<!-- ShoppingListView.vue -->

<template>

    <div class="header">
      <Header />

  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import Cards from '@/components/Cards.vue'
import ShoppingList from '@/components/ShoppingList.vue'
import Header from '@/components/Header.vue'

const shoppingItems = ref([]);


</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #f0f0f0; /* Set your desired light background color */
  color: #333; /* Set your desired dark text color for light mode */
}

.dark-mode .container {
  background-color: #2d2d2d; /* Set your desired dark background color */
  color: #ffffff; /* Set your desired light text color for dark mode */
}
.shopping-list-container {
  max-height: 500px; /* Adjust the maximum height as needed */
  overflow: auto;
  border: 1px ;
  /* Border style for the table container */
}

@media screen and (max-width: 600px) {
  .container {
    max-width: 90%;
  }
}
</style>
