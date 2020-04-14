<template>
  <div id="app" class="page home-page">
    <sidebar />
    <!--<cont />-->
  </div>
</template>

<script>

import sidebar from '@/components/sidebar';
//import cont from '@/components/cont';

export default {
  name: 'App',
  data:function(){
      return{
          
      }
  },

  methods:{
    
    },
  components:{
    sidebar,
    //cont
  },
  }

  
</script>

<style scoped>

.page{
  min-height: 100vh;
}



</style>
