<template>
  <div>
    <button class="create-item-button" @click="togglePopup">Create Item</button>
    <div v-if="popupVisible" class="popup">
      <form @submit.prevent="addItem">
        <label for="itemName">Item's Name:</label>
        <div class="input-container">
          <input type="text" id="itemName" v-model="itemName" maxlength="20" required/>
          <div v-if="!isNameValid" class="error-cloud" @click="closeErrorMessage">
            <p class="error-message">{{ errorMessage }}</p>
          </div>
        </div>
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
import { ref, onMounted } from 'vue';
import { API_BASE_URL } from '@/config/config.ts';
import axios from 'axios';

const popupVisible = ref(false);
const itemName = ref('');
const selectedCategory = ref('OTHER');
const categories = ['FRUIT', 'VEGETABLE', 'MEAT', 'FISH', 'DAIRY', 'BAKERY', 'SWEETS', 'DRINKS', 'ALCOHOL', 'OTHER'];
const isNameValid = ref(true);
const errorMessage = ref('');

const togglePopup = () => {
  popupVisible.value = !popupVisible.value;
  isNameValid.value = true; // Reset validation status when toggling popup
};

const validateInput = () => {
  // Validate input name
  const nameRegex = /^[a-zA-Z].{1,19}$/;
  isNameValid.value = nameRegex.test(itemName.value);
};

const addItem = async () => {
  validateInput();

  if (itemName.value.trim() === '') {
    errorMessage.value = 'Please enter a valid item name.';
    return;
  }

  if (!isNameValid.value) {
    errorMessage.value = 'Name must start with a letter and can contain up to 20 Chars!';
    return;
  }
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
    itemName.value = '';
  } catch (error) {
    console.error('Error adding item:', error);
  }
  togglePopup();
};

const closeErrorMessage = () => {
  errorMessage.value = '';
  isNameValid.value = true;
};

onMounted(() => {
  document.body.addEventListener('click', closeErrorMessage);
});
</script>

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

.input-container {
  position: relative;
}

.error-cloud {
  position: absolute;
  top: -55px; /* Adjust as needed */
  left: 0;
  background-color: #fff;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.error-message {
  margin: 0;
  color: #ff3333;
  font-size: 12px; /* Adjust the font size as needed */
}

</style>
