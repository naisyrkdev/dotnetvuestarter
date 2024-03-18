import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home/index.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Shop from '../pages/shop/index.vue';
import Login from '../pages/auth/login.vue';
import Register from '../pages/auth/register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  });
}

router.beforeEach(async (to: any, from: any, next: any) => {
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    }
    else {
      alert('No access');
      next('/');
    }
  }
  next()
})


export default router
