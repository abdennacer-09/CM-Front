import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import cont from './components/cont.vue';
import axios from 'axios';
import moment from 'moment';
import VueProgressBar from 'vue-progressbar'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./js/jquery-3.4.1.min.js";

import "./scss/login.css";
import "./scss/consult.css";
import "./scss/consultation.css";
import "./scss/patient.css";
import "./scss/style.css";
import "./scss/fontawesome.min.css";
import "./scss/all.min.css";
import 'vue-datetime/dist/vue-datetime.css'

Vue.component('app-cont', cont);

Vue.config.productionTip = false;

//load the token from the localStorage
Vue.prototype.$http = axios;
const token = localStorage.getItem("token");

if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

/*Vue.filter('upText', function(text){
  return text.charAt(0).toUpperCase() + text.slice(1)
});*/

Vue.filter('myDate', function(created){
  return moment(created).format('DD/MM/YYYY');
});

Vue.filter('myDateTime', function(created){
  return moment(created).format('DD/MM/YYYY HH:mm:ss');
});

Vue.use(require('vue-moment'));

window.Fire = new Vue();

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
});

new Vue({
  router,
  store,
  
  render: h => h(App)
}).$mount('#app');
