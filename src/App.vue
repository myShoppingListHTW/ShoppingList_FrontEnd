<template>
  <div id="app">
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
