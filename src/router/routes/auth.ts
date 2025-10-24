import type {RouteRecordRaw} from "vue-router";
import {RouteNames} from "@/router/names";
import AuthLayout from "@/layouts/AuthLayout.vue";
import Code from "@/views/Code.vue";

const routes: RouteRecordRaw = {
    path: '/auth',
    component: AuthLayout,
    children: [
        {
            path: '/login',
            name: RouteNames.LOGIN,
            component: () => import('@/views/Login.vue'),
        },
        {
            path: '/register',
            name: RouteNames.REGISTER,
            component: () => import('@/views/Register.vue'),
        },
        {
            path: 'forgot-password',
            name: RouteNames.FORGOT_PASSWORD,
            component: () => import('@/views/ForgotPassword.vue'),
        },
        {
            path: 'code',
            name: RouteNames.CODE,
            component: Code
        },
    ],
};

export default routes;