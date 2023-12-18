<template>
  <div class="container">
    <h2 class="text-center mt-3 mb-4">My Shopping List</h2>
    <div>
      <table class="table table-responsive table-borderless table-hover table-responsive-lg">
        <thead>
        <tr>
          <th scope="col" class="checkbox-col"></th>
          <th scope="col">Item</th>
          <th scope="col">Status</th>
          <th scope="col">Category</th>
          <th scope="col" class="text-center">Actions</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(item, index) in items" :key="index" :class="{ 'table-success': !item.empty }">
          <td class="checkbox-col">
            <div class="form-check">
              <input
                type="checkbox"
                :checked="item.empty === false"
                @change="updateStatus(index)"
                class="form-check-input"
              />
            </div>
          </td>
          <td>
            <span :class="{ 'line-through': item.empty === false }">{{ item.name }}</span>
          </td>
          <td>
            <div :class="{ 'text-success': item.empty === false, 'text-danger': item.empty }">
              {{ item.empty ? 'Empty' : 'Filled' }}</div>
          </td>
          <td>
            <div>{{ item.category || 'NO CAT*' }}</div>
          </td>
          <td class="text-center">
            <button @click="editItem(index)" class="btn btn-primary btn-sm">
              ✎
            </button>
            <button @click="deleteItem(index)" class="btn btn-danger btn-sm ml-2">
              ✖
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>

import axios from 'axios'; // Import Axios for HTTP requests
import { API_BASE_URL } from '@/config/config';
  export default {
    props: {
      editItem: Function,
      deleteItem: Function,
      updateStatus: Function,
    },
  data() {
    return {
      items: [],
      editedItem: null
    };
  },
  mounted() {
    this.fetchItems();
  }
,
  methods: {
    async sortItems(){
    try {
      let sortedItems1 = this.items.sort((a, b) => {
        // Sort by status (empty goes up, filled down)
        if (a.empty && !b.empty) return -1;
        if (!a.empty && b.empty) return 1;

        // Sort alphabetically
        return a.name.localeCompare(b.name);
      });

      this.items = sortedItems;
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  },
    async fetchItems() {
      try {
        const response = await axios.get(API_BASE_URL);
        let responseItems = response.data
          // Sort by status (empty goes up, filled down)
        this.items = responseItems;
        this.sortItems();
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    deleteItem(index) {
      const itemId = this.items[index].id;

      axios.delete(`${API_BASE_URL}/${itemId}`)
        .then(response => {
          if (response.status === 200) {
            this.items.splice(index, 1);
          } else {
            console.error('Failed to delete item');
          }
        })
        .catch(error => console.error('Error deleting item:', error));
    },
    editItem(index) {
      let itemsName = this.items[index].name;
      let itemsCategory = this.items[index].category;

    },
    updateStatus(index) {
      const itemId = this.items[index].id;
      const itemsName = this.items[index].name;
      const newStatus = !this.items[index].empty;
      const itemsCategory = this.items[index].category;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: itemsName , empty: newStatus, category: itemsCategory }),
      };

      axios.put(`${API_BASE_URL}/${itemId}`, requestOptions.body, { headers: requestOptions.headers })
        .then(response => {
          this.items.splice(index, 1, response.data);
          this.fetchItems();
        })
        .catch(error => console.error('Error updating item status:', error));
    },
  },
  };

</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;

}

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}

.table th {
  background-color: #343a40;
  color: #ffffff;
}


.table td:nth-child(2) {
  font-weight: bold;
}


.table-hover tbody tr:hover {
  background-color: #4e5d6c;
}

.form-check-input {
  margin-top: 0.3rem;
}

.btn-sm {
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
}

.line-through {
  text-decoration: line-through;
}

.checkbox-col {
  width: 20px;
}



</style>
