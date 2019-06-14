import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Intro from './views/Intro.vue';
import Details from './views/Details.vue';
import MainApp from './views/MainApp.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Intro
    },
    {
      path: '/app',
      name: 'app',
      component: MainApp,
      beforeEnter: (to: any, from: any, next: any) => {
        store.dispatch('loadCategories', true);
        store.dispatch('loadTransactions', true);
        next();
      }
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    }
  ]
});
