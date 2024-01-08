<template>
  <div>
    <ShareItemsList :items="items" />
    <div>
      <FilterSection
        :selectedFilterCategory="selectedFilterCategory"
        :categories="categories"
        @update:selectedFilterCategory="updateSelectedFilterCategory"
        @update:deleteSelectedFilter="deleteSelectedFilter"
      />
      <div class="card-container">
        <div v-for="(item, index) in items" :key="index" class="card">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">
              <span v-if="item.empty" class="text-danger">Empty</span>
              <span v-else class="text-success">Filled</span>
            </p>
            <p class="card-text">{{ item.category || 'NO CAT*' }}</p>
            <div class="text-center">
              <button @click="editItem(index)" class="btn btn-primary btn-sm">✎</button>
              <button @click="deleteItem(index)" class="btn btn-danger btn-sm ml-2">✖</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showEditForm">
        <edit-item-form :editedItem="editedItem" :categories="categories" @save-edits="saveEdits" @cancel-edit="cancelEdit" />
      </div>
    </div>
    <add-item-button />
  </div>
</template>

<script>
import axios from 'axios';
import FilterSection from '@/components/FilterSection.vue';
import EditItemForm from '@/components/EditItemForm.vue';
import { API_BASE_URL } from '@/config/config';
import ShareItemsList from '@/components/ShareItemList.vue';
import AddItemButton from '@/components/addItemButton.vue';

export default {
  components: {
    AddItemButton,
    ShareItemsList,
    FilterSection,
    EditItemForm,
  },
  data() {
    return {
      items: [],
      allItems: [],
      ownersItems: [],
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
    // ... (existing methods)
    async fetchItems(owner = '') {
      try {
        const baseUrl = API_BASE_URL; // Replace with your actual backend URL
        const endpoint = baseUrl  + (owner ? `?owner=${owner}` : '');

        const response = await axios.get(endpoint);

        // Assuming your API response contains an array of items
        this.items = response.data.map((item) => ({
          ...item,
          empty: item.empty !== false,
        }));

        this.allItems = [...this.items];
        this.sortItems();
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    updateSelectedFilterCategory(category) {
      this.selectedFilterCategory = category;
      this.applyFilter();
    },
    deleteSelectedFilter() {
      this.selectedFilterCategory = '';
      this.applyFilter();
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
    // Example: updateItemOnServer method
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

};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.card {
  width: calc(33.33% - 20px); /* Adjust the width based on your layout */
  background-color: #333;
  color: #fff;
}

.card-body {
  padding: 1rem;
}

.text-danger {
  color: #dc3545;
}

.text-success {
  color: #28a745;
}

.btn-sm {
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
}

/* Other existing styles */
</style>
