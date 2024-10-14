import AboutPageComponent from '@/components/AboutPageComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import TodosPageComponent from '@/components/TodosPageComponent.vue';
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
      component: LoginComponent
    }
  ]
});

export default router;
