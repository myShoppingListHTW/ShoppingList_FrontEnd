<template>
  <div>
    <button class="create-item-button" @click="togglePopup">Create Item</button>
    <div v-if="popupVisible" class="popup">
      <form @submit.prevent="addItem">
        <label for="itemName">Name:</label>
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
import { API_BASE_URL } from '@/config/config';
import { ref } from 'vue';
import axios from 'axios';
import eventBus from "@/eventBus";

const popupVisible = ref(false);
const itemName = ref('');
const selectedCategory = ref('FRUIT');
const categories = ['FRUIT', 'VEGETABLE', 'MEAT', 'FISH', 'DAIRY', 'BAKERY', 'SWEETS', 'DRINKS', 'ALCOHOL', 'OTHER'];

const togglePopup = () => {
  popupVisible.value = !popupVisible.value;
};

const addItem = async () => {
  if (itemName.value.trim() === '') return;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: itemName.value.trim(),
      status: false,
      category: selectedCategory.value,
    }),
  };

  try {
    const response = await axios.post(API_BASE_URL, requestOptions.body, { headers: requestOptions.headers });
    // Direkter Zugriff auf das Ref, wenn verfügbar
    eventBus.emit('item-added', response.data);
    itemName.value = '';
    eventBus.emit('item-added', response.data);
  } catch (error) {
    console.error('Error adding item:', error);
  }

  // Schließe das Popup
  togglePopup();
};
</script>

<style scoped>
.create-item-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  background-color: #28a745;
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
  padding: 20px;
  background-color: #3498db;
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
  padding: 8px;
  border: none;
  border-radius: 3px;
}
</style>
