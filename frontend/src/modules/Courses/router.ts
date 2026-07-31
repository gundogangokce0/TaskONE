import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: 'courses',
    name: 'Courses',
    component: () => import('./pages/CourseList.vue')
  }
]

export default routes
