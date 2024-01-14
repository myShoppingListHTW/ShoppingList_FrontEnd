<!-- EditItemForm.vue -->
<template>
  <div class="edit-popup">
    <div class="edit-form">
      <h3>Edit Item</h3>
      <input type="text" id="itemName" v-model="editedItem.name"
             required placeholder="Item Name" maxlength="20" minlength="2"
             autocomplete="on"
            @input="clearNameError"
      />
      <span ref="nameError" id="nameError" class="error" v-if="nameErrorVisible">
        {{ nameError }}
      </span>
      <select v-model="editedItem.category">
        <option v-for="category in categories" :key="category"
                :value="category">{{ category }}</option>
      </select>
      <div class="button-group">
        <button class="create-item-button" @click="saveEdits">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
const badItemName = "name must be between 2 and 20 characters long";
export default {
  data() {
    return {
      nameError: '',
      nameErrorVisible: false,
    };
  },
  props: {
    editedItem: Object,
    categories: Array
  },
  methods: {
    saveEdits() {
      if (this.editedItem.name.length < 2 || this.editedItem.name.length > 20) {
        this.displayBadItemName();
      } else {
        this.clearNameError();
        this.$emit('save-edits', this.editedItem);
      };
    },
    cancelEdit() {
      this.$emit('cancel-edit');
    },
    displayBadItemName() {
      this.nameError = badItemName;
      this.nameErrorVisible = true;
    },
    clearNameError() {
      this.nameError = '';
      this.nameErrorVisible = false;
    },
  },
};
</script>

<style scoped>
.edit-popup {
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

.edit-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
  border-radius: 5px;
  color: #fff; /* Set text color to white */
}

input, select {
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

.error {
  color: #ff3737;
  font-size: 0.8em;
  position: relative;
}

</style>
