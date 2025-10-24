import type {RouteRecordRaw} from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import {RouteNames} from "@/router/names";
import Subscriptions from "@/views/Subscriptions.vue";
import ManageSubscription from "@/views/ManageSubscription.vue";

const routes: RouteRecordRaw = {
    path: '/subscription',
    component: MainLayout,
    children: [
        {
            path: '',
            name: RouteNames.SUBSCRIPTIONS,
            component: Subscriptions
        },
        {
            path: ':id',
            name: RouteNames.MANAGE_SUBSCRIPTION,
            component: ManageSubscription
        },
        {
            path: 'form/:planId',
            name: RouteNames.SUBSCRIPTION_FORM,
            component: () => import('@/views/SubscriptionForm.vue')
        },
    ]
}

export default routes;