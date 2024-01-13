// Home.vue
<template>
  <section class="home-view">
    <div class="content-container">
      <p>Using a shopping checklist can be a game-changer.</p>
        <p>It's not just about making lists; </p>
      <p> it's about saving big! 🛒💰</p>
    </div>
  </section>
  <section class="button-bar">
  </section>
</template>

<script>
import shoppingList from '@/components/ShoppingList.vue'
import { RouterLink } from 'vue-router'

export default {
  components: {RouterLink },
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
p{
font-style: italic;
}

</style>
