import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/subscribe-to-the-gazette',
      name: 'subscribe-to-the-gazette',
      component: () => import('../views/SubscribeDonateView.vue')
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: () => import('../views/ContactUsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/staff-articles',
      name: 'staff-articles',
      component: () => import('../views/StaffArticlesView.vue')
    },
    {
      path: '/archives',
      name: 'archives',
      component: () => import('../views/ArchivesView.vue')
    },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: () => import('../views/UserView.vue')
    // },
    // {
    //   path: '/the-student-gazette',
    //   name: 'the-student-gazette',
    //   component: () => import('../views/TheStudentGazetteView.vue')
    // },
    {
      path: '/non-political-cartoons',
      name: 'non-political-cartoons',
      component: () => import('../views/NonPoliticalCartoonsView.vue')
    },
    {
      path: '/the-research-journal',
      name: 'the-research-journal',
      component: () => import('../views/TheResearchJournalView.vue')
    },
    {
      path: "/logout",
      name: "logout",
      component: {
        beforeRouteEnter(to, from, next) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      }
    }
  ]
})

export default router
