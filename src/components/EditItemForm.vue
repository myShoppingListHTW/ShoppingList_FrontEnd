<!-- EditItemForm.vue -->
<template>
  <div class="edit-popup">
    <div class="edit-form">
      <h3>Edit Item</h3>
      <input v-model="editedItem.name" placeholder="Item Name" />

      <select v-model="editedItem.category">
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>

      <button @click="saveEdits">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editedItem: Object,// Pass the categories as a prop
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent backdrop */
  z-index: 1000; /* Ensure it's above other content */
}

.edit-form {
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f8f9fa;
  border-radius: 5px;
  z-index: 1001; /* Above the backdrop */
}
</style>
