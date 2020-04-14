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
                        <a href="/consultation" class="btn btn-primary"><i class="fas fa-plus"></i>  Ajouter consultation</a>
                    </div>
                </div>
                
                <div class="card-body">
                    
                    <div class="table-responsive">
                        <table class="main-table text-center table table-bordered">
                            <tr>
                                <th>Patient</th>
                                <th>Date</th>                           
                                <th>Control</th>
                            </tr>
                            <tr v-bind:key="consult._id" v-for="consult in consultations">
                                <td>{{consult.patient.nom}}</td>
                                <td>{{consult.date | myDate}}</td>
                                <td>
                                    <a href="#"></a><i class="fas fa-edit"></i>&nbsp; 
                                    <a @click="deleteConsultation(consult._id)" href="/listConsultation"><i class="fas fa-trash-alt"></i></a>&nbsp;
                                    <a href="#"><i class="fas fa-eye"></i></a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
        
</template>

<script>

import axios from 'axios';

export default {
    name: 'listConsultation',
    components:{
        
    },
    data(){
        return{
            consultations:[],
            patients:[],
            myConsultation:null,
            idCons: ''
        };
    },
    methods:{
        
    /* getLastConsultation(){
            var lastPosition = this.consulations.length -1;
                    this.idCons = this.consulations[lastPosition]._id;
                    console.log(this.idCons);
        },*/
        getConsultations(){
                axios.get('http://localhost:5000/consultations')
                .then(res => this.consultations = res.data)
                .catch(err => console.log(err));
                
                /*var lastPosition = this.consultations.length -1;

                    this.idCons = this.consultations[lastPosition];
                    console.log(this.idCons);*/

        },
        getPatients(){
            

                axios.get('http://localhost:5000/patients/5e7ea5dc77d5da3de8d5a9f5')
                .then(res => this.patients = res.data)
                .catch(err => console.log(err));

        },
        deleteConsultation(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){
                axios.delete(`http://localhost:5000/consultations/5e7ea5dc77d5da3de8d5a9f5/deleteConsultation/${_id}`)
                .then( () =>{
                    this.consultations = this.consultations.filter(consult => consult._id !== _id);
                })
            }
        },
        /*editPatient(consult){
            this.myConsultation = consult;
            this.nom = patient.nom;
            this.prenom = patient.prenom;
        },*/
    },
    created(){
        this.getConsultations();
        this.getPatients();
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

</style>