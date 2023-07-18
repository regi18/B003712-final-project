import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginService from '@/services/LoginService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/NotFoundView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/subscribe-to-the-gazette',
      name: 'subscribe-to-the-gazette',
      component: () => import('../views/SubscribeDonateView.vue'),
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: () => import('../views/ContactUsView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/admin/LoginView.vue'),
    },
    {
      path: '/archives',
      name: 'archives',
      component: () => import('../views/ArchivesView.vue'),
    },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: () => import('../views/admin/UserView.vue'),
    // },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminView.vue'),
      beforeEnter: (to, from) => {
        if (LoginService.isLoggedIn()) return true;
        else return '/login';
      },
    },
    {
      path: '/logout',
      name: 'logout',
      component: {
        beforeRouteEnter(to, from, next) {
          LoginService.logout();
        },
      },
    },
    {
      path: '/sections',
      name: 'sections',
      children: [
        {
          path: 'non-political-cartoons',
          name: 'non-political-cartoons',
          component: () => import('../views/departments/NonPoliticalCartoonsView.vue'),
        },
        {
          path: 'the-research-journal',
          name: 'the-research-journal',
          component: () => import('../views/departments/TheResearchJournalView.vue'),
        },
        {
          path: ':section',
          name: 'general-section',
          component: () => import('../views/departments/ArticlesView.vue'),
        },
      ],
    },
    {
      path: '/sections/:section/:slug',
      name: 'article',
      component: () => import('../views/departments/ArticleView.vue'),
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/404' },
  ],
});

export default router;
