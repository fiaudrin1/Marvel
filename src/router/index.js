import { createRouter, createWebHistory } from 'vue-router'
import Explorer from '../views/Explorer.vue'

const routes = [
  {
    path: '/',
    name: 'Explorer',
    component: Explorer
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
