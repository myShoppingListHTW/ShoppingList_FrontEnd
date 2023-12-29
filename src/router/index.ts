import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import ShoppingList from "../components/ShoppingList.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/ShoppingList',
          name: 'ShoppingList',
          component: ShoppingList

      },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    }

  ]
})

export default router
