<!-- Home.vue -->

<template>
  <div>
    <h2 class="text-center mt-3 mb-4">Shopping Lists</h2>
    <router-link to="/create" class="btn btn-success mb-3">Create a New List</router-link>

    <ul class="list-group">
      <li v-for="(list, index) in shoppingLists" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
        {{ list.name }}
        <span class="badge badge-primary badge-pill">{{ list.items.length }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shoppingLists: [
        { name: 'List 1', items: ['Item A', 'Item B', 'Item C'] },
        { name: 'List 2', items: ['Item X', 'Item Y'] },
        // ... add more lists as needed
      ],
    };
  },
};
</script>

<style scoped>
/* Add any custom styling for the Home component */
</style>
