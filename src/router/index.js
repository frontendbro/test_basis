import Vue from 'vue'
import VueRouter from 'vue-router'
import UsersList from '../views/UsersList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'UsersList',
    component: UsersList,
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/User.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
