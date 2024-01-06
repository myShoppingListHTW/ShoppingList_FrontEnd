<!-- App.vue -->

<template>
  <div>
    <DarkModeSwitch @toggleDarkMode="toggleDarkMode"/>
    <ShoppingListView/>
    <!--home/-->
  </div>
</template>

<script>
import DarkModeSwitch from '../src/components/modeSwitcher.vue';
import ShoppingList from './Views/ShoppingListView.vue';
import ShoppingListView from '@/Views/ShoppingListView.vue'
import Home from '@/components/Home.vue'

export default {
  name: 'App',
  components: {
    Home,
    ShoppingListView,
    DarkModeSwitch,
    ShoppingList
  },
  data() {
    return {
      darkMode: false
    };
  },
  watch: {
    darkMode(newDarkMode) {
      // Log to console to check if dark mode is being toggled
      console.log('Dark Mode Toggled:', newDarkMode);

      // Apply the dark mode class directly to the body element
      document.body.classList.toggle('dark-mode', newDarkMode);
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    }
  }
}
</script>

<style>
/* Add your existing styles here */
/* For example: */

body {
  font-family: 'Arial', sans-serif;
}

.dark-mode {
  background-color: #2d2d2d; /* Set your desired dark background color */
  color: #ffffff; /* Set your desired light text color for dark mode */
}
</style>
