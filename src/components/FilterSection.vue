<template>
  <div class="filter-section">
    <select :value="selectedFilterCategory" @input="updateSelectedFilterCategory">
      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
    </select>
    <button class="clear-filter-button" v-if="isFilterApplied" @click="clearFilter">Clear Filter</button>
  </div>
</template>

<script>
export default {
  props: {
    selectedFilterCategory: String,
    categories: Array,
  },
  computed: {
    isFilterApplied() {
      return this.selectedFilterCategory !== 'all';
    },
  },
  methods: {
    updateSelectedFilterCategory(event) {
      this.$emit('update:selectedFilterCategory', event.target.value);
    },
    clearFilter(event) {
      this.$emit('update:deleteSelectedFilter', event.target.value);
    },
  },
};
</script>
<style scoped>
.filter-section {
  display: flex;
  align-items: center;
}

.filter-dropdown {
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  color-profile: #343a40;
  border-radius: 5px;
  font-size: 14px;
}

.clear-filter-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.clear-filter-button:hover {
  background-color: #c82333;
}

/* Add more styles as needed */
</style>
