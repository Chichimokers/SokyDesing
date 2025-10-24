import type {RouteRecordRaw} from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import {RouteNames} from "@/router/names";
import Profile from "@/views/Profile.vue";

const routes: RouteRecordRaw = {
    path: '/profile',
    component: MainLayout,
    children: [
        {
            path: '',
            name: RouteNames.PROFILE,
            component: Profile
        },
        {
            path: 'edit',
            name: RouteNames.EDIT_PROFILE,
            component: () => import('@/views/EditProfile.vue'),
        },
        {
            path: 'change-password',
            name: RouteNames.CHANGE_PASSWORD,
            component: () => import('@/views/ChangePassword.vue'),
        },

    ]
}

export default routes;