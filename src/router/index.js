import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import LoginView from '../views/LoginView.vue';




const routes = [
  
  { path: '/login', component: LoginView },
  
  

  
  
  

  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('../views/Portfolio.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router