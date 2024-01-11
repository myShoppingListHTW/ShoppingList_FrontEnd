// Home.vue
<template>
  <section class="home-view">
    <div class="content-container">
      <h1>Welcome to Your App</h1>
      <p>This is the landing page after signing in. Feel free to customize this text.</p>
    </div>
  </section>
  <section class="button-bar">
  </section>
</template>

<script>
import shoppingList from '@/components/ShoppingList.vue'
import { RouterLink } from 'vue-router'

export default {
  components: { RouterLink },
  computed: {
    shoppingList() {
      return shoppingList
    }
  },
  data() {
    return {
    };
  }
};
</script>

<style scoped>


.content-container {
  text-align: center;
  color: #050202;
}

.content-container h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.content-container p {
  font-size: 1.2em;
  line-height: 1.5;
}
.container-fluid {
  padding: 0;
  height: 40vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: #050202;
}
.home-view{
  color: #181818;

}


</style>
