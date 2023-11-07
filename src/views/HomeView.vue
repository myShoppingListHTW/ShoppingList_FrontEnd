<template>
  <div class="home">
    <img alt="wishlist" src="../assets/wishlist.png">
    <HelloWorld msg="Hello ShoppingList"/>
    <NavBar></NavBar>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    HelloWorld
  }
}
</script>
