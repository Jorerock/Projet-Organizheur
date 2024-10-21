import AboutPageComponent from '@/components/AboutPageComponent.vue';
import LoginPageComponent from '../components/LoginPageComponent.vue';
import TodosPageComponent from '@/components/TodosPageComponent.vue';
import UserPageComponent from '@/components/UserPageComponent.vue';

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name:'todos',
      path: '/todos',
      component: TodosPageComponent
    },
    {
      name: 'about',
      path:'/about',
      component: AboutPageComponent
    },
    {
      name: 'login',
      path:'/login',
      component: LoginPageComponent
      // component: LoginPageComponent
    },

    {
      name: 'user',
      path:'/user',
      component: UserPageComponent
      // component: LoginPageComponent
    }

  ]
});

export default router;
