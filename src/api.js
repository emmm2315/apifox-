import axios from 'axios';
import { ApiBaseUrl } from './config'

const apiClient = axios.create
({
  baseURL: ApiBaseUrl
,
  timeout: 5000
,
})

//自动带上 Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // User
  login: (data) => apiClient.post('/user/login', data),
  register: (data) => apiClient.post('/user/register', data),
  getUserInfo: () => apiClient.get('/user/getUserInfo'),
  getUserGroup: () => apiClient.get('/user/getUserGroup'),
  
  // Group
  getGroupList: () => apiClient.get('/group/getGroupList'),
  addNewGroup: (data) => apiClient.post('/group/addNewGroup', data),
  getGroupDetail: (id) => apiClient.get('/group/getGroupDetailById', { params: { id } }),
  deleteGroup: (data) => apiClient.delete('/group/deleteGroup', { data }),
  
  // Member
  joinGroup: (data) => apiClient.post('/member/joinGroup', data),
  leaveGroup: (groupId) => apiClient.delete('/member/leaveGroup', { params: { groupId } }),
};