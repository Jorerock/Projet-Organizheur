import AboutPageComponent from '@/components/AboutPageComponent.vue';
import LoginPageComponent from '../components/LoginPageComponent.vue';
// import TodosPageComponent from '@/components/TodosPageComponent.vue';
import GestionUtilisateurPage from '@/components/GestionUtilisateurPage.vue';
import TodosPageComponent2 from '@/components/TodosPageComponent2.vue';
import UserListComponent from '@/components/UserListComponent.vue';

import CategoriePage from '@/components/CategoriePage.vue';
import ListPage from '@/components/ListPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name:'List',
      path: '/List',
      component: ListPage
    },
    {
      name:'Categorie',
      path: '/Categorie',
      component: CategoriePage
    },
    {
      name:'MesTodos',
      path: '/MesTodos',
      component: UserListComponent
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

    },

    {
      name: '/gestions',
      path:'/gestions',
      component: GestionUtilisateurPage
    }

  ]
});

export default router;
