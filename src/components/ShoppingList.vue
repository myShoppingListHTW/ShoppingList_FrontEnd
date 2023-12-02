<template>
  <div class="container" style="max-width: 600px">
    <h2 class="text-center mt-3 mb-4">My Shopping List</h2>

    <!-- Input -->
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

    <!-- Task table -->
    <table class="table table-bordered table-striped table-dark">
      <thead>
      <tr>
        <th scope="col">Item</th>
        <th scope="col">Status</th>
        <th scope="col" class="text-center">Actions</th>
        <th scope="col" class="text-center"></th>
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
          <div class="d-flex align-items-center">
            {{ item.status ? 'Not Empty' : 'Empty' }}
          </div>
        </td>
        <td>
          <div class="text-center">
            <button @click="editItem(index)" class="btn btn-primary btn-sm">Edit</button>
          </div>
        </td>
        <td>
          <div class="text-center">
            <button @click="deleteItem(index)" class="btn btn-danger btn-sm">Delete</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'items',
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
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => (this.items = result))
        .catch(error => console.log('error', error));
    },

    submitItem() {
      if (this.newItem.trim() === '') return;

      if (this.editedItem !== null) {
        this.updateItem();
      } else {
        this.addItem();
      }
    },

    addItem() {
      const endpoint = 'http://localhost:8080/api/v1/article';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.newItem.trim(),
          status: false,
        }),
      };

      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => {
          this.items.push(result);
          this.newItem = '';
        })
        .catch(error => console.log('error', error));
    },

    updateItem() {
      const endpoint = `http://localhost:8080/api/v1/article/${this.items[this.editedItem].id}`;
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.newItem.trim(),
          status: this.items[this.editedItem].status,
        }),
      };

      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => {
          this.items.splice(this.editedItem, 1, result);
          this.newItem = '';
          this.editedItem = null;
        })
        .catch(error => console.log('error', error));
    },

    deleteItem(index) {
      const itemId = this.items[index].id;
      const endpoint = `http://localhost:8080/api/v1/article/${itemId}`;
      const requestOptions = {
        method: 'DELETE',
      };

      fetch(endpoint, requestOptions)
        .then(response => {
          if (response.ok) {
            this.items.splice(index, 1);
          } else {
            console.error('Failed to delete item');
          }
        })
        .catch(error => console.log('error', error));
    },

    editItem(index) {
      this.newItem = this.items[index].name;
      this.editedItem = index;
    },


  },}
</script>

<style scoped>
.container {
  max-width: 1300px;
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

/* Add some margin to the checkbox */
input[type="checkbox"] {
  margin-right: 5px;
}

.checked {
  background-color: #add8e6;
  color: #000;
}
</style>
