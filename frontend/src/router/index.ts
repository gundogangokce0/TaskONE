import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import authRoutes from '../modules/Auth/router'
import teacherRoutes from '../modules/Teachers/router'
import courseRoutes from '../modules/Courses/router'
import classroomRoutes from '../modules/Classrooms/router'
import schoolClassRoutes from '../modules/SchoolClasses/router'
import timeSlotRoutes from '../modules/TimeSlots/router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
    {
      path: '/',
      component: MainLayout,
      redirect: '/teachers',
      children: [
        ...teacherRoutes,
        ...courseRoutes,
        ...classroomRoutes,
        ...schoolClassRoutes,
        ...timeSlotRoutes
      ]
    }
  ]
})

export default router
