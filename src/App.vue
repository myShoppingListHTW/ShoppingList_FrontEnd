<template>
  <div id="app">
    <shopping-list></shopping-list>
  </div>
</template>

<script>
import ShoppingList from './components/ShoppingList.vue'

export default {
  name: 'App',
  components: {
    ShoppingList
  }
}
</script>
