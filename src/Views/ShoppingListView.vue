<template>
  <div class="container">
    <ShoppingList :items="shoppingItems" />
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


