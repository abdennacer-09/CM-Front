<template>
    <div class="main-patient">
        
        <div class="container pat">
            <div class="card-title titleListPatient">
                <i class="fas fa-tasks"></i>&nbsp;
                <span><h5>Gestion des patients</h5></span>
            </div>
            <div class="card">
                <div class="card-title">
                    <i class="fas fa-table"></i><span> Liste des patients</span> 
                    <div class="card-tools">
                        <button class="btn btn-primary" data-toggle="modal" @click.prevent="btnAjouterPatient()" data-target="#addNew"><i class="fas fa-plus"></i>  Ajouter patient</button>
                    </div>
                </div>
                
                <div class="card-body">
                    <!--<Datatable/>-->
                    <div class="divSearch">
                        <input v-model="search" class="form-control" type="text" placeholder="Search" aria-label="Search">
                    </div>
                    <div class="table-responsive">
                        <table class="main-table text-center table table-bordered">
                            <tr>
                                <th>CIN</th>
                                <th>Prenom</th>
                                <th>Nom</th>
                                <th>Sexe</th>
                                <th>Tel</th>
                                <th>Adresse</th>
                                <th>Date Naissance</th>
                                <th>age</th>
                                <th>Situation familiale</th>
                                <th>profession</th>
                                <th>Mituelle</th>
                                <th>Control</th>
                            </tr>
                            <tr v-bind:key="patient._id" v-for="patient in filteredPatients">
                                <td>{{patient.cin }}</td>
                                <td>{{patient.prenom }}</td>
                                <td>{{patient.nom }}</td>
                                <td>{{patient.sexe}}</td>
                                <td>{{patient.tel}}</td>
                                <td>{{patient.adresse }}</td>
                                <td>{{patient.dateNaissance | myDate}}</td>
                                <td>{{patient.age}}</td>
                                <td>{{patient.sitFam }}</td>
                                <td>{{patient.profession }}</td>
                                <td>{{patient.mituelle }}</td>
                                <td>
                                    <a href="#" data-toggle="modal" data-target="#addNew" @click="editPatient(patient)"><i class="fas fa-edit"></i></a>
                                    &nbsp;
                                    <a href="/patient" @click="deletePatient(patient._id)"> <i class="fas fa-trash-alt"></i></a>
                                </td>
                            </tr>
                            
                        </table>
                    </div>
                </div>
            </div>

            <!--    ******  Testing DataTable ******  -->

            <!-- <div class="projects">
                <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders"></datatable>
                <pagination></pagination>
            </div>-->
            
        </div>

        <!-- Modal New Record-->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-if="myPatient" class="modal-title" id="addNewLabel">Modifier le patient</h5>
                        <h5 v-else class="modal-title" id="addNewLabel">Nouveau patient</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="/patient" method="post">
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">CIN:</label>
                                <div class="col-sm-10">
                                <input v-model="cin" type="text" class="form-control" id="inputEmail3">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="nom" class="col-sm-2 col-form-label">Nom:</label>
                                <div class="col-sm-10">
                                <input v-model="nom" type="text" class="form-control" id="nom">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="prenom" class="col-sm-2 col-form-label">Prenom:</label>
                                <div class="col-sm-10">
                                <input v-model="prenom" type="text" class="form-control" id="prenom">
                                </div>
                            </div>
                            <div class="sx form-group row">
                                <label for="sexe" class="col-sm-2 col-form-label">Sexe:</label>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input v-model="sexe" type="radio" value="Homme" id="homme" name="sexe" class="custom-control-input">
                                    <label class="custom-control-label" for="homme">Homme</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input v-model="sexe" type="radio" value="Femme" id="femme" name="sexe" class="custom-control-input">
                                    <label class="custom-control-label" for="femme">Femme</label>
                                </div>
                            </div>
                            
                            <div v-if="myPatient" class="form-group row">
                                <label for="dateNaissance" class="col-sm-2 col-form-label">Date Naissance:</label>
                                <div class="col-sm-10">
                                <input v-model="dateNaissance" type="text" class="form-control" id="dateNaissance" >
                                </div>
                            </div>

                            <div v-else class="form-group row">
                                <label for="dateNaissance" class="col-sm-2 col-form-label">Date Naissance:</label>
                                <div class="col-sm-10">
                                <input v-model="dateNaissance" type="date" class="form-control" id="dateNaissance" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="age" class="col-sm-2 col-form-label">Age:</label>
                                <div class="col-sm-10">
                                <input v-model="age" type="text" class="form-control" id="age">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="tele" class="col-sm-2 col-form-label">Telephone:</label>
                                <div class="col-sm-10">
                                <input v-model="tel" type="text" class="form-control" id="tele" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label" for="SituationFam">Situation familiale </label>
                                <div class="col-sm-10">
                                    <select v-model="sitFam" class="form-control" id="SituationFam">
                                        <option value="" disabled selected>Sélectionnez la situation familiale</option>
                                        <option>marie(e)</option>
                                        <option>célibataire</option>
                                        <option>divorce(e)</option>
                                        <option>veuf</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mt form-group row">
                                <label for="profession" class="col-sm-2 col-form-label">Profession:</label>
                                <div class="col-sm-10">
                                    <input  v-model="profession" type="text" class="form-control" id="profession">
                                </div>
                            </div>

                            <div class="mt form-group row">
                                <label for="mituelle" class="col-sm-2 col-form-label">Mituelle:</label>
                                <div class="col-sm-10">
                                    <input v-model="mituelle" type="text" class="form-control" id="mituelle">
                                </div>
                            </div>

                            <div>

                            </div>

                            <div class="form-group row">
                                <label for="adresse" class="col-sm-2 col-form-label">Adresse:</label>
                                <div class="col-sm-10">
                                    <textarea v-model="adresse" class="form-control" id="adresse"  rows="3"></textarea>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                        <!--<button @click="addPatient()" type="button" class="btn btn-success">Enregistrer</button>-->
                        <input v-if="myPatient" type="submit" @click.prevent="updatePatient()" class="btn btn-success" value="Modifier">
                        <input v-else type="submit" @click.prevent="addPatient()" class="btn btn-success" value="Enregistrer">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
