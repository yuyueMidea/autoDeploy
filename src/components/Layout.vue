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
                <ul class="menu-list">
                    <li v-for="(item, k) in routeMetaList" :key="k">
                        <router-link :to="item.path">{{item.name}}</router-link>
                    </li>
                </ul>
            </div>
            <div class="content-area">
                <router-view v-slot="{ Component }">
                  <transition name="fade" mode="out-in">
                    <KeepAlive :include="app1store.cachedComList">
                      <component :is="Component" />
                    </KeepAlive>
                  </transition>
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
const routeMetaList = props.routeList.filter(c=> !c.hide)

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
/* 路由过渡动画 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

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

.menu-list li {
  border-bottom: 1px solid #666;
}

.menu-list li a {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #ecf0f1;
  text-decoration: none;
  transition: background-color 0.3s;
}

.menu-list li a:hover {
  background-color: #2c3e50;
}

.menu-list li a.router-link-exact-active {
  background-color: #42b983;
  color: white;
}

.content-area {
  flex: 1;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>