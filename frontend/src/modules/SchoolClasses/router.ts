import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: 'school-classes',
    name: 'SchoolClasses',
    component: () => import('./pages/SchoolClassList.vue')
  }
]

export default routes
