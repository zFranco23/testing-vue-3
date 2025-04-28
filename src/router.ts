import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Users from './views/Users.vue'
import UserDetail from './views/UserDetail.vue'
import Counter from './views/Counter.vue'



export const routes = [
  { path: '/', component: Home },
  { path: '/users', component: Users }, 
  { path: '/users/:id', component: UserDetail }, 
  { path: '/counter', component: Counter },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})