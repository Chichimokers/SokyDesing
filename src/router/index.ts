import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Recargas from '@/views/Recargas.vue'
import MultipleRecharge from '@/views/MultipleRecharge.vue'
import Profile from '@/views/Profile.vue'
import Balance from '@/views/Balance.vue'
import Subscriptions from '@/views/Subscriptions.vue'
import ManageSubscription from '@/views/ManageSubscription.vue'

import Code from '@/views/Code.vue'
import Register from '@/views/Register.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import EditProfile from '@/views/EditProfile.vue'
import Retail from '@/views/Retail.vue'
import SubscriptionForm from '@/views/SubscriptionForm.vue'
import RetailApplication from '@/views/RetailApplication.vue'
import Cubacel from '@/views/Cubacel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/recargas', name: 'Recargas', component: Recargas },
    { path: '/multiple-recharge/:phoneNumbers/:offer', name: 'MultipleRecharge', component: MultipleRecharge },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/profile/edit', name: 'EditProfile', component: EditProfile },
    { path: '/profile/change-password', name: 'ChangePassword', component: ChangePassword },
    { path: '/balance', name: 'Balance', component: Balance },
    { path: '/subscription', name: 'Subscriptions', component: Subscriptions },
     { path: '/subscriptions', name: 'Subscriptionss', component: Subscriptions },
    { path: '/subscription/manage/:id', name: 'ManageSubscription', component: ManageSubscription },
    { path: '/code', name: 'Code', component: Code },
    { path: '/register', name: 'Register', component: Register },
    { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword },
    { path: '/retail', name: 'Retail', component: Retail },
    { path: '/subscription-form/:planId', name: 'SubscriptionForm', component: SubscriptionForm },
    { path: '/retail-application', name: 'RetailApplication', component: RetailApplication },
    { path: '/cubacel', name: 'Cubacel', component: Cubacel },
  ],
})

export default router