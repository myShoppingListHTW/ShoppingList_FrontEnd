<!-- addItemButton.vue -->

<template>
  <div>
    <button class="create-item-button" @click="togglePopup">Create Item</button>
    <div v-if="popupVisible" class="popup">
      <form @submit.prevent="addItem">
        <label for="itemName">Item's Name:</label>
        <input type="text" id="itemName" v-model="itemName" required />

        <label for="category">Category:</label>
        <select id="category" v-model="selectedCategory">
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>

        <button type="submit">Add Item</button>
        <button @click="togglePopup">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

import { API_BASE_URL } from '../config/config'
import { ref } from 'vue';
import axios from 'axios';


const emit = defineEmits(['item-added']);

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
  };

  try {
    const response = await axios.post(API_BASE_URL, newItem);
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
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #343a3f;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  color: #fff;
}

input,
select,
button {
  margin-bottom: 16px;
  padding: 12px;
  border: none;
  border-radius: 5px;
}

button {
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
}
</style>


<style scoped>
.create-item-button {
  position: fixed;
  bottom: 20px;
  left: auto;
  padding: 10px;
  background-color: #4caf50; /* Green color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.popup {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #343a3f; /* Blue color */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  color: #fff;
}

input,
select,
button {
  margin-bottom: 16px;
  padding: 12px; /* Increased padding */
  border: none;
  border-radius: 5px;
}

button {
  background-color: #4caf50; /* Green color for buttons */
  color: #fff;
  cursor: pointer;
}
</style>
