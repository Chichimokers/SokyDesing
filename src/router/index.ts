import {createRouter, createWebHistory} from 'vue-router'
import AuthRoutes from './routes/auth'
import RechargeRoutes from './routes/recharges'
import SubscriptionRoutes from './routes/subscriptions'
import ProfileRoutes from './routes/profile'
import MixinRoutes from './routes/mixins'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      AuthRoutes,
      MixinRoutes,
      ProfileRoutes,
      RechargeRoutes,
      SubscriptionRoutes,
  ],
})

export default router

export {RouteNames} from './names.ts'