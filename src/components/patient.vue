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
                
                <div  class="card-body row">
                    <!--<Datatable/> v-on:keyup="searchByDate"--> 
                    <div class="divSearch col-md-12">
                        <input id="searchBar"  v-model="search" class="form-control" type="text" placeholder="Search" aria-label="Search">
                    </div>
                    <div class="table-responsive">
                        <table id="myTable" class="main-table text-center table table-bordered">
                            <tr>
                                <th>Fiche patient</th>
                                <th>Les dates des consulations</th>
                                <th>CIN</th>
                                <!--<th>Prenom</th>-->
                                <th>Nom complet</th>
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
                                <td> <router-link class="btn btn-primary" :to="{ name :'patient-watch' , params:{_id : patient._id} }" >Fiche patient</router-link></td>
                                <td>
                                    <ul v-bind:key="consult._id" v-for="consult in consultations">
                                        <li v-if="consult.patient._id == patient._id">{{consult.date | myDate}}</li>
                                    </ul>
                                </td>
                                <td>{{patient.cin }}</td>
                                <!--<td>{{patient.prenom }}</td>-->
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
                        <table id="lastPatientTable">
                                <tr v-bind:key="lsPat._id" v-for="lsPat in lastPat">
                                    <td id="tdLastIDPat">{{lsPat._id}}</td>
                                </tr>
                        </table>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div  class="mt-2 mtField">
                            <ul class="nav nav-tabs">
                                <li class="nav-item"><span class="nav-link active" @click="patientBtn" id="patientBtn">Patient</span></li>
                                <li class="nav-item"><span class="nav-link" @click="interrogatoireBtn" id="interrogatoireBtn" >Interrogatoire</span></li>
                                <li class="nav-item"><span class="nav-link" @click="antecedentBtn" id="antecedentBtn" >Antécédents</span></li>
                                <li class="nav-item"><span class="nav-link" @click="examenBtn" id="examenBtn" >Examen général</span></li>
                            </ul>
                        </div>

                        <div v-if="antecedent" class="antec mt-2 row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-title">
                                        <h5>Familiaux</h5>
                                    </div>
                                    <div class="card-body">
                                        <form>
                                            <div class="row">
                                                <div class="divInput">
                                                <input v-model="familiaux" type="text" class="form-control" placeholder="familiaux" >
                                                </div>
                                                <div class="divInput">
                                                <input v-model="rmqFam" type="text" class="form-control" placeholder="remarque" >
                                                </div>
                                                <button v-if="myFamiliaux" @click.prevent="updateFamiliaux()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                                <button v-else :disabled="!ENRG" @click.prevent="addNewFamiliaux" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                            </div>
                                        </form>
                                        <div class="table-responsive">
                                            <table class="main-table text-center table table-bordered">
                                                <tr>
                                                    <th>Familiaux</th>
                                                    <th>Remarque</th>
                                                    <th>Control</th>
                                                </tr>
                                                <tr v-bind:key="fam._id" v-for="fam in familias">
                                                    <td v-if="fam.patient == idPat || fam.patient == idPatMDF">{{fam.familiaux }}</td>
                                                    <td v-if="fam.patient == idPat || fam.patient == idPatMDF">{{fam.rmqFam }}</td>
                                                    <td v-if="fam.patient == idPat || fam.patient == idPatMDF">
                                                        <a @click.prevent="editFamiliaux(fam)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                        <a @click.prevent="deleteFamiliaux(fam._id)" href="#"><i class="fas fa-trash-alt"></i></a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-title">
                                        <h5>Médicaux</h5>
                                    </div>
                                    <div class="card-body">
                                        <form>
                                            <div class="row form-group divInputsMdc">
                                                <label for="HTA" class="col-sm-3 col-form-label">HTA</label>
                                                <div class="divEntr">
                                                    <input v-model="hta" type="text" class="form-control" id="HTA" placeholder="remarque">
                                                </div>
                                                <label  for="Diabète" class="col-sm-3 col-form-label">Diabète</label>&nbsp;
                                                <div class="divEntr">
                                                    <input v-model="diabete" type="text" class="form-control" id="Diabète" placeholder="remarque">
                                                </div>
                                                <label for="Allergie" class="col-sm-3 col-form-label">Allergie</label>
                                                <div class="divEntr">
                                                    <input v-model="allergie" type="text" class="form-control" id="Allergie" placeholder="remarque">
                                                </div>
                                                <label for="Autres" class="col-sm-3 col-form-label">Autres</label>
                                                <div class="divEntr">
                                                    <input v-model="autresMdc" type="text" class="form-control" id="Autres" placeholder="remarque">
                                                </div>
                                                <button v-if="myMedicaux" @click.prevent='updateMedicaux()'  class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                                <button v-else @click.prevent="addNewMedicaux" :disabled="!ENRG" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                            </div>
                                        </form>
                                        <div class="table-responsive">
                                            <table class="main-table text-center table table-bordered">
                                                <tr>
                                                    <th>HTA </th>
                                                    <th>Diabète</th>
                                                    <th>Allergie</th>
                                                    <th>Autres </th>
                                                    <th>Control</th>
                                                </tr>
                                                <tr v-bind:key="medic._id" v-for="medic in medicals">
                                                    <td v-if="medic.patient == idPat || medic.patient == idPatMDF">{{medic.hta}}</td>
                                                    <td v-if="medic.patient == idPat || medic.patient == idPatMDF">{{medic.diabete}}</td>
                                                    <td v-if="medic.patient == idPat || medic.patient == idPatMDF">{{medic.allergie}}</td>
                                                    <td v-if="medic.patient == idPat || medic.patient == idPatMDF">{{medic.autresMdc}}</td>
                                                    <td v-if="medic.patient == idPat || medic.patient == idPatMDF">
                                                        <a @click.prevent="editMedicaux(medic)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                        <a @click.prevent="deleteMedicaux(medic._id)" href="#"><i class="fas fa-trash-alt"></i></a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-title">
                                        <h5>Chirurgicaux</h5>
                                    </div>
                                    <div class="card-body">
                                        <form>
                                            <div class="row">
                                                <div class="divInput">
                                                    <input v-model="chirurgicaux" type="text" class="form-control" placeholder="chirurgicaux" >
                                                </div>
                                                <div class="divInput">
                                                    <input v-model="rmqChirg" type="text" class="form-control" placeholder="remarque" >
                                                </div>
                                                <button v-if="myChirurgicaux" @click.prevent="updateChirurgicaux()"   class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                                <button v-else @click.prevent="AddNewChirurgicaux" :disabled="!ENRG" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                            </div>
                                        </form>
                                        <div class="table-responsive">
                                            <table class="main-table text-center table table-bordered">
                                                <tr>
                                                    <th>Chirurgicaux</th>
                                                    <th>Remarque</th>
                                                    <th>Control</th>
                                                </tr>
                                                <tr v-bind:key="chirg._id" v-for="chirg in chirurgics">
                                                    <td v-if="chirg.patient == idPat || chirg.patient == idPatMDF">{{chirg.chirurgicaux}}</td>
                                                    <td v-if="chirg.patient == idPat || chirg.patient == idPatMDF">{{chirg.rmqChirg}}</td>
                                                    <td v-if="chirg.patient == idPat || chirg.patient == idPatMDF">
                                                        <a @click.prevent="editChirurgicaux(chirg)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                        <a @click.prevent="deleteChirurgicaux(chirg._id)" href="#"><i class="fas fa-trash-alt"></i></a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-title">
                                        <h5>Obstétricaux</h5>
                                    </div>
                                    <div class="card-body">
                                        <form>
                                            <div class="row">
                                                <div class="divInput">
                                                    <input v-model="Obstetricaux" type="text" class="form-control" placeholder="obstétricaux" >
                                                </div>
                                                <div class="divInput">
                                                    <input v-model="rmqObst" type="text" class="form-control" placeholder="remarque" >
                                                </div>
                                                <button v-if="myObstetricaux"  @click.prevent="updateObstetricaux()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                                <button v-else @click.prevent="AddNewObstetricaux" :disabled="!ENRG" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                            </div>
                                        </form>
                                        <div class="table-responsive">
                                            <table class="main-table text-center table table-bordered">
                                                <tr>
                                                    <th>Obstétricaux</th>
                                                    <th>Remarque</th>
                                                    <th>Control</th>
                                                </tr>
                                                <tr v-bind:key="obst._id" v-for="obst in obstetrics">
                                                    <td v-if="obst.patient == idPat || obst.patient == idPatMDF">{{obst.Obstetricaux}}</td>
                                                    <td v-if="obst.patient == idPat || obst.patient == idPatMDF">{{obst.rmqObst}}</td>
                                                    <td v-if="obst.patient == idPat || obst.patient == idPatMDF">
                                                        <a @click.prevent="editObstetricaux(obst)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                        <a @click.prevent="deleteObstetricaux(obst._id)" href="#"><i class="fas fa-trash-alt"></i></a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div v-if="interrogatoire" class="antec mt-2 row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-title">
                                        <h5>Motif consultation</h5>
                                    </div>
                                    <div class="card-body">
                                        <form>
                                            <div class="row">
                                                <div class="divInput">
                                                    <input v-model="motif" type="text" class="form-control" placeholder="motif consultation" >
                                                </div>
                                                <div class="divInput">
                                                    <input v-model="rmqMotif" type="text" class="form-control" placeholder="remarque" >
                                                </div>
                                                <button v-if="myInterogatoire" @click.prevent="updateInterogatoire()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                                <button v-else @click.prevent="addnewInterogatoire" :disabled="!ENRG" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                            </div>
                                        </form>
                                        <div class="table-responsive">
                                            <table class="main-table text-center table table-bordered">
                                                <tr>
                                                    <th>Motif consultation</th>
                                                    <th>Remarque</th>
                                                    <th>Control</th>
                                                </tr>
                                                <tr v-bind:key="interog._id" v-for="interog in interogatoires">
                                                    <td v-if="interog.patient == idPat || interog.patient == idPatMDF">{{interog.motif}}</td>
                                                    <td v-if="interog.patient == idPat || interog.patient == idPatMDF">{{interog.rmqMotif}}</td>
                                                    <td v-if="interog.patient == idPat || interog.patient == idPatMDF">
                                                        <a @click.prevent="editInterogatoire(interog)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                        <a @click.prevent="deleteInterogatoire(interog._id)" href="#"><i class="fas fa-trash-alt"></i></a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="examen" class="antec">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-title">
                                        <h5>Examen général</h5>
                                    </div>
                                    <div class="card-body">
                                        <form>
                                            <div class="form-group row">
                                                <label for="TA" class="col-sm-2 col-form-label">TA</label>
                                                <div class="col-sm-6">
                                                    <input v-model="ta" type="text"  class="form-control" id="TA" >
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="Poids" class="col-sm-2 col-form-label">Poids</label>
                                                <div class="col-sm-6">
                                                    <input v-model="poids" type="text" class="form-control" id="Poids">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="GPP" class="col-sm-2 col-form-label">GPP</label>
                                                <div class="col-sm-6">
                                                    <input v-model="gpp" type="text" class="form-control" id="GPP">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="HU" class="col-sm-2 col-form-label">HU</label>
                                                <div class="col-sm-6">
                                                    <input v-model="hu" type="text" class="form-control" id="HU">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="Fc" class="col-sm-2 col-form-label">Fc</label>
                                                <div class="col-sm-6">
                                                    <input v-model="fc" type="text" class="form-control" id="Fc">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="GAJ" class="col-sm-2 col-form-label">GAJ</label>
                                                <div class="col-sm-6">
                                                    <input v-model="gaj" type="text" class="form-control" id="GAJ">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="Température" class="col-sm-2 col-form-label">Température</label>
                                                <div class="col-sm-6">
                                                    <input v-model="temperature" type="text" class="form-control" id="Température">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="OMI" class="col-sm-2 col-form-label">Oedème</label>
                                                <div class="col-sm-6">
                                                    <input v-model="omi" type="text" class="form-control" id="OMI">
                                                </div>
                                            </div>
                                            <button v-if="myGeniral"  @click.prevent="updateExamenGeniral()"  class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                            <button v-else :disabled="!ENRG" @click.prevent="addnewExamenGeniral" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                        </form>
                                        <div class="table-responsive">
                                            <table class="main-table text-center table table-bordered">
                                                <tr>
                                                    <th>TA</th>
                                                    <th>Poids</th>
                                                    <th>GPP</th>
                                                    <th>HU</th>
                                                    <th>Fc</th>
                                                    <th>GAJ</th>
                                                    <th>Température</th>
                                                    <th>Oedème</th>
                                                    <th>Control</th>
                                                </tr>
                                                <tr v-bind:key="examGenr._id" v-for="examGenr in examensGenirals">
                                                    <td v-if="examGenr.patient == idPat || examGenr.patient == idPatMDF">{{examGenr.ta}}</td>
                                                    <td v-if="examGenr.patient == idPat || examGenr.patient == idPatMDF">{{examGenr.poids}}</td>
                                                    <td v-if="examGenr.patient == idPat || examGenr.patient == idPatMDF">{{examGenr.gpp}}</td>
                                                    <td v-if="examGenr.patient == idPat || examGenr.patient == idPatMDF">{{examGenr.hu}}</td>
                                                    <td v-if="examGenr.patient == idPat || examGenr.patient == idPatMDF">{{examGenr.fc}}</td>
                                                    <td v-if="examGenr.patient == idPat || examGenr.patient == idPatMDF">{{examGenr.gaj}}</td>
                                                    <td v-if="examGenr.patient == idPat || examGenr.patient == idPatMDF">{{examGenr.temperature}}</td>
                                                    <td v-if="examGenr.patient == idPat || examGenr.patient == idPatMDF">{{examGenr.omi}}</td>
                                                    <td v-if="examGenr.patient == idPat || examGenr.patient == idPatMDF">
                                                        <a @click.prevent="editExamenGeniral(examGenr)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                        <a @click.prevent="deleteExamenGeniral(examGenr._id)" href="#"><i class="fas fa-trash-alt"></i></a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form v-if="pat" action="/patient" method="post">
                            <div id="ID" class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">_ID:</label>
                                <div class="col-sm-10">
                                <input v-model="idPatMDF" type="text" class="form-control" id="inputEmail3">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">CIN:</label>
                                <div class="col-sm-10">
                                <input v-model="cin" type="text" class="form-control" id="inputEmail3">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="nom" class="col-sm-2 col-form-label">Nom Complet:</label>
                                <div class="col-sm-10">
                                <input v-model="nom" type="text" class="form-control" id="nom">
                                </div>
                            </div>
                            <!--<div class="form-group row">
                                <label for="prenom" class="col-sm-2 col-form-label">Prenom:</label>
                                <div class="col-sm-10">
                                <input v-model="prenom" type="text" class="form-control" id="prenom">
                                </div>
                            </div>-->
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
                            
                            <!--<div v-if="myPatient" class="form-group row">
                                <label for="dateNaissance" class="col-sm-2 col-form-label" >Date Naissance:</label>
                                <div class="col-sm-10">
                                <input v-model="dateNaissance" type="text" class="form-control" id="dateNaissance" >
                                </div>
                            </div>-->

                            <div class="form-group row">
                                <label for="dateNaissance" class="col-sm-2 col-form-label">Date Naissance:</label>
                                <div class="col-sm-10">
                                <input v-model="dateNaissance"  type="date" class="form-control" @change="calculateAge()" id="dateNaissance" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="age" class="col-sm-2 col-form-label">Age:</label>
                                <div class="col-sm-10">
                                <input v-model="age" type="text" class="form-control" @keypress="onlyNumber" id="age">
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
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Quitter</button>
                        <!--<button @click="addPatient()" type="button" class="btn btn-success">Enregistrer</button>-->
                        <input v-if="myPatient && btnMdf == true" type="submit" @click.prevent="updatePatient()" class="btn btn-success" value="Modifier">
                        <input v-if="myPatient == null && btnEnrg == true" type="submit" @click.prevent="addPatient()" class="btn btn-success" value="Enregistrer">
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
import { mapActions, mapGetters } from 'vuex'
import { mapState } from 'vuex';
//import Datatable from './Datatable.vue';
//import Pagination from './Pagination.vue';
//import pat from './pat.vue';

