import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '../modules/Auth/router'
import teacherRoutes from '../modules/Teachers/router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
    ...teacherRoutes,
    {
      path: '/',
      redirect: '/login'
    }
  ]
})

export default router
