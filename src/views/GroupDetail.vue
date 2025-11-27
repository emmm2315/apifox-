<template>
  <div v-if="group" class="detail">
    <button @click="$router.back()">返回</button>
    <h1>{{ group.name }}</h1>
    <p>简介: {{ group.description }}</p>
    <p>创建人ID: {{ group.founder_id }}</p>
    
    <div class="actions">
      <button @click="handleJoin">加入该群组</button>
      <button @click="handleLeave" style="background:red; color:white; margin-left:10px;">退出/离开</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api';

const route = useRoute();
const group = ref(null);

onMounted(async () => {
  const res = await api.getGroupDetail(route.params.id);
  group.value = res.data.data;
});

const handleJoin = async () => {
  try {
    const res = await api.joinGroup({ groupId: group.value.id });
    alert(res.data.message);
  } catch (e) {
    alert('操作失败，请确认是否登录');
  }
};

const handleLeave = async () => {
    if(!confirm('确定要退出吗？')) return;
    try {
        await api.leaveGroup(group.value.id);
        alert('已退出');
    } catch (e) {
        alert('退出失败');
    }
}
</script>