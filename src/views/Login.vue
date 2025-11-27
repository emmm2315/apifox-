<template>
  <div class="login-page">
    <h2>{{ isRegister ? '注册' : '登录' }}</h2>
    <input v-model="form.username" placeholder="用户名" />
    <input v-model="form.password" type="password" placeholder="密码" />
    <input v-if="isRegister" v-model="form.email" placeholder="邮箱" />
    
    <button @click="handleSubmit">{{ isRegister ? '提交注册' : '登录' }}</button>
    <p @click="isRegister = !isRegister" style="cursor:pointer; color:blue;">
      {{ isRegister ? '已有账号？去登录' : '没有账号？去注册' }}
    </p>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import api from '../api';
import { useRouter } from 'vue-router';

const router = useRouter();
const isRegister = ref(false);
const form = reactive({ username: '', password: '', email: '' });

const handleSubmit = async () => {
  try {
    if (isRegister.value) {
      await api.register(form);
      alert('注册成功，请登录');
      isRegister.value = false;
    } else {
      const res = await api.login(form);
      localStorage.setItem('token', res.data.token); 
      router.push('/');
    }
  } catch (error) {
    alert('操作失败: ' + (error.response?.data?.message || error.message));
  }
};
</script>
<style scoped>
.login-page { display: flex; flex-direction: column; max-width: 300px; margin: 50px auto; gap: 10px; }
</style>