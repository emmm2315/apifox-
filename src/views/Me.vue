<template>
  <div class="me">
    <button @click="$router.push('/')">回首页</button>
    <h2>个人中心</h2>
    <div v-if="userInfo">
      <p>用户名: {{ userInfo.username }}</p>
      <p>Email: {{ userInfo.email }}</p>
      <button @click="logout">退出登录</button>
    </div>

    <h3>我加入的群组</h3>
    <ul>
      <li v-for="g in myGroups" :key="g.id">
        {{ g.name }} (角色: {{ g.role }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../api';
import { useRouter } from 'vue-router';

const router = useRouter();
const userInfo = ref(null);
const myGroups = ref([]);

onMounted(async () => {
  try {
    // 获取个人信息
    const uRes = await api.getUserInfo();
    userInfo.value = uRes.data.data;
    
    // 获取我的群组
    const gRes = await api.getUserGroup();
    myGroups.value = gRes.data.data;
  } catch (e) {
    alert('请先登录');
    router.push('/login');
  }
});

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>