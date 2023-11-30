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
                @change="changeStatus(index)"
                class="mr-2"
            />
            <span :class="{ 'line-through': item.status }">{{ item.name }}</span>
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
    const endpoint= 'http://localhost:8080/api/v1/article';
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(item => {
        this.items.push(item);
      }))
      .catch(error => console.log('error', error));
  },

  methods: {
    submitItem() {
      if (this.newItem.trim() === '') return;

      if (this.editedItem !== null) {
        this.items[this.editedItem].name = this.newItem.trim();
        this.editedItem = null;
      } else {
        this.items.push({
          name: this.newItem.trim(),
          status: false, // Initial status is set to 'Empty'
        });
      }

      this.newItem = '';
    },

    editItem(index) {
      this.newItem = this.items[index].name;
      this.editedItem = index;
    },

    deleteItem(index) {
      this.items.splice(index, 1);
    },

    changeStatus(index) {
      // Toggle the status of the item at the given index
      this.items[index].status = !this.items[index].status;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
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
</style>
