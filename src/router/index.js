import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/auth',
        name: 'auth',
        redirect: '/auth/login',
        component: () => import('../layouts/Auth.vue'),
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('../views/auth/Login.vue')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('../views/auth/Register')
            },
            {
                path: 'forgot',
                name: 'forgot',
                component: () => import('../views/auth/Forgot.vue')
            },
            {
                path: 'reset/:uuid',
                name: 'reset',
                component: () => import('../views/auth/Reset.vue')
            },
            {
                path: 'logout',
                name: 'logout',
                component: () => import('../views/auth/Logout.vue')
            },
        ]
    },
    {
        path: '/user',
        name: 'user',
        redirect: '/user/dashboard',
        component: () => import('../layouts/Dashboard.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('../views/user/Dashboard.vue')
            },
            {
                path: 'shared',
                name: 'shared',
                component: () => import('../views/user/Shared.vue')
            },
            {
                path: 'collection',
                name: 'collection',
                component: () => import('../views/user/Collection.vue')
            },
            {
                path: 'secret',
                name: 'secret',
                component: () => import('../views/user/Secret.vue')
            },
            {
                path: 'account',
                name: 'account',
                component: () => import('../views/user/Account.vue')
            },
            // {
            //     path: 'info/:username',
            //     name:'user_info',
            //     redirect: '/user/account',
            //     component: () => import('../views/user/UserInfo.vue')
            // }
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/dashboard',
        component: () => import('../layouts/Admin.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'admin-dashboard',
                component: () => import('../views/admin/Dashboard.vue')
            },
            {
                path: 'user',
                name: 'admin-user',
                component: () => import('../views/admin/UserManager.vue')
            },
            {
                path: 'app',
                name: 'admin-app',
                component: () => import('../views/admin/AppManager.vue')
            },
            {
                path: 'cluster',
                name: 'admin-cluster',
                component: () => import('../views/admin/ClusterManager.vue')
            },
            {
                path: 'role',
                name: 'admin-role',
                component: () => import('../views/admin/RoleManager.vue')
            }
        ]
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('../views/Error.vue')
    },
    {
        name: 'share-list',
        path: '/share/:key',
        component: () => import('../views/Share')
    },
    {
        name: 'admin-auth',
        path: '/admin/auth',
        component: () => import('../views/admin/Auth.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
