<template>
  <div class="share-items-container">
    <button @click="shareShoppingList" class="share-button">
      <font-awesome-icon icon="fa-solid fa-copy"></font-awesome-icon>
    </button>
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
.share-button {
  background-color: transparent; /* or any other contrasting color */
  border: none;
  cursor: pointer;
  font-size: 24px; /* Adjust as necessary */
  color: #009677; /* Ensure this color stands out against your background */
}



</style>
