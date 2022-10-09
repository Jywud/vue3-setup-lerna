import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  // return false
});

router.afterEach((to, from) => {
  let title = to.query.title || to.meta.title || '';
  document.title = title;
});

export default router;
