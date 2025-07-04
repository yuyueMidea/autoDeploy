<!-- ListWithSkeleton.vue -->
<template>
    <div>
      <template v-if="loading">
        <SkeletonItem v-for="n in 5" :key="n" />
      </template>
      <template v-else>
        <div class="table-container">
            <h2>用户列表
                <button @click="addUser">新增</button>
            </h2>
            <ModalDialog v-if="showModal" :show="showModal" :form="userForm" :onClose="closeModal" :onSave="handleSave" />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>姓名</th>
                        <th>邮箱</th>
                        <th>年龄</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in userList" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.age }}</td>
                        <td class="actions">
                            <button @click="editUser(user)" class="p-5 m-5">编辑</button>
                            <button @click="deleteUser(user.id)" class="p-5">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </template>
    </div>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue'
import SkeletonItem from './SkeletonItem.vue'
import ModalDialog from './ModalDialog.vue'
const showModal = ref(false)

function openModal() {
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
// 生成随机ID的方法，入参是位数，比如16位ID
const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(byte => chars[byte % chars.length])
    .join('');
}
const loading = ref(true)
// 用户列表数据
const userList = ref([
    {id: 'Kho5GIoLa3irqGRt', name: '张三', age:33, email: 'admin@163.com'},
    {id: 'BvwQzKClL50gI2sA', name: '李四', age:24, email: 'user@163.com'},
    {id: 'BvwQzKClL123I2sA', name: '王五', age:42, email: 'guest@163.com'},
])
const userForm = ref({
    id: '',
    name: '',
    email: '',
    age: '',
})
onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000) // 模拟异步加载
})
const deleteUser = (id) =>{
    if (confirm('确定要删除这个用户吗？')) {
        // console.warn(id, '--------dellll')
        userList.value = userList.value.filter(c=>c.id !== id);
    }
}
const editUser = (uform) =>{
    console.log('Userid:', uform);
    userForm.value = uform;
    openModal();
}
const addUser = ()=>{
    userForm.value = {
        id: generateRandomString(16),
        name: '',
        email: '',
        age: '',
    }
    openModal();
}
const handleSave = (saveData)=>{
    console.log('==resdata==========', saveData )
    const cindex = userList.value.findIndex(c=>c.id ===saveData.id);
    //更新用户
    if(cindex !== -1) {
        userList.value[cindex] = {...saveData};
    } else {
        //新增用户
        userList.value.push(saveData)
    }
}
</script>
<style scoped>
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 3px 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>