<!-- AdditemButton.vue -->
<template>
  <div class="edit-popup">
    <div class="edit-form">
      <h3>Add Item</h3>
      <div>
        <label for="name">Name:</label>
        <input
          id="name"
          v-model="name"
          class="invalid"
          @input="validateName"
        />
        <span ref="nameError" id="nameError" class="error">
      Invalid input
    </span>
      </div>



      <select v-model="newItem.category">
        <option v-for="category in categories" :key="category"
                :value="category">{{ category }}</option>
      </select>
      <div class="button-group">
        <button class="create-item-button" @click="saveNewItem">Save</button>
        <button @click="cancelAddingItem">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    data() {
      return {
        name: "",
        isValid: true,
      };
    },

    props: {
    newItem: Object,
    categories: Array
  },
  methods: {
    saveNewItem() {
      this.$emit('save-item', this.newItem);
    },
    cancelAddingItem() {
      this.$emit('cancel-adding-item');
    },
    validateName() {
      // Your validation logic
      if (this.name.length < 3) {
        this.isValid = false;
        this.$refs.nameError.classList.add("visible");
      } else {
        this.isValid = true;
        this.$refs.nameError.classList.remove("visible");
      }
    },
  },
};


</script>

<style scoped>
#error {
  display: none;
  font-size: 0.8em;
}

#error.visible {
  display: block;
}

input.invalid {
  border-color: red;
}
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
#nameError {
  display: none;
  font-size: 0.8em;
}

#nameError.visible {
  display: block;
}

input.invalid {
  border-color: red;
}
</style>
