import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import ResearchDashboard from '../components/ResearchDashboard.vue';
import store from '../store';

const routes = [
  {
    path: '/login',
    component: LoginForm,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    component: RegisterForm,
    meta: { requiresAuth: false }
  },
  {
    path: '/research',
    component: ResearchDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/research'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!store.state.token;
    
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login');
    } else if (!to.meta.requiresAuth && isAuthenticated) {
      next('/research');
    } else {
      next();
    }
  });
  
  export default router;
