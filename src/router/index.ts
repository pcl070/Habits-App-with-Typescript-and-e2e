import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import EditCategoriesPage from '../pages/EditCategoriesPage.vue';
import dayjs from 'dayjs';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: HomePage },
  {
    path: '/edit-categories',
    name: 'EditCategories',
    component: EditCategoriesPage,
  },
  {
    path: '/day/:date',
    name: 'day',
    component: HomePage,
    props: true,
    beforeEnter: (to, from, next) => {
      const inputDate = to.params.date as string;

      // Validate date format
      if (!isValidDate(inputDate)) {
        return next({
          name: 'day',
          params: { date: dayjs().format('YYYY-MM-DD') },
        });
      }

      // Check if the date is in the future
      if (dayjs(inputDate).isAfter(dayjs())) {
        return next({
          name: 'day',
          params: { date: dayjs().format('YYYY-MM-DD') },
        });
      }

      // If the date is valid and not in the future, proceed
      next();
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function isValidDate(date: string): boolean {
  return dayjs(date, 'YYYY-MM-DD', true).isValid();
}

export default router;
