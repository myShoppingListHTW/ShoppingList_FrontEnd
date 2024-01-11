<template >
  <div class="container">
  <div class="controls-container">
    <div class="share-items-container-fluid">
      <ShareItemsList :items="items" />
    </div>
    <div class="filter-section">
      <FilterSection
        :selectedFilterCategory="selectedFilterCategory"
        :categories="categories"
        @update:selectedFilterCategory="updateSelectedFilterCategory"
        @update:deleteSelectedFilter="deleteSelectedFilter"
      />
    </div>
    <div>
      <section class="button">
        <button class="create-item-button" @click="addItem()">Create Item</button>
      </section>
    </div>
  </div>
    <div class="content-table-container">
    <table class="content-table ">
      <thead>
      <tr>
        <th scope="col" class="checkbox-col sticky-header"></th>
        <th scope="col" class="sticky-header">Item</th>
        <th scope="col" class="sticky-header">Status</th>
        <th scope="col" class="sticky-header">Category</th>
        <th scope="col" class="text-center sticky-header">Actions</th>
      </tr>
      </thead>
      <tbody class="overflow-y-scroll">
      <tr  v-for="(item, index) in items" :key="index" :class="{ 'table-success': !item.empty }">
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
          <button @click="editItem(index)" class="btn btn-primary btn-sm shadow">✎</button>
          <button @click="deleteItem(index)" class="btn btn-danger btn-sm ml-2 shadow ">✖</button>
        </td>
      </tr>
      </tbody>
    </table>
      </div>
    <div v-if="showEditForm">
      <edit-item-form :editedItem="editedItem" :categories="categories" @save-edits="saveEdits" @cancel-edit="cancelEdit" />
    </div>
    <div v-if="showAddItemForm">
      <add-item-button :newItem="newItem" :categories="categories" @save-item="saveItem" @cancel-adding-item="cancelAddingItem" />
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import FilterSection from '@/components/FilterSection.vue';
import EditItemForm from '@/components/EditItemForm.vue';
import addItemButton from  '@/components/addItemButton.vue';
import { API_BASE_URL } from '@/config/config';
import ShareItemsList from '@/components/ShareItemList.vue';
import { onMounted, ref } from 'vue'
import { useAuth } from '@okta/okta-vue'
import DarkModeSwitch from "@/App.vue";
import ModeSwitcher from "@/components/modeSwitcher.vue";

const email = ref('')
const $auth = useAuth()
const owner = email.value

export default {
  components: {
    ModeSwitcher,
    DarkModeSwitch,

    addItemButton,
    ShareItemsList,
    FilterSection,
    EditItemForm,
  },
  data() {
    return {
      items: [],
      allItems: [],
      newItem: {
        name: '',
        empty: true,
        category: '',
        owner: 'everybody',
        darkmode: false,
      },
      editedItem: null,
      showEditForm: false,
      showAddItemForm: false,
      selectedFilterCategory: '',
      categories: ['FRUIT', 'VEGETABLE', 'MEAT', 'FISH', 'DAIRY', 'BAKERY', 'SWEETS', 'DRINKS', 'ALCOHOL', 'OTHER'],
    };
  },
  mounted() {
    useAuth().getUser().then((user) => {
      email.value = user.email
      this.fetchItems(email.value)
    })
  },
  methods: {
    async fetchItems(owner = 'everybody') {
      try {
        const endpoint = API_BASE_URL  + `?owner=${email.value}`;

        const response = await axios.get(endpoint);

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
        .delete(`${API_BASE_URL}${itemId}`)
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
      axios.put(`${API_BASE_URL}${item.id}`, item)
        .then(response => {
          const index = this.items.findIndex(i => i.id === item.id);
          if (index !== -1) {
            this.items.splice(index, 1, response.data);
          }
        }
        )
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
        body: JSON.stringify({ name: this.items[index].name, empty: newStatus, category: this.items[index].category, owner: this.items[index].owner }),
      };

      axios.put(`${API_BASE_URL}${itemId}`, requestOptions.body, { headers: requestOptions.headers })
        .then(response => {
          this.items.splice(index, 1, response.data);
        }
        )

        .catch(error => console.error('Error updating item status:', error));
    },
    saveItem(newItem){
      newItem.owner = email.value;
      axios.post(API_BASE_URL, newItem)
        .then(response => {
          this.items.push(response.data);
          this.showAddItemForm = false;
          newItem.name='';
          newItem.category='';
          this.fetchItems(email.value);
        })
        .catch(error => console.error('Error adding new item:', error));
    },
    cancelAddingItem() {
      this.newItem = '';
      this.showAddItemForm = false;
    },
  addItem() {
    this.showAddItemForm = true;
  },
  },
};
</script>

<style scoped>


.container {
  padding: 5px;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  max-height: 400px;
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
.controls-container {
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: sticky;
  background-color: rgb(212, 222, 237);
  top: 0;
  z-index: 100;
  padding: 1.5%;
}

.create-item-button {
  background-color: #009778;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px 20px;

  border-radius: 5px;
  flex: 1;
  margin: 0 5px;
}



.content-table  {
  height: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  min-width: 100%;
  height: 100%;
}

.content-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
}

.content-table th,
.content-table td {
  padding: 12px 15px;
}

.content-table tbody tr {
  border-bottom: 1px solid #dddddd;
  background-color: #ffffff;
  color: #000000;
  text-align: center;
}

.content-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.content-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.content-table tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}

.content-table-container{
  max-height: 350px; /* Set the maximum height for the container */
  overflow-y: auto;
}




</style>
