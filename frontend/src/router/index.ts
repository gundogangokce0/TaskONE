import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '../modules/Auth/router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
    {
      path: '/',
      redirect: '/login'
    }
  ]
})

export default router