//import sidebar from '@/components/sidebar';
import axios from 'axios';
import $ from 'jquery';
//import Datatable from './Datatable.vue';
//import Pagination from './Pagination.vue';
//import pat from './pat.vue';
export default {
    name: 'patient',
    data(){
        return{
            nom: '',
            prenom: '',
            cin: '',
            profession: '',
            tel:'',
            age: '',
            sitFam: '',
            dateNaissance: '',
            mituelle: '',
            adresse: '',
            sexe: 'Homme',
            patients:[],
            search:'',
            myPatient: null
        }
    },
    components:{
        //Datatable,
        //pat
    },
    methods:{
        btnAjouterPatient(){
            this.myPatient = null;
            this.nom = ''; this.mituelle = ''; this.adresse = ''; this.prenom = '';
                this.profession = ''; this.tel=''; this.age = ''; this.dateNaissance = '';
                this.cin = '';
        },
        addPatient(){
            //e.preventDefault();
            
            this.$Progress.start();
            let newPatient = {
                nom: this.nom,
                prenom: this.prenom,
                cin: this.cin,
                sexe: this.sexe,
                mituelle : this.mituelle,
                adresse : this.adresse,
                profession : this.profession,
                tel : this.tel,
                age: this.age,
                sitFam : this.sitFam,
                dateNaissance : this.dateNaissance
            }
            if(this.nom !== '' || this.prenom !== ''   
            || this.cin !== '' || this.cin == '' || this.mituelle!=='' ||  
            this.adresse !== '' || this.profession !== '' ||  
            this.tel !== '' || this.age !== '' ||  
            this.sitFam !== '' || this.dateNaissance !== '' ){
                axios.post('http://localhost:5000/patients/5e7ea5dc77d5da3de8d5a9f5/addPatient', newPatient)
                .then(res => {
                    this.patients = [res.data, ...this.patients];
                this.nom = ''; this.mituelle = ''; this.adresse = ''; this.prenom = '';
                this.cin = '';
                this.profession = ''; this.tel=''; this.age = ''; this.dateNaissance = '';
                //Fire.$emit('AfterCreate');
                $('#addNew').modal('hide');
               // location.reload(true);
                });

            }

            this.$Progress.finish();
            
        },
        
        getPatients(){
            

                axios.get('http://localhost:5000/patients/5e7ea5dc77d5da3de8d5a9f5')
                .then(res => this.patients = res.data)
                .catch(err => console.log(err));

        },
        deletePatient(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){
                    axios.all([axios.delete(`http://localhost:5000/patients/5e7ea5dc77d5da3de8d5a9f5/deleteRdvPat/${_id}`),
                    axios.delete(`http://localhost:5000/patients/5e7ea5dc77d5da3de8d5a9f5/deleteConsPat/${_id}`),
                    axios.delete(`http://localhost:5000/patients/5e7ea5dc77d5da3de8d5a9f5/deletePatient/${_id}`)             
                ])
                //axios.delete(`http://localhost:5000/patients/5e7ea5dc77d5da3de8d5a9f5/deletePatient/${_id}`)
                .then( () =>{
                    this.patients = this.patients.filter(patient => patient._id !== _id);
                })
            }
        },
        editPatient(patient){
            this.myPatient = patient;
            this.nom = patient.nom;
            this.prenom = patient.prenom;
            this.cin = patient.cin;
            this.profession = patient.profession;
            this.tel = patient.tel;
            this.age = patient.age;
            this.sitFam = patient.sitFam;
            this.dateNaissance = patient.dateNaissance;
            this.mituelle = patient.mituelle;
            this.adresse = patient.adresse;
            this.sexe = patient.sexe;
        },
        updatePatient(){
            let Pat = {
                ...this.myPatient,
                nom: this.nom,
                prenom: this.prenom,
                cin: this.cin,
                sexe: this.sexe,
                mituelle : this.mituelle,
                adresse : this.adresse,
                profession : this.profession,
                tel : this.tel,
                age: this.age,
                sitFam : this.sitFam,
                dateNaissance : this.dateNaissance
            }
            var CaractersLength = "HH",
                i= 0;
            axios.put('http://localhost:5000/patients/5e7ea5dc77d5da3de8d5a9f5/updatePatient/'+Pat._id, Pat)
                .then(res => {
                    this.patients = this.patients.map(p => {
                        if(res.data._id === p._id){
                            return res.data
                        }
                        return p;
                    });
                    
                });

                $('#addNew').modal('hide');
                var typeInter = setInterval( () => {
                    this.getPatients();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);
        }
    },
    created(){
        this.getPatients();
        //setInterval( () => this.getPatients(), 2000);
    },
    computed: {
        
        filteredPatients: function(){
            //var moment = require('moment');
            return this.patients.filter((patient) => {
                return patient.nom.toLowerCase().includes(this.search.toLowerCase()) || 
                patient.prenom.toLowerCase().includes(this.search.toLowerCase()) || 
                patient.cin.toLowerCase().includes(this.search.toLowerCase()) ||  
                patient.profession.toLowerCase().includes(this.search.toLowerCase()) ||  
                patient.sitFam.toLowerCase().includes(this.search.toLowerCase()) || 
                patient.adresse.toLowerCase().includes(this.search.toLowerCase()) ||
                patient.sexe.toLowerCase().includes(this.search.toLowerCase()) || 
                patient.mituelle.toLowerCase().includes(this.search.toLowerCase()) || 
                parseInt(patient.age) === parseInt(this.search) || 
                patient.tel.match(this.search); 
            });
        }
    }
}
</script>

<style>

    .projects h1{
        text-align: center;
        font-size: 50px;
    }

    .main-patient .titleListPatient{
    background-color: #0984e3;
    color: #FFF;
    padding: 10px;
    margin-top: 15px;
    border-radius: 10px;
}

.page .main-patient .titleListPatient span{
    display: inline-block;
}


</style>