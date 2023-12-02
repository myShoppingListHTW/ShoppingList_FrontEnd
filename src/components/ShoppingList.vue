<template>
  <div class="container">
    <h2 class="text-center mt-3 mb-4">My Shopping List</h2>

    <div class="d-flex justify-content-center align-items-center mb-3">
      <input
        type="text"
        class="form-control"
        v-model="newItem"
        placeholder="Add new item"
        @keyup.enter="submitItem"
      />
      <button @click="submitItem" class="btn btn-success rounded-0 ml-2">Add</button>
    </div>

    <table class="table table-bordered table-striped table-dark">
      <thead>
      <tr>
        <th scope="col">Item</th>
        <th scope="col">Status</th>
        <th scope="col" class="text-center">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>
          <div class="d-flex align-items-center">
            <input
              type="checkbox"
              :checked="item.status"
              @change="toggleStatus(index)"
              class="mr-2"
            />
            <span :class="{ 'line-through': item.status }">{{ item.name }}</span>
          </div>
        </td>
        <td>
          <div>{{ item.status ? 'Not Empty' : 'Empty' }}</div>
        </td>
        <td class="text-center">
          <button @click="editItem(index)" class="btn btn-primary btn-sm">Edit</button>
          <button @click="deleteItem(index)" class="btn btn-danger btn-sm ml-2">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: '',
      items: [],
      editedItem: null,
    };
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      const endpoint = 'http://localhost:8080/api/v1/article';
      fetch(endpoint)
        .then(response => response.json())
        .then(result => (this.items = result))
        .catch(error => console.error('Error fetching items:', error));
    },
    submitItem() {
      if (this.newItem.trim() === '') return;
      this.editedItem !== null ? this.updateItem() : this.addItem();
    },
    addItem() {
      const endpoint = 'http://localhost:8080/api/v1/article';
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.newItem.trim(), status: false }),
      };
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => {
          this.items.push(result);
          this.newItem = '';
        })
        .catch(error => console.error('Error adding item:', error));
    },
    updateItem() {
      const itemId = this.items[this.editedItem].id;
      const endpoint = `http://localhost:8080/api/v1/article/${itemId}`;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.newItem.trim(), status: this.items[this.editedItem].status }),
      };
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => {
          this.items.splice(this.editedItem, 1, result);
          this.newItem = '';
          this.editedItem = null;
        })
        .catch(error => console.error('Error updating item:', error));
    },
    deleteItem(index) {
      const itemId = this.items[index].id;
      const endpoint = `http://localhost:8080/api/v1/article/${itemId}`;
      const requestOptions = { method: 'DELETE' };
      fetch(endpoint, requestOptions)
        .then(response => response.ok ? this.items.splice(index, 1) : console.error('Failed to delete item'))
        .catch(error => console.error('Error deleting item:', error));
    },
    editItem(index) {
      this.newItem = this.items[index].name;
      this.editedItem = index;
    },


  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  overflow: auto;
  margin: auto;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.btn-sm {
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
}
.line-through {
  text-decoration: line-through;
}
</style>
