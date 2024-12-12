import AboutPageComponent from '@/components/AboutPageComponent.vue';
import LoginPageComponent from '../components/LoginPageComponent.vue';
import TodosPageComponent from '@/components/TodosPageComponent.vue';
import GestionUtilisateurPage from '@/components/GestionUtilisateurPage.vue';
import TodosPageComponent2 from '@/components/TodosPageComponent2.vue';



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
      name:'todos2',
      path: '/todos2',
      component: TodosPageComponent2
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
      name: '/gestions',
      path:'/gestions',
      component: GestionUtilisateurPage
      // component: LoginPageComponent
    }

  ]
});

export default router;
