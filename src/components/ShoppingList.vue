<template>
  <div class="container">
    <h2 class="text-center mt-3 mb-4">My Shopping List</h2>
    <div>
      <table class="table table-bordered table-striped table-dark">
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
        <tr v-for="(item, index) in items" :key="index">
          <td class="checkbox-col">
            <div class="d-flex align-items-center">
              <input
                type="checkbox"
                :checked="item.empty === false"
                @change="updateStatus(index)"
                class="mr-2"
              />
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <span :class="{ 'line-through': item.empty === false }">{{ item.name }}</span>
            </div>
          </td>
          <td>
            <div>{{ item.empty === false ? 'Filled' : 'Empty' }}</div>
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
import eventBus from "@/eventBus";
import {onMounted} from "vue";
  export default {
    props: {
      items: Array,
      editItem: Function,
      deleteItem: Function,
      updateStatus: Function,
    },
  data() {
    return {
      newItem: '',
      items: [],
      editedItem: null

    };
  },
  mounted() {
    this.fetchItems();
  }
,
  methods: {

    async fetchItems() {
      try {
        const response = await axios.get(API_BASE_URL);
        let sortedItems = response.data.sort((a, b) => {
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

    submitItem() {
      if (this.newItem.trim() === '') return;
      this.editedItem !== null ? this.updateItem() : this.addItem();
    },
    addItem() {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.newItem.trim(),
          status: false,
          category: 'FRUIT',
        }),
      };

      axios.post(API_BASE_URL, requestOptions.body, { headers: requestOptions.headers })
        .then(response => {
          this.items.push(response.data);
          this.newItem = '';
        })
        .catch(error => console.error('Error adding item:', error));
    },

    updateItem() {
      const itemId = this.items[this.editedItem].id;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.newItem.trim(), status: this.items[this.editedItem].status }),
      };

      axios.put(`${API_BASE_URL}/${itemId}`, requestOptions.body, { headers: requestOptions.headers })
        .then(response => {
          this.items.splice(this.editedItem, 1, response.data);
          this.newItem = '';
          this.editedItem = null;
        })
        .catch(error => console.error('Error updating item:', error));
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
      this.newItem = this.items[index].name;
      this.editedItem = index;
    },


    updateStatus(index) {
      const itemId = this.items[index].id;
      const newStatus = !this.items[index].empty;

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.items[index].name, empty: newStatus }),
      };

      axios.put(`${API_BASE_URL}/${itemId}`, requestOptions.body, { headers: requestOptions.headers })
        .then(response => {
          this.items.splice(index, 1, response.data);
        })
        .catch(error => console.error('Error updating item status:', error));
    },
  },
  };
onMounted(() => {
  eventBus.on('itemAdded', fetchItems);
});
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

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}
.table td:nth-child(2) {
  font-weight: bold;
}
.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}
.table td:nth-child(2) {
  font-weight: bold;
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

.table .btn-sm {
  margin-right: 15px;
  .table .btn-sm {
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
  }


  .table .btn-sm {
    margin-right: 5px;
  }
}
</style>



