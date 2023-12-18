<template>
  <div id="app" >
    <ShoppingList></ShoppingList>
  </div>
</template>

<script>
import ShoppingList from './views/ShoppingListView.vue'; // Make sure to include the file extension (.vue)

export default {
  name: 'App',
  components: {
    ShoppingList
  }
}
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #f0f0f0; /* Set your desired background color */
}
</style>
