import { createApp } from 'vue'
// import './style.css'
import './custom.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import trackClick from './utils/trackClick'
import { permissionDirective, permissionMixin, setPermissions } from './utils/permission'
import GlobalList from './components/GlobalList.vue'
// createApp(App).use(router).mount('#app')

const app = createApp(App);
app.use(createPinia());

// 全局注册列表组件
app.component('CommonList', GlobalList)
// 注册点击追踪指令
app.directive('track', trackClick);
// 注册全局权限指令
app.directive('permission', permissionDirective);
// 注册全局混入
app.mixin(permissionMixin);

app.use(router);
app.mount('#app');
