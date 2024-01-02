<!-- EditItemForm.vue -->
<template>
  <div class="edit-popup">
    <div class="edit-form">
      <h3>Edit Item</h3>
      <input v-model="editedItem.name" placeholder="Item Name" />

      <select v-model="editedItem.category">
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
      <div class="button-group">
      <button @click="saveEdits">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    editedItem: Object,
    categories: Array
  },
  methods: {
    saveEdits() {
      this.$emit('save-edits', this.editedItem);
    },
    cancelEdit() {
      this.$emit('cancel-edit');
    },
  },
};
</script>

<style scoped>
.edit-popup {
  position: fixed;
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%);
  background-color: #343a3f; /* Dark background */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1001; /* Above other content */
  padding: 20px;
  width: 300px; /* Fixed width, adjust as needed */
}

.edit-form {
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  align-items: stretch; /* Stretch elements to fill width */
  padding: 20px;
  background-color: #f8f9fa; /* Light background for the form */
  border-radius: 5px;
  border: 1px solid #ddd;
}

input, select {
  margin-bottom: 16px;
  padding: 12px;
  border: none;
  border-radius: 5px;
}

.button-group {
  display: flex;
  justify-content: space-between; /* Space out buttons */
}

button {
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
  padding: 10px 20px; /* Adjust padding for buttons */
  border: none;
  border-radius: 5px;
  flex: 1; /* Make buttons take equal width */
  margin: 0 5px; /* Space between buttons */
}
</style>

