
import {createRouter, createWebHistory} from "vue-router";

import Cookie from 'js-cookie'

const getToken = () => {
    return Cookie.get('token')
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('/src/views/home/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('/src/views/auth/register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('/src/views/auth/login.vue')
    },
    {
        path: '/admin/dashboard',
        name: 'dashboard',
        component: () => import('/src/views/admin/dashboard/admin.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/users',
        name: 'admin.users',
        component: () => import('/src/views/admin/users/user.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/users/create',
        name: 'admin.users.create',
        component: () => import('/src/views/admin/users/create.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/users/:id',
        name: 'admin.users.edit',
        component: () => import('/src/views/admin/users/edit.vue'),
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    // Ambil token otentikasi pengguna
    const token = getToken();

    // Jika rute tujuan membutuhkan otentikasi dan pengguna tidak memiliki token
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        next({ name: 'login' });
    }
    // Jika rute tujuan adalah halaman login atau register dan pengguna sudah login
    else if ((to.name === 'login' || to.name === 'register') && token) {
        next({ name: 'dashboard' });
    }

    else {
        next();
    }
});


export default router;