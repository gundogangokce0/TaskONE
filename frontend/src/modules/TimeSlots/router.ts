import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/time-slots',
    name: 'TimeSlots',
    component: () => import('./pages/TimeSlotList.vue')
  }
]

export default routes
