import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/ShoppingList',
          name: 'ShoppingList',
          component: () => import('../components/ShoppingList.vue'),
      },

  ]
})

export default router
