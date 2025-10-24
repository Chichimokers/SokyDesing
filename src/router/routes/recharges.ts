import type {RouteRecordRaw} from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import {RouteNames} from "@/router/names";
import Home from "@/views/Home.vue";
import Recargas from "@/views/Recargas.vue";
import MultipleRecharge from "@/views/MultipleRecharge.vue";

const routes: RouteRecordRaw = {
    path: '/',
    component: MainLayout,
    children: [
        {
            path: '',
            name: RouteNames.HOME,
            component: Home,
        },
        {
            path: '/recargas',
            name: RouteNames.RECARGAS,
            component: Recargas
        },
        {
            path: '/multiple-recharge/:phoneNumbers/:offer',
            name: RouteNames.MULTIPLE_RECHARGE,
            component: MultipleRecharge
        },


    ]
}

export default routes;