// src/store/user.js
import { defineStore } from 'pinia';
import api from '../api'; // 引入我们之前写的 api.js

export const useUserStore = defineStore('user', {
  // 1. State: 相当于组件的 data，用来存数据
  state: () => ({
    token: localStorage.getItem('token') || '', // 优先从本地缓存拿
    userInfo: null,
  }),

  // 2. Getters: 相当于组件的 computed
  getters: {
    isLoggedIn: (state) => !!state.token, //这是个布尔值，有token就是true
  },

  // 3. Actions: 相当于组件的 methods，用来修改数据
  actions: {
    // 登录动作
    async login(loginForm) {
      try {
        const res = await api.login(loginForm);
        // 拿到 token，存到 state 和 localStorage
        this.token = res.data.token; 
        localStorage.setItem('token', res.data.token);
        
        // 登录成功后，顺便去拿一下用户信息
        await this.fetchUserInfo();
        return true; // 告诉组件登录成功了
      } catch (error) {
        throw error;
      }
    },

    // 获取用户信息动作
    async fetchUserInfo() {
      if (!this.token) return;
      try {
        const res = await api.getUserInfo();
        this.userInfo = res.data.data;
      } catch (error) {
        console.error('获取用户信息失败', error);
      }
    },

    // 退出登录动作
    logout() {
      this.token = '';
      this.userInfo = null;
      localStorage.removeItem('token');
    }
  }
});