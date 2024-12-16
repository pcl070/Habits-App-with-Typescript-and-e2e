import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import EditCategoriesPage from '../pages/EditCategoriesPage.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: HomePage },
  {
    path: '/edit-categories',
    name: 'EditCategories',
    component: EditCategoriesPage,
  },
  { path: '/day/:date', name: 'day', component: HomePage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
