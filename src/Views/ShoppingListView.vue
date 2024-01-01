<!-- ShoppingListView.vue -->

<template>
  <div>
    <h1 class="text-center mt-3 mb-4">My Shopping List</h1>
    <div class="shopping-list-container">
      <ShoppingList :items="shoppingItems" />
    </div>
    <addItemButton @addItem="addItem" />

  </div>
</template>

<script setup lang="ts">
import ShoppingList from "../Components/ShoppingList.vue";
import addItemButton from "../components/addItemButton.vue";
import { ref } from 'vue';

const shoppingItems = ref([]);

const addItem = (item) => {
  shoppingItems.value.push(item);
};
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
