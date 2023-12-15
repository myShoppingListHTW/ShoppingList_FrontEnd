<template>
  <div>
    <!-- Display ShoppingList component -->
    <ShoppingList :items="shoppingItems" />

    <!-- Display addItemButton component -->
    <addItemButton @addItem="addItem" />
  </div>
</template>

<script setup lang="ts">
import ShoppingList from "../components/ShoppingList.vue";
import addItemButton from "../components/addItemButton.vue";
import { ref } from 'vue';

// Define the props for ShoppingList component
const shoppingItems = ref([]);

// Function to add an item to the shopping list
const addItem = (item) => {
  shoppingItems.value.push(item);
};
</script>
