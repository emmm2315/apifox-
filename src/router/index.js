// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store/user';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Me from '../views/Me.vue';
import GroupDetail from '../views/GroupDetail.vue';

const routes = [
  { 
    path: '/login', 
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false } 
  },
  { 
    path: '/', 
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/me', 
    name: 'Me',
    component: Me,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/group/:id', 
    name: 'GroupDetail',
    component: GroupDetail,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// === 核心考点：全局路由守卫 ===
router.beforeEach((to, from, next) => {
  // 注意：这里必须在函数内部获取 store，否则会报错
  const userStore = useUserStore();
  
  // 判断逻辑：
  // 1. 如果目标页面需要登录 (requiresAuth 为 true)
  // 2. 且用户当前没有 token (userStore.token 为空)
  if (to.meta.requiresAuth && !userStore.token) {
    next('/login'); // 强制跳转到登录页
  } else {
    next(); // 允许通过
  }
});

export default router;