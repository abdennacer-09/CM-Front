import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import patient from '../components/patient.vue'
import accueil from '../components/accueil.vue'
import rendezVous from '../components/rendezVous.vue'
import listConsultation from '../components/listConsultation.vue'
import consultation from '../components/consultation.vue'
import parametrages from '../components/parametrages.vue'
import utilisateurs from '../components/utilisateurs.vue'
import profile from '../components/profile.vue'
import UserList from '../components/UserList'
import certificats from '../components/certificats.vue'
import ConsultationWatch from '../components/ConsultationWatch.vue'
import ConsultationEdit from '../components/ConsultationEdit.vue'
import PatientWatch from '../components/PatientWatch.vue'


//import store from '../store/store';

Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    name: 'accueil',
    component: accueil,
    meta:{
      requiresAuth: true
    }
  },
    //redirect:{path: "login"}
  
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
    component: patient,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/rendezVous',
    name: 'rendezVous',
    component: rendezVous,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/listConsultation',
    name: 'listConsultation',
    component: listConsultation,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/listConsultation/:_id/edit',
    name: 'consultation_edit',
    component: ConsultationEdit,
    params: true,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/consultation',
    name: 'consultation',
    component: consultation,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/SpesificConsultation/:_id',
    name: 'consultation-watch',
    component: ConsultationWatch,
    params : true,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/FichePatient/:_id',
    name: 'patient-watch',
    component: PatientWatch,
    params : true,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/certificats',
    name: 'certificats',
    component: certificats,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/UserList',
    name: 'UserList',
    component: UserList,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/parametrages',
    name: 'parametrages',
    component: parametrages,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/utilisateurs',
    name: 'utilisateurs',
    component: utilisateurs,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile,
    meta:{
      requiresAuth: true
    }
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
/*
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters.isLggedIn){
      next('/login');
    }else{
      next();
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)){
    if(store.getters.isLggedIn){
      next('/');
    }else{
      next();
    }
  }
  else{
    next();
  }
})
*/

export default router
