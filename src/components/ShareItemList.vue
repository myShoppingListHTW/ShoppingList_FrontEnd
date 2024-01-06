<template>
  <div class="share-items-container">
    <button @click="shareShoppingList" class="share-button">share shopping list</button>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async shareShoppingList() {
      const emptyItemsText = this.items
        .filter(item => item.empty)
        .map(item => item.name)
        .join('\n');

      try {
        await navigator.clipboard.writeText(emptyItemsText);
        alert('shopping list copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy: ', err);
        alert('Failed to copy shopping list to clipboard.');
      }
    },
  },
};
</script>

<style scoped>
.share-items-container {
  margin-top: 20px;
}

.share-button {
  margin-bottom: 10px;
}
</style>
