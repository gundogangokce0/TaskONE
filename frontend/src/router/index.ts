import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import Login from '../modules/Auth/pages/Login.vue'
import TeacherList from '../modules/Teachers/pages/TeacherList.vue'
import CourseList from '../modules/Courses/pages/CourseList.vue'
import ClassroomList from '../modules/Classrooms/pages/ClassroomList.vue'
import SchoolClassList from '../modules/SchoolClasses/pages/SchoolClassList.vue'
import TimeSlotList from '../modules/TimeSlots/pages/TimeSlotList.vue'
import TimetableMatrix from '../modules/Timetable/pages/TimetableMatrix.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: MainLayout,
      redirect: '/timetable',
      children: [
        {
          path: 'timetable',
          name: 'TimetableMatrix',
          component: TimetableMatrix
        },
        {
          path: 'teachers',
          name: 'Teachers',
          component: TeacherList
        },
        {
          path: 'courses',
          name: 'Courses',
          component: CourseList
        },
        {
          path: 'classrooms',
          name: 'Classrooms',
          component: ClassroomList
        },
        {
          path: 'school-classes',
          name: 'SchoolClasses',
          component: SchoolClassList
        },
        {
          path: 'time-slots',
          name: 'TimeSlots',
          component: TimeSlotList
        }
      ]
    }
  ]
})

export default router
