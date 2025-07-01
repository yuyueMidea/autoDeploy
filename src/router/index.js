import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/components/Layout.vue'

const routeList = [
    {path: '/', name: '首页', component: () => import('@/components/Home.vue')},
    {path: '/about', name: '关于', component: () => import('@/components/About.vue')},
    {path: '/contract', name: '联系我们', component: () => import('@/components/Contract.vue')},
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/components/NotFound.vue'),}
];

const router = createRouter(
    {
        history: createWebHashHistory('/autoDeploy/'),
        routes: [
            {
                path: '/',
                props: { 
                    title: '关于我们',
                    version: '1.0.0',
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
)

export default router
