import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import tree from '../views/tree.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tree',
    name: 'tree',
    component: tree
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
