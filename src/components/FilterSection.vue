<template>
  <div class="filter-section">
    <select :value="selectedFilterCategory" @input="updateSelectedFilterCategory">
      <option value="">No Filter</option>
      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    selectedFilterCategory: String,
    categories: Array,
  },

  methods: {
    updateSelectedFilterCategory(event) {
      this.$emit('update:selectedFilterCategory', event.target.value);
    },

  },
};
</script>
<style scoped>


select {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  color: #000;
}


</style>
