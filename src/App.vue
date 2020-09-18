<template>
  <div  id="app" class="page home-page">
    <sidebar v-if="isLoggedIn"  />
    <login v-if="!isLoggedIn"  />
    <!--<cont />-->
  </div>
</template>

<script>

//var url ='localhost:5000';var url ='localhost:5000'

import login from '@/components/login';
import sidebar from '@/components/sidebar';
//import errors from '@/components/errors';
//import cont from '@/components/cont';

import { mapGetters } from "vuex";
export default {
  name: 'App',
  data:function(){
      return{
          
      }
  },

  mounted(){
        this.$store.dispatch('loadConsultations');
        /*Api2().get('/consultations').then((response)=>{
            this.consultations = response.data;
        })*/
    },

  methods:{
    
    },
  components:{
    sidebar,
    login,
  },
  computed:{
        ...mapGetters(['isLoggedIn']),
       /* UserLog(){
            return this.$store.getUser.UserLog;
        }*/

        /*...mapGetters({
  exampleGetter: 'myModule1/exampleGetter',
  anotherGetter: 'myModule2/anotherGetter',
})*/
    }
  }

  
</script>

<style scoped>

.page{
  min-height: 100vh;
}



</style>
