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
import ShoppingList from "../components/ShoppingList.vue";
import addItemButton from "../components/addItemButton.vue";
import { ref } from 'vue';

const shoppingItems = ref([]);

const addItem = (item) => {
  shoppingItems.value.push(item);
};
</script>

<style scoped>
.container {
  max-width: 200px;
  margin: auto;
  padding: 20px;
  display: flex;
  position: fixed;
  top: 10px;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  left: 20px;
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
