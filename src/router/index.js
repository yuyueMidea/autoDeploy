import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Layout from '@/components/Layout.vue'
import { logToLocalStorage } from '../utils/log';
import { useAppStore } from '../store/useCommonStore';

const routeList = [
    {path: '/', name: '首页', component: () => import('@/components/Home.vue')},
    {path: '/login', name: '登录', component: () => import('@/components/LoginPage.vue')},
    {path: '/about', name: '关于', component: () => import('@/components/About.vue')},
    {path: '/cryptoPage', name: '数据加密', component: () => import('@/components/CryptoPage.vue')},
    {path: '/contract', name: '联系我们', component: () => import('@/components/Contract.vue')},
    {path: '/formDesigner', name: '表单设计器', component: () => import('@/components/FormDesigner.vue')},
    {path: '/projectList', name: '项目列表', component: () => import('@/components/ProjectList.vue')},
    {path: '/projectDetail/:id', name: '项目详情', component: () => import('@/components/ProjectDetail.vue'), props:true, hide:true },
    {path: '/calculation', name: 'worker计算', component:  () => import('@/components/CalculationView.vue') },
    {path: '/webSocketPage', name: 'WebSocket连接', component:  () => import('@/components/WebSocketPage.vue') },
    {path: '/workflowView', name: '工作流', component:  () => import('@/components/WorkflowView.vue') },
    {path: '/BpmnContainerView', name: '工作流2', component:  () => import('@/components/BpmnContainerView.vue') },
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/components/NotFound.vue'), hide: true,}
];

const router = createRouter(
    {
        // history: createWebHistory(),
        // history: createWebHashHistory('/autoDeploy/'),  // 使用 hash 模式
        history: createWebHashHistory(import.meta.env.BASE_URL), // 使用环境变量
        routes: [
            {
                path: '/',
                props: { 
                    routeList
                },
                component: Layout,
                children: routeList
            }
            // { path: '/', name:'home', component: () => import('@/components/Home.vue')},
            // { path: '/eggs/:eggType', name: 'eggs', component: () => import('../components/Contact.vue') },
            // { path: '/eggs', redirect: '/eggs/chicken-egg' },
            // { path: '/:pathMatch(.*)*', component: () => import('../components/NotFound.vue') }
        ]
    }
);

// 路由导航追踪

router.afterEach((to, from) => {
    const app1store = useAppStore();
    app1store.setMenuName(to.name)
    if(app1store.logRouterFlag) {
        logToLocalStorage({
            from: from.fullPath,
            to: to.fullPath,
            routeName: to.name || 'unnamed',
            timestamp: new Date().toISOString(),
        })
    }
})

export default router