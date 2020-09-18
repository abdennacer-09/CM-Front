<template>
    <div class="main-cons">
        <div class="container cons">
            <div class="card-title titleListCons">
                <i class="fas fa-tasks"></i>&nbsp;
                <span><h5>Liste des consultations</h5></span>
            </div>
            <div class="card">
                <div class="card-title">
                    <i class="fas fa-table"></i><span> Liste des consultation</span> 
                    <div class="card-tools">
                        <!--<a href="/consultation" class="btn btn-primary"><i class="fas fa-plus"></i>  Ajouter consultation</a>-->
                        <router-link class="btn btn-primary" to="/consultation" ><i class="fas fa-plus"></i>  Ajouter consultation</router-link>
                        
                    </div>
                </div>
                
                <div class="card-body row">
                    <div class="divSearch col-md-12">
                        <input v-model="search" class="form-control" type="text" placeholder="Search" aria-label="Search">
                    </div>
                    
                    <div class="table-responsive">
                        <table class="main-table text-center table table-bordered">
                            <tr>
                                <th>Patient</th>
                                <th>Date</th>
                                <!--<th>ID</th>  -->
                                <!--<th>Patient</th>  -->                    
                                <th>Control</th>
                            </tr>
                            <tr v-bind:key="consult._id" v-for="consult in /*consultations*/ filteredConsultation">
                                <td>{{consult.patient.nom}}</td>
                                <td>{{consult.date | myDate}}</td>
                                <!--<td>{{consult._id}}</td>-->
                                <!--<td>{{consult.patient}}</td>-->
                                <td>
                                    <!--<a href="#"></a><i class="fas fa-edit"></i>&nbsp; -->
                                    <router-link class="fas fa-edit" :to="{ name :'consultation_edit' , params:{_id : consult._id} }" ></router-link>
                                    <a style="cursor: pointer" @click="deleteConsultation(consult._id)" href="/listConsultation"><i class="fas fa-trash-alt"></i></a>&nbsp;
                                    <!--<a href="#"><i class="fas fa-eye"></i></a>-->
                                    <router-link class="fas fa-eye" :to="{ name :'consultation-watch' , params:{_id : consult._id} }" ></router-link>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="btn-group col-md-2 offset-md-5">
                        <button 
                            v-if="page != 1"
                            type="button" 
                            @click="page--"
                            class="btn btn-sm btn-outline-secondary"> 
                                Précédent
                        </button>
                        <button 
                            type="button"
                            v-for="pageNumber in pages.slice(page-1, page+6)"
                            :key="pageNumber"
                            @click="page = pageNumber"
                            class="btn btn-sm btn-outline-secondary">
                                {{pageNumber}}
                        </button>

                        <button
                            v-if="page < pages.length"
                            type="button" 
                            @click="page++"
                            class="btn btn-sm btn-outline-secondary">
                                Suivant
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
        
</template>

<script> 

import axios from 'axios';
//import Api2 from '../services/Api2'
import { mapState } from 'vuex';

var url ='localhost:5000'
//var url ='backend.storeino.info'

export default {
    name: 'listConsultation',
    components:{
        
    },
    data(){
        return{
            //consultations:[],
            //consultations : [],//this.$store.state.consultations,
            patients:[],
            myConsultation:null,
            idCons: '',
            search: '',
            page:1,
            perPage:10,
            pages:[]
        };
    },
    
    computed:{
        ...mapState(['consultations']),
        /*consultations(){
            return this.$store.state.consultations
        },*/
        filteredConsultation: function(){
            return this.paginate(this.consultations).filter((consult) => {
                return consult.patient.nom.toLowerCase().includes(this.search.toLowerCase()) || 
                String(consult.date).toLowerCase().includes(this.search.toLowerCase())
            });
        }
    },
    watch:{
        consultations(){
            this.setConsultations();
        }
    },
    methods:{
        paginate(consultations){
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return consultations.slice(from, to)
        },
        setConsultations(){
            let numberOfPages = Math.ceil(this.consultations.length / this.perPage);
            for(let i = 1; i <= numberOfPages; i++){
                this.pages.push(i);
            }
        },
        
        /*getConsultations(){
                axios.get('http://'+url+'/consultations')
                .then(res => this.consultations = res.data)
                .catch(err => console.log(err));

        },*/
        getPatients(){
                axios.get('http://'+url+'/patients/')
                .then(res => this.patients = res.data)
                .catch(err => console.log(err)); 
        },
        deleteConsultation(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){
                axios.delete(`http://`+url+`/consultations/deleteConsultation/${_id}`)
                .then( () =>{
                    this.consultations = this.consultations.filter(consult => consult._id !== _id);
                })
            }
        },

        /*deleteConsultation(consult){
            thid.$store.dispatch('deleteConsultation', consult)
        }*/
        
    },
    created(){
        //this.getConsultations();
        //this.getPatients();
        //setInterval( () => this.getPatients(), 2000);
    },

}
</script>

<style>

.main-cons .titleListCons{
    background-color: #0984e3;
    color: #FFF;
    padding: 10px;
    margin-top: 15px;
    border-radius: 10px;
}

.page .main-cons .titleListCons span{
    display: inline-block;
}

.page .main-cons .divSearch{
    margin-bottom: 10px;
}

</style>