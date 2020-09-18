<template>
    <div class="container">
        <div class="inline">
            <h1>Tableau de bord</h1>
            <span class="today">La date d'aujourd'hui :  {{dateNow | myDate}}</span>
        </div>
        
        <div class=" acc text-center">
            
            <div class="row">
                <div class="col-md-3">
                    <div class="numb nm-patients">
                        <i class="fas fa-user-injured"></i>
                        <div class="info">
                            Patients
                            <span>{{countPat}}</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="numb nm-consultations">
                        <i class="fas fa-comment-medical"></i>
                        <div class="info">
                            Consulations
                            <span>{{countConsult}}</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="numb nm-cerificats">
                        <i class="fas fa-file-medical-alt"></i>
                        <div class="info">
                            Certificats
                            <span>{{countCertMdc}}</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="numb nm-Ordonances">
                        <i class="fas fa-capsules"></i>
                        <div class="info">
                            Ordonances
                            <span>{{countOrdns}}</span>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <div class="container latest">
            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-title">
                            <i class="fab fa-algolia fa-lg"></i> Les Rendez-vous d'aujourd'hui
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled latest-rdvs">
                                <!--<li v-bind:key="rdv._id" v-for="rdv in rdvs" >{{rdv.patient.nom }} {{rdv.date  | myDateTime}} <span class="fas fa-edit float-right"></span></li>-->
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-title">
                            <i class="fab fa-algolia fa-lg"></i> Les Consultaions et les controle d'aujourd'hui
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled latest-rdvs">
                                <!--<li v-bind:key="cons._id" v-for="cons in consultations" >{{cons.patient.nom }} {{cons.date | myDate}} <span class="fas fa-edit float-right"></span></li>-->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>

//var url ='backend.storeino.info'
var url ='localhost:5000'
//var ide ='5e9776cfccc2da282c7dd346'

import axios from 'axios';

export default {
    name: 'acceuil',
    data(){
        return{
            patients:'',
            countPat : 0,
            countConsult:0,
            countCertMdc : 0,
            countOrdns: 0,
            rdvs:[],
            consultations:[],
            dateNow : new Date(),//.toJSON().slice(0,10).replace(/-/g,'/'),
        }
    },
    created(){
        this.getCountPatients();
        this.getPatients();
        this.getCountConsutations();
        this.getCountCertificatMedical();
        this.getCountOrdonnance();
        this.getNowRendezVous();
        this.getNowConsultations();
        //this.countPatient();
        //setInterval( () => this.getPatients(), 2000);
    },
    methods:{
        getPatients(){
                axios.get('http://'+url+'/patients')
                .then(res => this.patients = res.data)
                .catch(err => console.log(err));
        },
        getCountPatients(){
                axios.get('http://'+url+'/patients/countPat')
                .then(res => this.countPat = res.data)
                .catch(err => console.log(err));
        },
        getCountConsutations(){
            axios.get('http://'+url+'/consultations/countCons')
                .then(res => this.countConsult = res.data)
                .catch(err => console.log(err));
        },
        getCountCertificatMedical(){
            axios.get('http://'+url+'/certificatsMedicaux/countCertMdc')
                .then(res => this.countCertMdc = res.data)
                .catch(err => console.log(err));
        },
        getCountOrdonnance(){
            axios.get('http://'+url+'/ordonnances/countOrdns')
                .then(res => this.countOrdns = res.data)
                .catch(err => console.log(err));
        },
        getNowRendezVous(){
            axios.get('http://'+url+'/rdvs/rdvAujourdui')
                .then(res => this.rdvs = res.data)
                .catch(err => console.log(err));
                //console.log(this.dateNow);
        },
        getNowConsultations(){
            axios.get('http://'+url+'/consultations/consAjourdui')
                .then(res => this.consultations = res.data)
                .catch(err => console.log(err));
                
        },
    },
    computed: {
        
        filteredRdvs: function(){
            //var moment = require('moment');

            var theDate = new Date();
            return this.rdvs.filter((rdv) => {

                    
                    return rdv.date.getDate == theDate.getDate() &&  rdv.date.getMonth() == theDate.getMonth() && 
                        
                        rdv.date.getFullYear() == theDate.getFullYear()                
            });
        }      
        
    }
    
}
</script>

<style>
/* Start Accueil Page */

    .page .inline{
        display: flex;
    }

    .page .today{
        position: absolute;
        top : 90px;
        right: 20px;
        font-weight: bold;
    }

    .page .latest .latest-rdvs{
        margin-bottom: 0;
    }

    .page .latest .latest-rdvs li{
        padding:  5px 0;
        overflow: hidden;
    }

    .page .latest .latest-rdvs li:nth-child(odd){
        background-color: #EEE;
    }

    .page .latest .latest-rdvs li .fa-edit{
        color: #2ecc71;
        cursor: pointer;
    }

    .page .acc{
        padding-top: 15px;
    }

    .page .container h1{
        padding-bottom: 10px;
        padding-top: 20px;
    }

    .page .acc .numb{
        background-color: #EEE;
        padding: 20px;
        font-size: 20px;
        color: #FFF;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
    }

    .page .acc .numb i{
        position: absolute;
        font-size: 50px;
        top: 35px;
        left: 35px;
    }

    .page .acc .numb .info{
        float: right;
        padding-right: 8px;
    }

    .page .acc .numb span{
        display: block;
        font-size: 30px;
        font-weight: bold;
    }

    .page .latest{
        margin-top: 30px;
    }

    .page .latest .card-title{
        background-color: #EEE;
        padding: 10px;
    }

    .page .acc .nm-patients{
        background-color: #c0392b;
    }
    
    .page .acc .nm-consultations{
        background-color: #2ecc71;
    }

    .page .acc .nm-cerificats{
        background-color: #3498db;
    }

    .page .acc .nm-Ordonances{
        background-color: #f1c40f;
    }
    

/* End Acceuil Page */    
</style>