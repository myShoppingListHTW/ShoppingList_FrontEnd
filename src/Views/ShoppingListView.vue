<!-- ShoppingListView.vue -->

<template>

    <div class="shopping-list-container">

        <ShoppingList :items="shoppingItems" />
  </div>

</template>

<script setup lang="ts">

import ShoppingList from "../components/ShoppingList.vue";
import { ref } from 'vue';
interface ShoppingItem {

  name: string;
  status: boolean;
  category: string;
  id: number
}
const shoppingItems = ref<ShoppingItem[]>([]);
const addItem = (item: ShoppingItem) => {
  shoppingItems.value.push(item);
};


</script>

<style scoped>



.shopping-list-container {
  max-width: 800px; /* Maximum width of the shopping list */
  margin: auto; /* Centers the content horizontally */
  overflow: auto; /* Keeps the content scrollable */

}
@media screen and (max-width: 600px) {
    .shopping-list-container {
        max-width: 90%; /* Adjust width for smaller screens */
    }
}


</style>
