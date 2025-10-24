import type {RouteRecordRaw} from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import {RouteNames} from "@/router/names";
import Balance from "@/views/Balance.vue";

const routes: RouteRecordRaw = {
    path: '/mix',
    component: MainLayout,
    children: [
        {
            path: '/balance',
            name: RouteNames.BALANCE,
            component: Balance
        },
        {
            path: '/cubacel',
            name: RouteNames.CUBACEL,
            component: () => import('@/views/Cubacel.vue')
        },
        {
            path: '/retail',
            name: RouteNames.RETAIL,
            component: ()=>import('@/views/Retail.vue')
        },
        {
            path: '/retail-application',
            name: RouteNames.RETAIL_APPLICATION,
            component: ()=>import('@/views/RetailApplication.vue')
        },

    ]
}

export default routes;