import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: 'teachers',
    name: 'Teachers',
    component: () => import('./pages/TeacherList.vue')
  }
]

export default routes
