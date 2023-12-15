<template>
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
            :checked="item.status"
            @change="toggleStatus(index)"
            class="mr-2"
          />
        </div>
      </td>
      <td>
        <div class="d-flex align-items-center">
          <span :class="{ 'line-through': item.status }">{{ item.name }}</span>
        </div>
      </td>
      <td>
        <div>{{ item.status ? 'Filled' : 'Empty' }}</div>
      </td>
      <td>
        <div>{{ item.category || 'N/A' }}</div>
      </td>
      <td class="text-center">
        <button @click="editItem(index)" class="btn btn-primary btn-sm">Edit</button>
        <button @click="deleteItem(index)" class="btn btn-danger btn-sm ml-2">Delete</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    items: Array,
    toggleStatus: Function,
    editItem: Function,
    deleteItem: Function,
  },
};
</script>

<style scoped>
/* You can keep the styling specific to the table if needed */
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
}
</style>
