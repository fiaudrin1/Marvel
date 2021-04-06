import { createRouter, createWebHistory } from 'vue-router'
import Explorer from '../views/Explorer.vue'

const routes = [ //instanciation de nos différentes routes
    {
        path: '/', //explorer et recherche de personnage
        name: 'Explorer',
        component: Explorer
    },
    {
        path: '/equipes', //gestion des equipes
        name: 'Equipes',
        component: () =>
            import ('../views/Equipes.vue')
    },
    {
        path: '/character/:id', //affichage des details d'un personnage
        name: 'character',
        component: () =>
            import ('../components/Character.vue')
    }
]

const router = createRouter({ //le router
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router