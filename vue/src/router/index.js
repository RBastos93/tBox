import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/login/Login.vue';
import guard from '../services/navigationGuards';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: guard,
    children: [
      {
        path: 'product',
        component: () => import('../components/product/load.vue'),
      },
      {
        path: 'product/new',
        component: () => import('../components/product/create.vue'),
      },
      {
        path: 'product/:productId/edit',
        component: () => import('../components/product/edit.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    beforeEnter: guard,
    component: () => import('../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/user/new',
    name: 'User',
    component: () => import('../components/user/create.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