var url ='localhost:5000'
//var url ='backend.storeino.info'
//var ide ='5e9776cfccc2da282c7dd346'
//var idL = '5e7ea5dc77d5da3de8d5a9f5'
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
            myPatient: null,
            page:1,
            perPage:15,
            pages:[],
            antecedent : false,
            pat: true,
            interrogatoire : false,
            examen : false,
            familias:[],
            familiaux : '',
            rmqFam : '',
            patientFam :'',
            idPat:'',
            lastPat:'',
            myFamiliaux : null,
            medicals:[],
            hta : '',
            diabete : '',
            allergie : '',
            autresMdc : '',
            myMedicaux : null,
            chirurgics:[],
            chirurgicaux : '',
            rmqChirg : '',
            myChirurgicaux : null,
            obstetrics:[],
            Obstetricaux : '',
            rmqObst : '',
            myObstetricaux : null,
            interogatoires : [],
            motif : '',
            rmqMotif : '',
            myInterogatoire : null,
            examensGenirals :[],
            ta : '',
            poids : '',
            gpp : '',
            hu : '',
            fc : '',
            gaj : '',
            temperature : '',
            omi : '',
            myGeniral : null,
            idPatMDF : '',
            ajoutPat : false,
            btnEnrg : true,
            btnMdf : true,
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
                this.cin = ''; this.sitFam = ''; this.idPatMDF = ''; this.ajoutPat = true; this.idPat = ''; this.lastPat = '';
                this.ENRG =false;  this.btnEnrg = true;
        },
        antecedentBtn: function(){

            $('#antecedentBtn').addClass('active')
            $('#interrogatoireBtn').removeClass('active')
            $('#examenBtn').removeClass('active')
            $('#patientBtn').removeClass('active')
            this.antecedent = true;
            this.pat = false;
            this.interrogatoire = false;
            this.examen = false;
            this.btnEnrg = false;
            this.btnMdf = false;
        },
        patientBtn: function(){

            $('#antecedentBtn').removeClass('active')
            $('#interrogatoireBtn').removeClass('active')
            $('#examenBtn').removeClass('active')
            $('#patientBtn').addClass('active')
            this.antecedent = false;
            this.pat = true;
            this.interrogatoire = false;
            this.examen = false;
            this.btnEnrg = true;
            this.btnMdf = true;
        },
        interrogatoireBtn: function(){

            $('#antecedentBtn').removeClass('active')
            $('#interrogatoireBtn').addClass('active')
            $('#examenBtn').removeClass('active')
            $('#patientBtn').removeClass('active')
            this.antecedent = false;
            this.pat = false;
            this.interrogatoire = true;
            this.examen = false;
            this.btnEnrg = false;
            this.btnMdf = false;
        },
        examenBtn: function(){

            $('#antecedentBtn').removeClass('active')
            $('#interrogatoireBtn').removeClass('active')
            $('#examenBtn').addClass('active')
            $('#patientBtn').removeClass('active')
            this.antecedent = false;
            this.pat = false;
            this.interrogatoire = false;
            this.examen = true;
            this.btnEnrg = false;
            this.btnMdf = false;
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
            if(( this.prenom !== ''   
            || this.cin !== '' || this.cin == '' || this.mituelle!=='' ||  
            this.adresse !== '' || this.profession !== '' ||  
            this.tel !== '' || this.age !== '' ||  
            this.sitFam !== '' || this.dateNaissance !== '') && ( this.nom !== '') ){
                axios.post('http://' + url + '/patients/'+this.user._id+'/addPatient', newPatient)
                .then(res => {
                    this.patients = [res.data, ...this.patients];
                    this.lastPat = '';
                    this.lastPat =[res.data, ...this.lastPat];
                    //console.log(this.lastPat._id);
                    this.nom = ''; this.mituelle = ''; this.adresse = ''; this.prenom = '';
                    this.cin = '';
                    this.profession = ''; this.tel=''; this.age = ''; this.dateNaissance = '';
                    //Fire.$emit('AfterCreate');
                    //$('#addNew').modal('hide');
                    this.ENRG = true;
                    this.idPat = '';

                    this.$swal('Ajouté' , 'Le Patient ajouter avec Succès', 'success');
                // location.reload(true);
                });

            }

            this.$Progress.finish();
            
        },
        
        getPatients(){
                axios.get('http://' + url + '/patients/')
                .then(res => this.patients = res.data)
                .catch(err => console.log(err));

        },

        deletePatient(_id){
            /*this.$swal({title:'êtes-vous sûr de supprimer cet élément' , icon:'error', showCloseButton: true,
        showCancelButton: true, dangerMode: true}).then((willDelete) => {
                        if(willDelete){
                            axios.all([axios.delete(`http://` + url + `/patients/deleteRdvPat/${_id}`),
                                axios.delete(`http://` + url + `/patients/deleteConsPat/${_id}`),
                                axios.delete(`http://` + url + `/patients/deletePatient/${_id}`)             
                            ]).then( () =>{
                                this.patients = this.patients.filter(patient => patient._id !== _id);
                            })
                        }*/


            if(confirm('êtes-vous sûr de supprimer cet élément ?')){
                    axios.all([axios.delete(`http://` + url + `/patients/deleteRdvPat/${_id}`),
                    axios.delete(`http://` + url + `/patients/deleteConsPat/${_id}`),
                    axios.delete(`http://` + url + `/patients/deletePatient/${_id}`)             
                ])
                //axios.delete(`http://' + url + '/patients/5e7ea5dc77d5da3de8d5a9f5/deletePatient/${_id}`)
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

            //this._id = patient._id;

            this.idPatMDF = patient._id; this.idPat = '';
            this.btnMdf = true;

            this.ENRG = true;
            this.ajoutPat = false;
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
            axios.put('http://' + url + '/patients/updatePatient/'+Pat._id, Pat)
                .then(res => {
                    this.patients = this.patients.map(p => {
                        if(res.data._id === p._id){
                            return res.data;
                        }
                        return p;
                    });
                    
                });
                this.$swal('Modifier' , 'Le Patient modifier avec Succès', 'warning');
                //$('#addNew').modal('hide');
                var typeInter = setInterval( () => {
                    this.getPatients();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);
        },
        ...mapActions(['getProfile']),
        calculateAge: function(){
            var Bdate = document.getElementById('dateNaissance').value;
            var Bday = +new Date(Bdate);
            this.age = ~~ ((Date.now() - Bday) / (31557600000) );
        },
        /*isInputNumber(evt){
            var ch = String.fromCharCode(evt.which);
            if(!(/[0-9]/.test (ch))){
                evt.preventDefault();
            }
        },*/
        onlyNumber ($event) {
        //console.log($event.keyCode); //keyCodes value
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
                $event.preventDefault();
            }
        },
        paginate(patients){
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return patients.slice(from, to)
        },
        setPatients(){
            let numberOfPages = Math.ceil(this.patients.length / this.perPage);
            for(let i = 1; i <= numberOfPages; i++){
                this.pages.push(i);
            }
        },
        getFamilias(){
                axios.get('http://'+url+'/antecedents/famil')
                .then(res => this.familias = res.data)
                .catch(err => console.log(err));
        },
        addNewFamiliaux(){
            //this.idCons = this.consulations.slice(-1)[0];
            //console.log(this.idCons);

            if(this.ajoutPat == true){
                var lsIDPat = document.getElementById('tdLastIDPat').textContent;
                console.log(lsIDPat);
                this.idPat = lsIDPat;
            }

            if(this.familiaux !=='' ){
                let newFam = {
                    familiaux : this.familiaux,
                    rmqFam : this.rmqFam,
                    patient : lsIDPat
                };

                axios.post('http://'+url+'/antecedents/addFamiliaux', newFam)
                .then(res => {
                    this.familias = [res.data, ...this.familias];
                    this.familiaux = '';
                    this.rmqFam = ''; 
                });
            }
            if(this.familiaux !='' && this.idPatMDF !=''){
                let newFam = {
                    familiaux : this.familiaux,
                    rmqFam : this.rmqFam,
                    patient : this.idPatMDF
                };

                axios.post('http://'+url+'/antecedents/addFamiliaux', newFam)
                .then(res => {
                    this.familias = [res.data, ...this.familias];
                    this.familiaux = '';
                    this.rmqFam = ''; 
                });
            }
        },

        deleteFamiliaux(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/antecedents/deleteFam/${_id}`)             
                .then( () =>{
                    this.familias = this.familias.filter(fam => fam._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getFamilias();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);
                
                this.myFamiliaux = null;
            }
        },

        editFamiliaux(fam){
            this.myFamiliaux = fam;
            this.familiaux = fam.familiaux;
            this.rmqFam = fam.rmqFam;
        },

        updateFamiliaux(){
            let Fam = {
                ...this.myFamiliaux,
                familiaux: this.familiaux,
                rmqFam: this.rmqFam,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.familiaux !=='' || this.rmqFam !==''){
                axios.put('http://'+url+'/antecedents/updateFam/'+Fam._id, Fam)
                .then(res => {
                    this.familias = this.familias.map(f => {
                        if(res.data._id === f._id){
                            return res.data
                        }
                        return f;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getFamilias();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myFamiliaux = null;
                this.familiaux = '';
                this.rmqFam = '';
            }
        },

        getMedicaux(){
                axios.get('http://'+url+'/antecedents/medic')
                .then(res => this.medicals = res.data)
                .catch(err => console.log(err));
        },

        addNewMedicaux(){
            if(this.ajoutPat == true){
                var lsIDPat = document.getElementById('tdLastIDPat').textContent;
                console.log(lsIDPat);
                this.idPat = lsIDPat;
            }

            if(this.hta !=='' || this.diabete !=='' || this.allergie !=='' || this.autresMdc !==''){
                let newMdc = {
                    hta : this.hta,
                    diabete : this.diabete,
                    allergie : this.allergie,
                    autresMdc : this.autresMdc,
                    patient :  lsIDPat
                };

                axios.post('http://'+url+'/antecedents/addMidicaux', newMdc)
                .then(res => {
                    this.medicals = [res.data, ...this.medicals];
                    this.hta = '';
                    this.diabete = '';
                    this.allergie = ''; 
                    this.autresMdc = '';
                });
            }
            if(this.hta !=='' || this.diabete !=='' || this.allergie !=='' || this.autresMdc !=='' && this.idPatMDF !==''){
                let newMdc = {
                    hta : this.hta,
                    diabete : this.diabete,
                    allergie : this.allergie,
                    autresMdc : this.autresMdc,
                    patient : this.idPatMDF
                };

                axios.post('http://'+url+'/antecedents/addMidicaux', newMdc)
                .then(res => {
                    this.medicals = [res.data, ...this.medicals];
                    this.hta = '';
                    this.diabete = '';
                    this.allergie = ''; 
                    this.autresMdc = '';
                });
            }
        },

        deleteMedicaux(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/antecedents/deleteMdc/${_id}`)             
                .then( () =>{
                    this.medicals = this.medicals.filter(medic => medic._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getMedicaux();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);
                this.myMedicaux = null;
            }
        },

        editMedicaux(medic){
            this.myMedicaux = medic;
            this.hta = medic.hta;
            this.diabete = medic.diabete;
            this.allergie = medic.allergie;
            this.autresMdc = medic.autresMdc;
        },

        updateMedicaux(){
            let Mdc = {
                ...this.myMedicaux,
                hta: this.hta,
                diabete: this.diabete,
                allergie: this.allergie,
                autresMdc: this.autresMdc
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.hta !=='' || this.diabete !=='' || this.allergie !=='' || this.autresMdc !==''){
                axios.put('http://'+url+'/antecedents/updateMedic/'+Mdc._id, Mdc)
                .then(res => {
                    this.medicals = this.medicals.map(m => {
                        if(res.data._id === m._id){
                            return res.data
                        }
                        return m;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getMedicaux();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myMedicaux = null;
                this.hta = '';
                this.diabete = '';
                this.allergie = '';
                this.autresMdc = '';
            }
        },

        getChirurgicaux(){
                axios.get('http://'+url+'/antecedents/chirg')
                .then(res => this.chirurgics = res.data)
                .catch(err => console.log(err));
        },

        AddNewChirurgicaux(){
            if(this.ajoutPat == true){
                var lsIDPat = document.getElementById('tdLastIDPat').textContent;
                console.log(lsIDPat);
                this.idPat = lsIDPat;
            }

            if(this.chirurgicaux !==''){
                let newChrg = {
                    chirurgicaux : this.chirurgicaux,
                    rmqChirg : this.rmqChirg,
                    patient : lsIDPat
                };

                axios.post('http://'+url+'/antecedents/addChirurgicaux', newChrg)
                .then(res => {
                    this.chirurgics = [res.data, ...this.chirurgics];
                    this.chirurgicaux = '';
                    this.rmqChirg = ''; 
                });
            }
            if(this.chirurgicaux !=='' && this.idPatMDF !==''){
                let newChrg = {
                    chirurgicaux : this.chirurgicaux,
                    rmqChirg : this.rmqChirg,
                    patient : this.idPatMDF
                };

                axios.post('http://'+url+'/antecedents/addChirurgicaux', newChrg)
                .then(res => {
                    this.chirurgics = [res.data, ...this.chirurgics];
                    this.chirurgicaux = '';
                    this.rmqChirg = ''; 
                });
            }
        },

        deleteChirurgicaux(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/antecedents/deleteChirg/${_id}`)             
                .then( () =>{
                    this.chirurgics = this.chirurgics.filter(chirg => chirg._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getChirurgicaux();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myChirurgicaux = null;
            }
        },

        editChirurgicaux(chirg){
            this.myChirurgicaux = chirg;
            this.chirurgicaux = chirg.chirurgicaux;
            this.rmqChirg = chirg.rmqChirg;
        },

        updateChirurgicaux(){
            let Chirg = {
                ...this.myChirurgicaux,
                chirurgicaux: this.chirurgicaux,
                rmqChirg: this.rmqChirg,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.chirurgicaux !=='' || this.rmqChirg !=='' ){
                axios.put('http://'+url+'/antecedents/updateChirg/'+Chirg._id, Chirg)
                .then(res => {
                    this.chirurgics = this.chirurgics.map(ch => {
                        if(res.data._id === ch._id){
                            return res.data
                        }
                        return ch;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getChirurgicaux();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myChirurgicaux = null;
                this.chirurgicaux = '';
                this.rmqChirg = '';
            }
        },

        getObstetricaux(){
                axios.get('http://'+url+'/antecedents/obst')
                .then(res => this.obstetrics = res.data)
                .catch(err => console.log(err));
        },

        AddNewObstetricaux(){
            if(this.ajoutPat == true){
                var lsIDPat = document.getElementById('tdLastIDPat').textContent;
                console.log(lsIDPat);
                this.idPat = lsIDPat;
            }

            if(this.Obstetricaux !==''){
                let newObst = {
                    Obstetricaux : this.Obstetricaux,
                    rmqObst : this.rmqObst,
                    patient : lsIDPat
                };

                axios.post('http://'+url+'/antecedents/addObstetricaux', newObst)
                .then(res => {
                    this.obstetrics = [res.data, ...this.obstetrics];
                    this.Obstetricaux = '';
                    this.rmqObst = ''; 
                });
            }
            if(this.Obstetricaux !=='' && this.idPatMDF !==''){
                let newObst = {
                    Obstetricaux : this.Obstetricaux,
                    rmqObst : this.rmqObst,
                    patient : this.idPatMDF
                };

                axios.post('http://'+url+'/antecedents/addObstetricaux', newObst)
                .then(res => {
                    this.obstetrics = [res.data, ...this.obstetrics];
                    this.Obstetricaux = '';
                    this.rmqObst = ''; 
                });
            }
        },

        deleteObstetricaux(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/antecedents/deleteObst/${_id}`)             
                .then( () =>{
                    this.obstetrics = this.obstetrics.filter(obst => obst._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getObstetricaux();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myObstetricaux = null;
            }
        },

        editObstetricaux(obst){
            this.myObstetricaux = obst;
            this.Obstetricaux = obst.Obstetricaux;
            this.rmqObst = obst.rmqObst;
        },

        updateObstetricaux(){
            let Obst = {
                ...this.myObstetricaux,
                Obstetricaux: this.Obstetricaux,
                rmqObst: this.rmqObst,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.Obstetricaux !=='' || this.rmqObst !==''){
                axios.put('http://'+url+'/antecedents/updateObst/'+Obst._id, Obst)
                .then(res => {
                    this.obstetrics = this.obstetrics.map(o => {
                        if(res.data._id === o._id){
                            return res.data
                        }
                        return o;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getObstetricaux();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myObstetricaux = null;
                this.Obstetricaux = '';
                this.rmqObst = '';
            }
        },

        getInterogatoires(){
                axios.get('http://'+url+'/interogatoires')
                .then(res => this.interogatoires = res.data)
                .catch(err => console.log(err));
        },

        addnewInterogatoire(){
            if(this.ajoutPat == true){
                var lsIDPat = document.getElementById('tdLastIDPat').textContent;
                console.log(lsIDPat);
                this.idPat = lsIDPat;
            }

            if(this.motif !== '' ){

                let newInterogatoire = {
                    motif : this.motif,
                    rmqMotif : this.rmqMotif,
                    patient : lsIDPat
                };

                axios.post('http://'+url+'/interogatoires/addInterog', newInterogatoire)
                .then(res => {
                    this.interogatoires = [res.data, ...this.interogatoires];
                    this.motif = ''; this.rmqMotif = '';
                });
            }
            if(this.motif !== '' && this.idPatMDF !==''){

                let newInterogatoire = {
                    motif : this.motif,
                    rmqMotif : this.rmqMotif,
                    patient : this.idPatMDF
                };

                axios.post('http://'+url+'/interogatoires/addInterog', newInterogatoire)
                .then(res => {
                    this.interogatoires = [res.data, ...this.interogatoires];
                    this.motif = ''; this.rmqMotif = '';
                });
            }

        },

        deleteInterogatoire(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/interogatoires/deleteInterog/${_id}`)             
                .then( () =>{
                    this.interogatoires = this.interogatoires.filter(interog => interog._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getInterogatoires();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myInterogatoire = null;
            }
        },

        editInterogatoire(interog){
            this.myInterogatoire = interog;
            this.motif = interog.motif;
            this.rmqMotif = interog.rmqMotif;
        },

        updateInterogatoire(){
            let Inter = {
                ...this.myInterogatoire,
                motif: this.motif,
                rmqMotif: this.rmqMotif,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.motif !=='' || this.rmqMotif !==''){
                axios.put('http://'+url+'/interogatoires/updateInterog/'+Inter._id, Inter)
                .then(res => {
                    this.interogatoires = this.interogatoires.map(intr => {
                        if(res.data._id === intr._id){
                            return res.data
                        }
                        return intr;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getInterogatoires();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myInterogatoire = null;
                this.motif = '';
                this.rmqMotif = '';
            }
        },

        getExamenGeniral(){
                axios.get('http://'+url+'/examensClinique/genirals')
                .then(res => this.examensGenirals = res.data)
                .catch(err => console.log(err));
        },

        addnewExamenGeniral(){       

            if(this.ajoutPat == true){
                var lsIDPat = document.getElementById('tdLastIDPat').textContent;
                console.log(lsIDPat);
                this.idPat = lsIDPat;
            }

            if(this.ta !== '' || this.poids !== '' || this.gpp !== '' || this.hu !== '' || this.fc !== ''  
                || this.gaj !== '' || this.temperature !== '' || this.omi !== ''){

                    let newExamenGeniral = {
                        ta : this.ta,
                        poids : this.poids,
                        gpp : this.gpp,
                        hu : this.hu,
                        fc : this.fc,
                        gaj : this.gaj,
                        temperature : this.temperature,
                        omi : this.omi,
                        patient : lsIDPat
                    };

                axios.post('http://'+url+'/examensClinique/addExamGeniral', newExamenGeniral)
                .then(res => {
                    this.examensGenirals = [res.data, ...this.examensGenirals];
                    this.ta = ''; this.poids = ''; this.gpp = ''; this.hu = '';
                    this.fc = ''; this.gaj = ''; this.temperature = ''; this.omi = '';
                });
            }
            if(this.ta !== '' || this.poids !== '' || this.gpp !== '' || this.hu !== '' || this.fc !== ''  
                || this.gaj !== '' || this.temperature !== '' || this.omi !== '' && this.idPatMDF !==''){

                    let newExamenGeniral = {
                        ta : this.ta,
                        poids : this.poids,
                        gpp : this.gpp,
                        hu : this.hu,
                        fc : this.fc,
                        gaj : this.gaj,
                        temperature : this.temperature,
                        omi : this.omi,
                        patient : this.idPatMDF
                    };

                axios.post('http://'+url+'/examensClinique/addExamGeniral', newExamenGeniral)
                .then(res => {
                    this.examensGenirals = [res.data, ...this.examensGenirals];
                    this.ta = ''; this.poids = ''; this.gpp = ''; this.hu = '';
                    this.fc = ''; this.gaj = ''; this.temperature = ''; this.omi = '';
                });
            }

        },

        deleteExamenGeniral(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/examensClinique/deleteExamenGen/${_id}`)             
                .then( () =>{
                    this.examensGenirals = this.examensGenirals.filter(examGenr => examGenr._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getExamenGeniral();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myGeniral = null;
            }
        },

        editExamenGeniral(examGenr){
            this.myGeniral = examGenr;
            this.ta = examGenr.ta;
            this.poids = examGenr.poids;
            this.gpp = examGenr.gpp;
            this.hu = examGenr.hu;
            this.fc = examGenr.fc;
            this.gaj = examGenr.gaj;
            this.temperature = examGenr.temperature;
            this.omi = examGenr.omi;
        },

        updateExamenGeniral(){
            let Gen = {
                ...this.myGeniral,
                ta: this.ta,
                poids: this.poids,
                gpp: this.gpp,
                hu: this.hu,
                fc: this.fc,
                gaj: this.gaj,
                temperature: this.temperature,
                omi: this.omi,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.ta !=='' || this.poids !==''  || this.gpp !== '' || this.hu !== '' || this.fc !== ''  
                || this.gaj !== '' || this.temperature !== '' || this.omi !== ''){
                axios.put('http://'+url+'/examensClinique/updateExamenGen/'+Gen._id, Gen)
                .then(res => {
                    this.examensGenirals = this.examensGenirals.map(g => {
                        if(res.data._id === g._id){
                            return res.data
                        }
                        return g;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getExamenGeniral();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myGeniral = null;
                this.ta = ''; this.poids = ''; this.gpp = ''; this.hu = ''; 
                this.fc = ''; this.gaj = ''; this.temperature = ''; this.omi = '';
            }
        },

        /*searchByDate:function(){
            let filter = document.getElementById('searchBar').value.toLowerCase;
            let myTable = document.getElementById('myTable');
            let tr = myTable.getElementsByTagName('tr');

            for(var i=0; i<tr.length; i++){
                let td = tr[i].getElementsByTagName('td')[6];
                if(td){
                    let textValue = td.textContent;
                    if(textValue.toLowerCase().indexOf(filter) > -1){
                        tr[i].style.display = "block";
                    }else{
                        tr[i].style.display = "none";
                    }
                }
            }
            
        }*/
    },
    created(){
        this.getPatients();
        this.getProfile();
        this.getFamilias();
        this.getMedicaux();
        this.getChirurgicaux();
        this.getObstetricaux();
        this.getInterogatoires();
        this.getExamenGeniral();
        //this.getConsultaions();
        //setInterval( () => this.getPatients(), 2000);
    },
    computed: {
        
        filteredPatients: function(){
            //var moment = require('moment');
            return this.paginate(this.patients).filter((patient) => {
                
                return patient.nom.toLowerCase().includes(this.search.toLowerCase()) || 
                patient.prenom.toLowerCase().includes(this.search.toLowerCase()) || 
                patient.cin.toLowerCase().includes(this.search.toLowerCase()) ||  
                patient.profession.toLowerCase().includes(this.search.toLowerCase()) ||  
                patient.sitFam.toLowerCase().includes(this.search.toLowerCase()) || 
                patient.adresse.toLowerCase().includes(this.search.toLowerCase()) ||
                patient.sexe.toLowerCase().includes(this.search.toLowerCase()) || 
                patient.mituelle.toLowerCase().includes(this.search.toLowerCase()) || 
                parseInt(patient.age) === parseInt(this.search) || 
                String(patient.dateNaissance).toLowerCase().includes(this.search.toLowerCase()) || 
                patient.tel.match(this.search); 
            });
        },
        ...mapGetters(['user']),
        ...mapState(['consultations']),
    },
    watch:{
        patients(){
            this.setPatients();
        }
    }
}
</script>

<style>
    #ID{
        display: none;
    }
</style>