<!-- addItemButton.vue -->

<template>
  <div>
    <button class="create-item-button" @click="togglePopup">Create Item</button>
    <div v-if="popupVisible" class="popup">
      <form @submit.prevent="addItem">
        <input type="text" id="itemName" v-model="itemName" required placeholder="Item Name" maxlength="20" minlength="2" autocomplete="on"/>
        <select id="category" v-model="selectedCategory">
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
<div class="button-group">
        <button type="submit">Add Item</button>
        <button @click="togglePopup">Cancel</button>
</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

import { API_BASE_URL } from '../config/config'
import { ref } from 'vue';
import axios from 'axios';

const popupVisible = ref(false);
const itemName = ref('');
const selectedCategory = ref('OTHER');
const categories = ['FRUIT', 'VEGETABLE', 'MEAT', 'FISH', 'DAIRY', 'BAKERY', 'SWEETS', 'DRINKS', 'ALCOHOL', 'OTHER'];

const togglePopup = () => {
  popupVisible.value = !popupVisible.value;
};

const addItem = async () => {
  if (itemName.value.trim() === '') return;

  const newItem = {
    name: itemName.value.trim(),
    empty: true,
    category: selectedCategory.value,
    owner: 'everybody',
  };

  try {
    const response = await axios.post(API_BASE_URL, newItem);
    //items.value.push(response.data);
    itemName.value = ''; // Resetting the itemName after adding
    selectedCategory.value = ''; // Resetting the category if needed
    togglePopup(); // Close the popup after adding
  } catch (error) {
    console.error('Error adding item:', error);
  }
};
</script>


<style scoped>

.create-item-button {
  position: fixed;
  bottom: 20px;
  left: auto;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #343a3f;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1001;
  padding: 20px;
  width: 300px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
  border-radius: 5px;
  color: #fff;
}

label {
  margin-bottom: 8px;
  color: #fff;
}

input,
select{
  margin-bottom: 16px;
  padding: 12px;
  border: none;
  border-radius: 5px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  flex: 1;
  margin: 0 5px;
}


</style>
