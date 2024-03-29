import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import CategoriaPage from '../views/CategoriaPage.vue'
import EstacionamentoPage from '../views/EstacionamentoPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: CategoriaPage
  },
  {
    path: '/estacionamento',
    name: 'Estacionamento',
    component: EstacionamentoPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
