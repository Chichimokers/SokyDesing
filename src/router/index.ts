import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Recargas from '@/views/Recargas.vue'
import MultipleRecharge from '@/views/MultipleRecharge.vue'
import Profile from '@/views/Profile.vue'
import Balance from '@/views/Balance.vue'
import Subscriptions from '@/views/Subscriptions.vue'

import Code from '@/views/Code.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/recargas', name: 'Recargas', component: Recargas },
    { path: '/multiple-recharge/:phoneNumbers/:offer', name: 'MultipleRecharge', component: MultipleRecharge },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/balance', name: 'Balance', component: Balance },
    { path: '/subscription', name: 'Subscriptions', component: Subscriptions },
    { path: '/code', name: 'Code', component: Code },
    { path: '/register', name: 'Register', component: Register },
  ],
})

export default router