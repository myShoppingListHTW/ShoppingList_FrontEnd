<template>
  <div>
    <ShareItemsList :items="items" />
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
    <add-item-button />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import FilterSection from '@/components/FilterSection.vue';
import EditItemForm from '@/components/EditItemForm.vue';
import { API_BASE_URL } from '@/config/config';
import ShareItemsList from '@/components/ShareItemList.vue';
import AddItemButton from '@/components/addItemButton.vue';
import { useAuth } from '@okta/okta-vue';

const $auth = useAuth();

export default {
  components: {
    AddItemButton,
    ShareItemsList,
    FilterSection,
    EditItemForm,
  },
  setup() {
    const items = ref([]);
    const allItems = ref([]);
    const ownersItems = ref([]);
    const editedItem = ref(null);
    const showEditForm = ref(false);
    const selectedFilterCategory = ref('');
    const categories = ref(['FRUIT', 'VEGETABLE', 'MEAT', 'FISH', 'DAIRY', 'BAKERY', 'SWEETS', 'DRINKS', 'ALCOHOL', 'OTHER']);
    // Added isAuthenticated to track if authentication is completed
    const isAuthenticated = ref(false);

    const fetchItems = async () => {
      try {
        // Check if authentication is completed
        if ($auth.user && $auth.user.value) {
          const endpoint = API_BASE_URL + '?owner=' + $auth.user.value.email;
          const response = await axios.get(endpoint);
          items.value = response.data.map((item) => ({
            ...item,
            empty: item.empty !== false,
          }));
          allItems.value = [...items.value];
          sortItems();
        } else {
          console.error('User is not defined.');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    // ... (other functions)

    onMounted(async () => {
      // Wait for authentication to complete
      await $auth.isAuthenticated();
      isAuthenticated.value = true;
      fetchItems();
    });

    return {
      items,
      allItems,
      ownersItems,
      editedItem,
      showEditForm,
      selectedFilterCategory,
      categories,
      fetchItems
    };
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
