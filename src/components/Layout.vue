<template>
    <div class="layout">
        <div class="top-bar">
            <div class="p-5">{{app1store.cmenuName}}</div>
            <div class="user-info" v-if="app1store.isAuthenticated">
                <span>welcome, {{ app1store.crole }}</span>
                <button @click="handleLogout" class="btn">退出</button>
            </div>
        </div>
        <div class="main-content">
            <div class="side-menu">
                <ul>
                    <li v-for="(item, k) in routeMetaList" :key="k">
                        <router-link :to="item.path">{{item.name}}</router-link>
                    </li>
                </ul>
            </div>
            <div class="content-area">
                <router-view v-slot="{ Component }">
                  <KeepAlive :include="app1store.cachedComList">
                    <component :is="Component" />
                    </KeepAlive>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '../router';
import { useAppStore } from '../store/useCommonStore';
import { setPermissions } from '../utils/permission';
const props = defineProps({
  routeList: {
    type: Array,
    default:()=>[]
  }
});
const routeMetaList = props.routeList.filter(c=>c.name!=='NotFound')

const app1store = useAppStore();
//---退出登录
const handleLogout = () => {
  app1store.logOut();
  // 退出登录后跳转登录界面
  router.push('/login');
  setPermissions([]);
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.layout .top-bar {
  background-color: #ccc;
  color: white;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.layout .user-info {
  font-size: 14px;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.main-content .side-menu {
  width: 200px;
  background-color: #34495e;
  height: 100%;
  color: white;
}

.main-content .side-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.main-content .side-menu li {
  padding: 15px 20px;
  border-bottom: 1px solid #2c3e50;
}

.main-content .side-menu li:hover {
  background-color: #2c3e50;
}

.main-content .side-menu a {
  color: white;
  text-decoration: none;
}

.main-content .side-menu a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}

.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>