//index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { LoginCallback, navigationGuard } from '@okta/okta-vue'
import Login from '../components/Login.vue'
import Profile from '../components/Profile.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/ShoppingList',
      name: 'ShoppingList',
      component: () => import('../components/ShoppingList.vue'),
    },{
      path: '/newList',
      name: 'newList',
      component: () => import('../views/NewShoppingList.vue'),
    },

    {
      path: '/login',
      component: Login
    },
    {
      path: '/login/callback',
      component: LoginCallback
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
  ]
})
router.beforeEach(navigationGuard)

export default router
