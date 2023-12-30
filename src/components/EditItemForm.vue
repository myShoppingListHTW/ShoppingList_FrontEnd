<!-- EditItemForm.vue -->

<template>
  <div class="edit-form">
    <h3>Edit Item</h3>
    <input v-model="editedItem.name" placeholder="Item Name" />
    <input v-model="editedItem.category" placeholder="Category" />
    <button @click="saveEdits">Save</button>
    <button @click="cancelEdit">Cancel</button>
  </div>
</template>

<script>
export default {
  props: {
    editedItem: Object, // Pass the editedItem as a prop
  },
  methods: {
    saveEdits() {
      // Emit an event to notify the parent component about the save action
      this.$emit('save-edits');
    },
    cancelEdit() {
      // Emit an event to notify the parent component about the cancel action
      this.$emit('cancel-edit');
    },
  },
};
</script>

<style scoped>
/* Add your styling for the edit form here */
.edit-form {
  padding: 20px;
  border: 1px solid #ddd;
  margin-top: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
}
</style>
