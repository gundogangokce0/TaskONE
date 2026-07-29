import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/classrooms',
    name: 'Classrooms',
    component: () => import('./pages/ClassroomList.vue')
  }
]

export default routes
