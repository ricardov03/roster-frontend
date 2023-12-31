import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoursesListView from "@/views/courses/CoursesListView.vue";
import UsersView from "@/views/UsersView.vue";
import CourseDetailView from "@/views/courses/CourseDetailView.vue";
import SectionDetailView from "@/views/sections/SectionDetailView.vue";
import Absences from "@/views/attendances/Absences.vue";
import NewAttendance from "@/views/attendances/NewAttendance.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/courses',
      name: 'courses',
      component: CoursesListView
    },
    {
      path: '/courses/:id',
      name: 'courseDetail',
      component: CourseDetailView
    },
    {
      path: '/courses/:courseId/sections/:sectionId',
      name: 'sectionDetail',
      component: SectionDetailView
    },
    {
      path: '/courses/:courseId/sections/:sectionId/new-attendance',
      name: 'newAttendance',
      component: NewAttendance
    },
    {
      path: '/courses/:courseId/sections/:sectionId/attendances/:attendanceId',
      name: 'attendanceList',
      component: Absences
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
