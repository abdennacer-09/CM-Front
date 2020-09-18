<template>
    <div v-if="user.isAdmin == 1" class="main-patient">
        
        <div class="container pat">
            <div class="card-title titleListPatient">
                <i class="fas fa-cog fa-lg fa-fw"></i>&nbsp;
                <span><h5>Paramétrages</h5></span>
            </div>
            <div class="card">
                <div class="card-title">
                    <i class="fas fa-cog fa-lg fa-fw"></i><span> Paramétrages</span> 
                    <div class="card-tools">
                        
                    </div>
                </div>
                
                <div class="card-body">
                    <div class="param">
                        <div class="row">
                            <div class="col-md-4">
                                <a href="/utilisateurs" class="btn btn-primary"><i class="fas fa-tasks"></i>&nbsp;Utilisateurs</a>
                            </div>
                        </div>
                    </div>
                    <!--<Datatable/>--> 
                   <!-- <div class="divSearch">
                        <input v-model="search" class="form-control" type="text" placeholder="Search" aria-label="Search">
                    </div>-->
                </div>
            </div>

            <!--    ******  Testing DataTable ******  -->

            <!-- <div class="projects">
                <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders"></datatable>
                <pagination></pagination>
            </div>-->
            
        </div>

    </div>
</template>

<script>

////var url ='backend.storeino.info'
//var url ='localhost:5000'

import {  mapGetters } from 'vuex'

export default {
    name: 'parametrages',
    data(){
        return{
            
        }
    },
    computed:{
        
        ...mapGetters(['user']),
    },
}
</script>

<style scoped>

.param {
    border-style: groove;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
}

</style>