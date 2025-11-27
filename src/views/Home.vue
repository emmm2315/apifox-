<template>
  <div class="home">
    <nav>
      <h1>群组大厅</h1>
      <router-link to="/me">个人中心 (我的)</router-link>
    </nav>
    <div class="create-box">
        <h3>新建群组</h3>
        <input v-model="newGroup.name" placeholder="群组名">
        <input v-model="newGroup.description" placeholder="描述">
        <button @click="createGroup">创建</button>
    </div>
    <hr/>
    <div class="list">
      <div v-for="group in groups" :key="group.id" class="card" @click="toDetail(group.id)">
        <h3>{{ group.name }}</h3>
        <p>{{ group.description }}</p>
        <small>创建时间: {{ new Date(group.create_at).toLocaleDateString() }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '../api';
import { useRouter } from 'vue-router';

const router = useRouter();
const groups = ref([]);
const newGroup = reactive({ name: '', description: '' });

// 加载群组列表
const loadGroups = async () => {
  const res = await api.getGroupList();
  groups.value = res.data.data;
};

// 创建群组
const createGroup = async () => {
    if(!newGroup.name) return alert('请输入名称');
    try {
        await api.addNewGroup(newGroup);
        alert('创建成功');
        loadGroups(); // 刷新列表
        newGroup.name = '';
        newGroup.description = '';
    } catch (e) {
        alert('创建失败');
    }
}

const toDetail = (id) => {
  router.push(`/group/${id}`);
};

onMounted(() => {
  loadGroups();
});
</script>

<style scoped>
.card { border: 1px solid #ddd; padding: 10px; margin: 10px 0; cursor: pointer; }
.card:hover { background-color: #f9f9f9; }
nav { display: flex; justify-content: space-between; align-items: center; }
</style>