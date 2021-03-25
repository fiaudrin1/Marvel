import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/equipes',
    name: 'Equipes',

    component: () => import('../views/Equipes.vue')
  },
  {
    path: '/character/:id',
    name: 'character',

    component: () => import('../components/Character.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
