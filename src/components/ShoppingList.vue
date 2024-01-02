<!-- ShoppingList.vue -->

<template>
  <div>
    <FilterSection
      :selectedFilterCategory="selectedFilterCategory"
      :categories="categories"
      @update:selectedFilterCategory="updateSelectedFilterCategory"
      @update:deleteSelectedFilter="deleteSelectedFilter"
    />

    <div>
      <table class="table table-responsive table-borderless table-hover table-responsive-lg">
        <thead>
        <tr>
          <th scope="col" class="checkbox-col sticky-header"></th>
          <th scope="col" class="sticky-header">Item</th>
          <th scope="col" class="sticky-header">Status</th>
          <th scope="col" class="sticky-header">Category</th>
          <th scope="col" class="text-center sticky-header">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in items" :key="index" :class="{ 'table-success': !item.empty }">
          <td class="checkbox-col">
            <div class="form-check">
              <input type="checkbox" :checked="!item.empty" @change="updateStatus(index)" class="form-check-input" />
            </div>
          </td>
          <td>
            <span :class="{ 'line-through': !item.empty }">{{ item.name }}</span>
          </td>
          <td>
            <div :class="{ 'text-success': !item.empty, 'text-danger': item.empty }">
              {{ item.empty ? 'Empty' : 'Filled' }}
            </div>
          </td>
          <td>
            <div>{{ item.category || 'NO CAT*' }}</div>
          </td>
          <td class="text-center">
            <button @click="editItem(index)" class="btn btn-primary btn-sm">✎</button>
            <button @click="deleteItem(index)" class="btn btn-danger btn-sm ml-2">✖</button>
          </td>
        </tr>
        </tbody>
      </table>

      <div v-if="showEditForm">
        <edit-item-form :editedItem="editedItem" :categories="categories" @save-edits="saveEdits" @cancel-edit="cancelEdit" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import FilterSection from '@/components/FilterSection.vue';
import EditItemForm from '@/components/EditItemForm.vue';
import { API_BASE_URL } from '@/config/config';

export default {
  components: {
    FilterSection,
    EditItemForm
  },
  data() {
    return {
      items: [],
      allItems: [],
      editedItem: null,
      showEditForm: false,
      selectedFilterCategory: '',
      categories: ['FRUIT', 'VEGETABLE', 'MEAT', 'FISH', 'DAIRY', 'BAKERY', 'SWEETS', 'DRINKS', 'ALCOHOL', 'OTHER'],
    };
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    updateSelectedFilterCategory(category) {
      this.selectedFilterCategory = category;
      this.applyFilter();
    },
    deleteSelectedFilter() {
      this.selectedFilterCategory = '';
      this.applyFilter();
    },

    async fetchItems() {
      try {
        const response = await axios.get(API_BASE_URL);
        this.items = response.data.map((item) => ({ ...item, empty: item.empty !== false }));
        this.allItems = [...this.items];
        this.sortItems();
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },

    applyFilter() {
      if (this.selectedFilterCategory) {
        this.items = this.allItems.filter((item) => item.category === this.selectedFilterCategory);
      } else {
        this.items = [...this.allItems];
      }
      this.sortItems();
    },
    sortItems() {
      this.items.sort((a, b) => {
        if (a.empty && !b.empty) return -1;
        if (!a.empty && b.empty) return 1;
        return a.name.localeCompare(b.name);
      });
    },
    deleteItem(index) {
      const itemId = this.items[index].id;
      axios
        .delete(`${API_BASE_URL}/${itemId}`)
        .then((response) => {
          if (response.status === 200) {
            this.items.splice(index, 1);
          } else {
            console.error('Failed to delete item');
          }
        })
        .catch((error) => console.error('Error deleting item:', error));
    },
    editItem(index) {
      this.editedItem = { ...this.items[index] };
      this.showEditForm = true;
    },
    saveEdits(updatedItem) {
      const index = this.items.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        this.items.splice(index, 1, updatedItem);
        this.updateItemOnServer(updatedItem);
      }
      this.showEditForm = false;
      this.editedItem = null;
    },

    updateItemOnServer(item) {
      axios.put(`${API_BASE_URL}/${item.id}`, item)
        .then(response => {
          const index = this.items.findIndex(i => i.id === item.id);
          if (index !== -1) {
            this.items.splice(index, 1, response.data);
          }
        })
        .catch(error => console.error('Error updating item:', error));
    },
    cancelEdit() {
      this.editedItem = null;
      this.showEditForm = false;
    },
    updateStatus(index) {
      const itemId = this.items[index].id;
      const newStatus = !this.items[index].empty;

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.items[index].name, empty: newStatus, category: this.items[index].category }),
      };

      axios.put(`${API_BASE_URL}/${itemId}`, requestOptions.body, { headers: requestOptions.headers })
        .then(response => {
          this.items.splice(index, 1, response.data);
        })
        .catch(error => console.error('Error updating item status:', error));
    },
  },
};
</script>
<style scoped>

.table {
  width: 100%;
  border-collapse: collapse; /* Removes space between table cells */
}

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
  padding: 10px; /* Adjust padding as needed */
  border-bottom: 1px solid #666; /* Adds a subtle border to table rows */
}

.table th {
  background-color: #000; /* Black background for table headers */
  color: #fff; /* White text color for contrast */}

  .table td {
    background-color: #333; /* Dark background for table cells */
    color: #fff; /* White text color for contrast */
  }


  .table-hover tbody tr:hover {
    background-color: #444; /* Slightly lighter background on row hover */
  }

.form-check-input {
  margin-top: 0.3rem;
}

.sticky-header {
  position: sticky;
  top: 0;
  background-color: #343a40;
  color: #ffffff;
  z-index: 1;
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
.filter-section >>> .filter-dropdown {
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  background-color: #f8f9fa;
  vertical-align: middle;;
}

</style>
