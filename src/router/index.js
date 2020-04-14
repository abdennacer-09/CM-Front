import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import patient from '../components/patient.vue'
import accueil from '../components/accueil.vue'
import rendezVous from '../components/rendezVous.vue'
import listConsultation from '../components/listConsultation.vue'
import consultation from '../components/consultation.vue'
import login from '../components/login.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'accueil',
    component: accueil,
    //redirect:{path: "login"}
  },
  {
    path: '/login',
    name: 'login',
    component: login

  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/patient',
    name: 'patient',
    component: patient
  },
  {
    path: '/rendezVous',
    name: 'rendezVous',
    component: rendezVous
  },
  {
    path: '/listConsultation',
    name: 'listConsultation',
    component: listConsultation
  },
  {
    path: '/consultation',
    name: 'consultation',
    component: consultation
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
