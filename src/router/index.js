import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: function () {
      return import('../views/HomeView.vue');
    },
  },
  {
    path: '/orders',
    name: 'orders',
    component: function () {
      return import('../views/OrdersView');
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/cart',
    name: 'cart',
    component: function () {
      return import('../views/CartView');
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import('../components/LoginComponent');
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/signup',
    name: 'signup',
    component: function () {
      return import('../components/SignupComponent');
    },
    beforeEnter: ifNotAuthenticated,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
