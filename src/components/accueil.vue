<template>
    <div class="container">
        <h1>Dashboard</h1>
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
                            Test
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-title">
                            <i class="fab fa-algolia fa-lg"></i> Les Consultaions et les controle d'aujourd'hui
                        </div>
                        <div class="card-body">
                            Test
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
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
        }
    },
    created(){
        this.getCountPatients();
        this.getPatients();
        this.getCountConsutations();
        this.getCountCertificatMedical();
        this.getCountOrdonnance();
        //this.countPatient();
        //setInterval( () => this.getPatients(), 2000);
    },
    methods:{
        getPatients(){
                axios.get('http://localhost:5000/patients/5e7ea5dc77d5da3de8d5a9f5')
                .then(res => this.patients = res.data)
                .catch(err => console.log(err));
        },
        getCountPatients(){
                axios.get('http://localhost:5000/patients/countPat/5e7ea5dc77d5da3de8d5a9f5')
                .then(res => this.countPat = res.data)
                .catch(err => console.log(err));
        },
        getCountConsutations(){
            axios.get('http://localhost:5000/consultations/countCons')
                .then(res => this.countConsult = res.data)
                .catch(err => console.log(err));
        },
        getCountCertificatMedical(){
            axios.get('http://localhost:5000/certificatsMedicaux/countCertMdc')
                .then(res => this.countCertMdc = res.data)
                .catch(err => console.log(err));
        },
        getCountOrdonnance(){
            axios.get('http://localhost:5000/ordonnances/countOrdns')
                .then(res => this.countOrdns = res.data)
                .catch(err => console.log(err));
        },
    }
}
</script>

<style>
/* Start Accueil Page */
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