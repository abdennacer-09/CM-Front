<template>
    <div class="globalConsultation">

        <div class="container consPrs">
            <div class="card-title titleCons">
                <i class="fas fa-comment-medical"></i>&nbsp;
                <span><h5>Modifier la consultation</h5></span>
            </div>
            <div class="card">
                <div class="card-title cardtitleCons"> 
                    <i class="fas fa-comment-medical"></i>
                    Modifier la consultation
                </div> 
                <div class="card-body">
                    <!--<div class="row">
                        <div class="col-md-6 col-sm-12">
                            <button class="btn btn-success">En cours</button>
                            <button class="btn btn-primary">Terminer</button>
                            <button class="btn btn-danger">Annuler</button>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <ul class="progressbar">
                                <li class="active">Bruillon</li>
                                <li>En cours</li>
                                <li>Terminer</li>
                                <li>Annuler</li>
                            </ul>
                        </div>
                    </div>-->
                    <!--<div class="procedeur">
                        <button class="btn entrerCons">Entrer Consultation</button>
                        <button class="btn enrg">Enregistrer</button>
                        <button class="btn imprOrd">Imprimer ordonnance</button>
                        <button class="btn imprRec">Imprimer reçu</button>
                    </div>-->
                    <!------ **************************** -------->
                    <div class="information">
                        <div class="card card-body">
                            <h2>
                                <span>Modifier la Consultation de </span>
                                <span v-if="selectedPatient == null">{{consultation2.patient.nom}}</span>
                                <span v-else v-text="selectedPatient ? selectedPatient.nom : ''" ></span>
                            </h2>
                            <div class="form-group row">
                                <label for="patient" class="col-sm-4 col-form-label">Patient:</label>
                                <div class="col-sm-10">
                                    <div class="autocomplete">
                                        <div class="input" id="inputPatint" @click="toggleVisible"  v-text="selectedPatient ? selectedPatient.nom : ''"></div>
                                        <div class="popover" v-show="visible">
                                            <input type="text" v-model="query" v-show="visible" 
                                            ref="input"
                                            @keydown.up="up" 
                                            @keydown.down="down" 
                                            @keydown.enter="selectPatient"
                                            placeholder="Etrez le nom de patient...">
                                            <div class="options" ref="optionsList">
                                                <ul>
                                                    <li 
                                                    v-for="(match, index) in matches" 
                                                    @click="patientClicked(index)" 
                                                    v-bind:key="match._id" 
                                                    :class="{ 'selected': (selected == index) }"
                                                    v-text="match.nom"></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <!--<input v-model="patient" type="text" class="form-control" id="patient" placeholder="patinet">-->
                                </div>
                            </div>

                            <div class="form-group row divDate">
                                <label for="dateTime" class="col-sm-4 col-form-label">Date</label>
                                <div class="col-sm-8 rdvDate">
                                    <input type="text" class="form-control" v-model="consultation2.date">
                                </div>
                            </div>

                            <span id="idPatient"  v-text="selectedPatient ? selectedPatient._id : ''"></span>
                            <!--<input  :value="selectedPatient._id">-->

                            <table id="lastConsTable">
                                <tr>
                                    <td id="tdLastIDCons">{{consultation2._id}}</td>
                                </tr>
                            </table>
                            
                            <div class="form-group">
                                <button @click.prevent="saveConsultation" type="button" class="btn btn-info">Modifier</button>
                            </div>
                            

                        </div>
                    </div>
                    <div></div>
                    <div v-if="cons" class="card card-body">
                        <ul class="nav nav-tabs">
                            <li class="nav-item"><span class="nav-link active" id="consultationBtn" @click="consultationBtn">Consultation</span></li>
                            <li class="nav-item"><span class="nav-link" id="ordonnanceBtn" @click="ordonnanceBtn">Ordonnance</span></li>
                        </ul>
                        <div v-if="consultation" class="mt-2 mtField">
                            <ul class="nav nav-tabs">
                                <li class="nav-item"><span class="nav-link" id="examenBtn" @click="examenBtn">Examen clinique</span></li>
                                <li class="nav-item"><span class="nav-link" id="bilanBtn" @click="bilanBtn">Bilan paraclinique</span></li>
                            </ul>
                        </div>
                        <div v-if="bilan && consultation && cons" class="mt-2 mtField">
                            <ul class="nav nav-tabs">
                                <li class="nav-item"><span class="nav-link active" id="normalBtn" @click="normalBtn">Biologiques </span></li>
                                <li class="nav-item"><span class="nav-link" id="radiologiqueBtn" @click="radiologiqueBtn">Radiologique</span></li>
                            </ul>
                        </div>
                        <div v-if="bilan && consultation && cons && radiologique" class="mt-2 mtField">
                            <ul class="nav nav-tabs">
                                <li class="nav-item"><span class="nav-link active" id="normalEchoBtn" @click="normalEchoBtn">Echographique</span></li>
                                <li class="nav-item"><span class="nav-link" id="echoFemmeBtn" @click="echoFemmeBtn" >Echographique pour les femmes enceintes</span></li>
                                <li class="nav-item"><span class="nav-link" id="autresRadioBtn" @click="autresRadioBtn" >Autres radio</span></li>
                            </ul>
                        </div>
                        <div v-if="ordonnance" class="mt-2 mtField main-ord">
                            <div class="card">
                                <div class="card-title">
                                    <i class="fas fa-table"></i><span> Liste des ordonnance</span> 
                                    <div class="card-tools">
                                        <button @click.prevent="btnAjouterOrdonnance" class="btn btn-primary" data-toggle="modal" data-target="#addNew"><i class="fas fa-plus"></i>  Ajouter ordonnance</button>
                                    </div>
                                </div>
                                
                                <div class="card-body">
                                    
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Médicament</th>
                                                <th>Quantité</th>
                                                <th>Prise</th>
                                                <th>Période</th>
                                                <th>Nombre par jour</th>
                                                <th>Quand</th>
                                                <th>Remarque</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="ordns._id" v-for="ordns in ordonnances">
                                                <td v-if="ordns.consultation == consultation2._id ">{{ordns.medicament}}</td>
                                                <td v-if="ordns.consultation == consultation2._id ">{{ordns.quantite}}</td>
                                                <td v-if=" ordns.consultation == consultation2._id ">{{ordns.prise}}</td>
                                                <td v-if="ordns.consultation == consultation2._id">{{ordns.periode}}</td>
                                                <td v-if=" ordns.consultation == consultation2._id ">{{ordns.nbrParJour}}</td>
                                                <td v-if="ordns.consultation == consultation2._id ">{{ordns.quand}}</td>
                                                <td v-if="ordns.consultation == consultation2._id ">{{ordns.remarque}}</td>
                                                <td v-if="ordns.consultation == consultation2._id ">
                                                    <a href="#" data-toggle="modal" data-target="#addNew" @click.prevent="editOrdonnance(ordns)"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a href="#" @click.prevent="deleteOrdonnance(ordns._id)"><i class="fas fa-trash-alt"></i></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                    <div id="imprmerOrdns2" class="fichOrdns">
                                        <div class="insidOrdns">
                                            <h3 class="text-center dateOrdns">{{dateNow | myDate}}</h3>
                                            <h3 class="nomPatOrd text-center">{{consultation2.patient.nom}}</h3>
                                            <ul class="list-unstyled" v-bind:key="ordns._id" v-for="ordns in ordonnances">
                                                <li v-if="ordns.consultation == consultation2._id " class="medicOrd">{{ordns.medicament}}</li>
                                                <li v-if="ordns.consultation == consultation2._id ">* {{ordns.quantite}} {{ordns.prise}} {{ordns.periode}} {{ordns.nbrParJour}} {{ordns.quand}}aé'</li>
                                            </ul>
                                            <br>
                                            <br>
                                            <h3 class="text-center">Signature</h3>
                                            <br>
                                            <br><br>
                                        </div>
                                        
                                    </div>
                                    <br>
                                    <button @click.prevent="printContent2('imprmerOrdns2')" class="btn btn-primary addTas">Imprimer</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    
                    <div v-if="examen && consultation && cons" class="enregistrementExamen mt-2 row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Par appareil</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="abdominal" class="col-sm-3 col-form-label">Examen abdominal :</label>
                                            <div class="col-sm-7">
                                                <textarea v-model="abdominal" class="form-control" id="abdominal"  rows="3"></textarea>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="pleuropulmonaire" class="col-sm-3 col-form-label">Examen pleuropulmonaire :</label>
                                            <div class="col-sm-7">
                                                <textarea v-model="pleuropulmonaire" class="form-control" id="pleuropulmonaire"  rows="3"></textarea>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="cardiovasculaire" class="col-sm-3 col-form-label">Examen cardiovasculaire :</label>
                                            <div class="col-sm-7">
                                                <textarea v-model="cardiovasculaire" class="form-control" id="cardiovasculaire"  rows="3"></textarea>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="gynecologique" class="col-sm-3 col-form-label">Examen gynecologique :</label>
                                            <div class="col-sm-7">
                                                <textarea v-model="gynecologique" class="form-control" id="gynecologique"  rows="3"></textarea>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="osteoarticulaire" class="col-sm-3 col-form-label">Examen osteoarticulaire:</label>
                                            <div class="col-sm-7">
                                                <textarea v-model="osteoarticulaire" class="form-control" id="osteoarticulaire"  rows="3"></textarea>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="reste" class="col-sm-3 col-form-label">Reste de l’examen clinique :</label>
                                            <div class="col-sm-7">
                                                <textarea v-model="reste" class="form-control" id="reste"  rows="3"></textarea>
                                            </div>
                                        </div>
                                        <button v-if="myAppareil" @click.prevent="updateAppareil()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                        <button v-else @click.prevent="addNewAppareil" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Abdominal</th>
                                                <th>Pleuropulmonaire</th>
                                                <th>Cardiovasculaire</th>
                                                <th>Gynecologique</th>
                                                <th>Osteoarticulaire </th>
                                                <th>Reste</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="Appr._id" v-for="Appr in appareils">
                                                <td v-if=" Appr.consultation == consultation2._id">{{Appr.abdominal}}</td>
                                                <td v-if=" Appr.consultation == consultation2._id ">{{Appr.pleuropulmonaire}}</td>
                                                <td v-if=" Appr.consultation == consultation2._id">{{Appr.cardiovasculaire}}</td>
                                                <td v-if=" Appr.consultation == consultation2._id">{{Appr.gynecologique}}</td>
                                                <td v-if=" Appr.consultation == consultation2._id">{{Appr.osteoarticulaire}}</td>
                                                <td v-if=" Appr.consultation == consultation2._id">{{Appr.reste}}</td>
                                                <td v-if=" Appr.consultation == consultation2._id">
                                                    <a href="#" @click.prevent="editAppareil(Appr)"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a href="#" @click.prevent="deleteAppareil(Appr._id)"><i class="fas fa-trash-alt"></i></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="bilan && consultation && cons && normal" class="enregistrementBilan mt-2 row">
                        <div class="col-md-4 stlBio">
                            <div class="card">
                                <div class="card-title">
                                    <h5>1/ NFS+pq</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="NfsPq" class="col-sm-3 col-form-label">NFS+pq</label>
                                            <div class="col-sm-8">
                                                <input v-model="NfsPq" type="text"  class="form-control" id="NfsPq" >
                                            </div>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 stlBio">
                            <div class="card">
                                <div class="card-title">
                                    <h5>2/..</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="TSHus" class="col-sm-3 col-form-label">TSHus</label>
                                            <div class="col-sm-8">
                                                <input v-model="TSHus" type="text"  class="form-control" id="TSHus" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="T3" class="col-sm-3 col-form-label">T3</label>
                                            <div class="col-sm-8">
                                                <input v-model="T3" type="text"  class="form-control" id="T3" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="T4" class="col-sm-3 col-form-label">T4</label>
                                            <div class="col-sm-8">
                                                <input v-model="T4" type="text"  class="form-control" id="taille" >
                                            </div>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 stlBio">
                            <div class="card">
                                <div class="card-title">
                                    <h5>3/Glycémie a jeun </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="Glycemie" class="col-sm-5 col-form-label">Glycémie a jeun </label>
                                            <div class="col-sm-7">
                                                <input v-model="Glycemie" type="text"  class="form-control" id="Glycemie" >
                                            </div>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 stlBio">
                            <div class="card">
                                <div class="card-title">
                                    <h5>4/ HBGA1c </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="HBGA1c" class="col-sm-4 col-form-label">HBGA1c</label>
                                            <div class="col-sm-8">
                                                <input v-model="HBGA1c" type="text"  class="form-control" id="HBGA1c" >
                                            </div>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 stlBio">
                            <div class="card">
                                <div class="card-title">
                                    <h5>5/ Bilan lipidique </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="LDL" class="col-sm-3 col-form-label">LDL</label>
                                            <div class="col-sm-8">
                                                <input v-model="LDL" type="text"  class="form-control" id="taille" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="HDL" class="col-sm-3 col-form-label">HDL</label>
                                            <div class="col-sm-8">
                                                <input v-model="HDL" type="text"  class="form-control" id="HDL" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="TG" class="col-sm-3 col-form-label">TG</label>
                                            <div class="col-sm-8">
                                                <input v-model="TG" type="text"  class="form-control" id="TG" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="CT" class="col-sm-3 col-form-label">CT</label>
                                            <div class="col-sm-8">
                                                <input v-model="CT" type="text"  class="form-control" id="CT" >
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 stlBio">
                            <div class="card">
                                <div class="card-title">
                                    <h5>6/ PSA </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="PSA" class="col-sm-3 col-form-label">PSA</label>
                                            <div class="col-sm-8">
                                                <input v-model="PSA" type="text"  class="form-control" id="PSA" >
                                            </div>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 stlBio">
                            <div class="card">
                                <div class="card-title">
                                    <h5>7/ .. </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="TP" class="col-sm-3 col-form-label">TP</label>
                                            <div class="col-sm-8">
                                                <input v-model="TP" type="text"  class="form-control" id="TP" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="TCK" class="col-sm-3 col-form-label">TCK</label>
                                            <div class="col-sm-8">
                                                <input v-model="TCK" type="text"  class="form-control" id="TCK" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="INR" class="col-sm-3 col-form-label">INR</label>
                                            <div class="col-sm-8">
                                                <input v-model="INR" type="text"  class="form-control" id="INR" >
                                            </div>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 stlBio">
                            <div class="card">
                                <div class="card-title">
                                    <h5>8/ Groupage  </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="Groupage" class="col-sm-5 col-form-label">Groupage</label>
                                            <div class="col-sm-7">
                                                <input v-model="Groupage" type="text"  class="form-control" id="Groupage" >
                                            </div>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 stlBio">
                            <div class="card">
                                <div class="card-title">
                                    <h5>9/ Sérologie syphilitique </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="TPHA" class="col-sm-3 col-form-label">TPHA</label>
                                            <div class="col-sm-8">
                                                <input v-model="TPHA" type="text"  class="form-control" id="TPHA" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="VDRL" class="col-sm-3 col-form-label">VDRL</label>
                                            <div class="col-sm-8">
                                                <input v-model="VDRL" type="text"  class="form-control" id="VDRL" >
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 stlBio">
                            <div class="card">
                                <div class="card-title">
                                    <h5>10/Sérologie toxoplasmose </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="SerologieToxo" class="col-sm-5 col-form-label">Sérologie toxoplasmose</label>
                                            <div class="col-sm-7">
                                                <input v-model="SerologieToxo" type="text"  class="form-control" id="SerologieToxo" >
                                            </div>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 stlBio">
                            <div class="card">
                                <div class="card-title">
                                    <h5>11/Sérologie Rubéole   </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="SerologieRub" class="col-sm-5 col-form-label">Sérologie Rubéole</label>
                                            <div class="col-sm-7">
                                                <input v-model="SerologieRub" type="text"  class="form-control" id="SerologieRub" >
                                            </div>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 stlBio">
                            <div class="card">
                                <div class="card-title">
                                    <h5>12/ Autres </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="AutresBio" class="col-sm-5 col-form-label">Autres</label>
                                            <div class="col-sm-7">
                                                <input v-model="AutresBio" type="text"  class="form-control" id="AutresBio" >
                                            </div>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <button v-if="myBiologie" @click.prevent="updateBiologie()" class="btn btn-warning addTas" style="width: 80px; margin-bottom: 10px;margin-top: 5px;"><i class="fas fa-pen"></i></button>
                            <button v-else @click.prevent="addNewBiologie" class="btn btn-primary addTas" style="width: 80px; margin-bottom: 10px;margin-top: 5px;"><i class="fas fa-plus"></i></button>
                        </div>
                        <div class="table-responsive col-md-12">
                            <table class="main-table text-center table table-bordered">
                                <tr>
                                    <th>1/NFS+pq</th>
                                    <th>2/
                                        <tr>
                                            <th>TSHus</th>
                                            <th>T3</th>
                                            <th>T4</th>
                                        </tr>
                                    </th>
                                    <th>3/Glycémie a jeun</th>
                                    <th>4/HBGA1c</th>
                                    <th>5/Bilan lipidique
                                        <tr>
                                            <th>LDL</th>
                                            <th>HDL</th>
                                            <th>TG</th>
                                            <th>CT</th>
                                        </tr>
                                    </th>
                                    <th>6/PSA</th>
                                    <th>7/ 
                                        <tr>
                                            <th>TP</th>
                                            <th>TCK</th>
                                            <th>INR</th>
                                        </tr>
                                    </th>
                                    <th>8/Groupage</th>
                                    <th>
                                        9/Sérologie syphilitique
                                        <tr>
                                            <th>TPHA</th>
                                            <th>VDRL</th>
                                        </tr>
                                    </th>
                                    <th>10/Sérologie toxoplasmose</th>
                                    <th>11/Sérologie Rubéole </th>
                                    <th>12/Autres</th>
                                    <th>Control</th>
                                </tr>
                                <tr v-bind:key="bio._id" v-for="bio in biologies">
                                    <td v-if=" bio.consultation == consultation2._id ">{{bio.NfsPq}}</td>
                                    <td v-if="  bio.consultation == consultation2._id ">
                                        <tr>
                                            <td>{{bio.TSHus}}</td>
                                            <td>{{bio.T3}}</td>
                                            <td>{{bio.T4}}</td>
                                        </tr>
                                    </td>
                                    <td v-if="  bio.consultation == consultation2._id ">{{bio.Glycemie}}</td>
                                    <td v-if="  bio.consultation == consultation2._id ">{{bio.HBGA1c}}</td>
                                    <td v-if="  bio.consultation == consultation2._id ">
                                        <tr>
                                            <td>{{bio.LDL}}</td>
                                            <td>{{bio.HDL}}</td>
                                            <td>{{bio.TG}}</td>
                                            <td>{{bio.CT}}</td>
                                        </tr>
                                    </td>
                                    <td v-if="  bio.consultation == consultation2._id">{{bio.PSA}}</td>
                                    <td v-if="  bio.consultation == consultation2._id ">
                                        <tr>
                                            <td>{{bio.TP}}</td>
                                            <td>{{bio.TCK}}</td>
                                            <td>{{bio.INR}}</td>
                                        </tr>
                                    </td>
                                    <td v-if="  bio.consultation == consultation2._id ">{{bio.Groupage}}</td>
                                    <td v-if="  bio.consultation == consultation2._id ">
                                        <tr>
                                            <td>{{bio.TPHA}}</td>
                                            <td>{{bio.VDRL}}</td>
                                        </tr>
                                    </td>
                                    <td v-if="  bio.consultation == consultation2._id ">{{bio.SerologieToxo}}</td>
                                    <td v-if=" bio.consultation == consultation2._id ">{{bio.SerologieRub}}</td>
                                    <td v-if="  bio.consultation == consultation2._id ">{{bio.AutresBio}}</td>
                                    <td v-if="  bio.consultation == consultation2._id ">
                                        <a @click.prevent="editBiologie(bio)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                        <a @click.prevent="deleteBiologie(bio._id)" href="#"><i class="fas fa-trash-alt"></i></a>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <div v-if="radiologique && normalEcho && consultation && cons" class="enregistrementRad mt-2 row">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Foie </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="taille" class="col-sm-3 col-form-label">Taille</label>
                                            <div class="col-sm-8">
                                                <input v-model="tailleFoi" type="text"  class="form-control" id="taille" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="structure" class="col-sm-3 col-form-label">Structure</label>
                                            <div class="col-sm-8">
                                                <input v-model="structureFoi" type="text" class="form-control" id="structure">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="contours" class="col-sm-3 col-form-label">Contours</label>
                                            <div class="col-sm-8">
                                                <input v-model="contoursFoi" type="text" class="form-control" id="contours">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="autresAn" class="col-sm-3 col-form-label">Autres anomalies</label>
                                            <div class="col-sm-8">
                                                <input v-model="autresAnomalies" type="text" class="form-control" id="autresAn">
                                            </div>
                                        </div>
                                        <button v-if="myFoie" @click.prevent="updateFoie()"  class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                        <button v-else @click.prevent="addNewFoie" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Taille</th>
                                                <th>Structure</th>
                                                <th>Contours</th>
                                                <th>Autres anomalies</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="foi._id" v-for="foi in foies">
                                                <td v-if="  foi.consultation == consultation2._id ">{{foi.tailleFoi}}</td>
                                                <td v-if="  foi.consultation == consultation2._id ">{{foi.structureFoi}}</td>
                                                <td v-if="  foi.consultation == consultation2._id ">{{foi.contoursFoi}}</td>
                                                <td v-if="  foi.consultation == consultation2._id ">{{foi.autresAnomalies}}</td>
                                                <td v-if="  foi.consultation == consultation2._id ">
                                                    <a @click.prevent="editFoie(foi)" href="#" ><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteFoie(foi._id)"  href="#" ><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>La vésicule biliaire </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="tailleVsB" class="col-sm-3 col-form-label">Taille</label>
                                            <div class="col-sm-8">
                                                <input v-model="tailleVsB" type="text"  class="form-control" id="tailleVsB" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="paroisVsB" class="col-sm-3 col-form-label">Parois</label>
                                            <div class="col-sm-8">
                                                <input v-model="paroisVsB" type="text" class="form-control" id="paroisVsB">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="formeVsB" class="col-sm-3 col-form-label">Forme</label>
                                            <div class="col-sm-8">
                                                <input v-model="formeVsB" type="text" class="form-control" id="formeVsB">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="autresVsB" class="col-sm-3 col-form-label">Autres</label>
                                            <div class="col-sm-8">
                                                <input v-model="autresVsB" type="text" class="form-control" id="autresVsB">
                                            </div>
                                        </div>
                                        <button v-if="myVesicule" @click.prevent="updateVesicule()"  class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                        <button v-else @click.prevent="addNewVesicule" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Taille</th>
                                                <th>Parois</th>
                                                <th>Forme</th>
                                                <th>Autres</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="vesic._id" v-for="vesic in vesicules">
                                                <td v-if="  vesic.consultation == consultation2._id "> {{ vesic.tailleVsB }} </td>
                                                <td v-if="  vesic.consultation == consultation2._id ">{{ vesic.paroisVsB }}</td>
                                                <td v-if="  vesic.consultation == consultation2._id "> {{ vesic.formeVsB }} </td>
                                                <td v-if="  vesic.consultation == consultation2._id ">{{ vesic.autresVsB }}</td>
                                                <td v-if="  vesic.consultation == consultation2._id ">
                                                    <a href="#" @click.prevent="editVesicule(vesic)"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a href="#" @click.prevent="deleteVesicule(vesic._id)"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>Les voies biliaires  </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="intrahEpatique" class="col-sm-4 col-form-label">Intrahépatique </label>
                                            <div class="col-sm-8">
                                                <input v-model="intrahEpatique" type="text"  class="form-control" id="intrahEpatique" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="extrahepatique" class="col-sm-4 col-form-label">Extrahépatique</label>
                                            <div class="col-sm-8">
                                                <input v-model="extrahepatique" type="text" class="form-control" id="extrahepatique">
                                            </div>
                                        </div>
                                        <button v-if="myVoie" @click.prevent="updateVoies()"  class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                        <button v-else @click.prevent="addNewVoies" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Intrahépatique </th>
                                                <th>Extrahépatique </th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="voi._id" v-for="voi in voies">
                                                <td v-if="  voi.consultation == consultation2._id ">{{ voi.intrahEpatique }}</td>
                                                <td v-if="  voi.consultation == consultation2._id ">{{ voi.extrahepatique }}</td>
                                                <td v-if="  voi.consultation == consultation2._id ">
                                                    <a @click.prevent="editVoies(voi)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a  @click.prevent="deleteVoies(voi._id)" href="#"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>La rate</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="tailleRat" class="col-sm-3 col-form-label">Taille</label>
                                            <div class="col-sm-8">
                                                <input v-model="tailleRat" type="text"  class="form-control" id="tailleRat" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="structureRat" class="col-sm-3 col-form-label">Structure</label>
                                            <div class="col-sm-8">
                                                <input v-model="structureRat" type="text" class="form-control" id="structureRat">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="contoursRat" class="col-sm-3 col-form-label">Contours</label>
                                            <div class="col-sm-8">
                                                <input v-model="contoursRat" type="text" class="form-control" id="contoursRat">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="autresAnRat" class="col-sm-3 col-form-label">Autres anomalies</label>
                                            <div class="col-sm-8">
                                                <input v-model="autresAnomaliesRat" type="text" class="form-control" id="autresAnRat">
                                            </div>
                                        </div>
                                        <button v-if="myRate" @click.prevent="updateRates()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                        <button v-else @click.prevent="addNewRates" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Les éléments</th>
                                                <th>Remarque</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="rat._id" v-for="rat in rates">
                                                <td v-if="  rat.consultation == consultation2._id ">{{rat.tailleRat}}</td>
                                                <td v-if="  rat.consultation == consultation2._id ">{{rat.structureRat}}</td>
                                                <td v-if="  rat.consultation == consultation2._id ">{{rat.contoursRat}}</td>
                                                <td v-if="  rat.consultation == consultation2._id ">{{rat.autresAnomaliesRat}}</td>
                                                <td v-if="  rat.consultation == consultation2._id ">
                                                    <a @click.prevent="editRates(rat)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteRates(rat._id)" href="#"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>Rein droit</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row divInputsRein">
                                            <input v-model="dimensions" class="form-control" type="text" placeholder="Dimensions">
                                            <select v-model="differenciation" class="form-control">
                                                <option value="" disabled selected>Différenciation</option>
                                                <option>Bonne</option>
                                                <option>Médiocre</option>
                                                <option>Absente</option>
                                            </select>
                                            <select v-model="dilatation" class="form-control">
                                                <option value="" disabled selected>Dilatation pyélo-calicielle</option>
                                                <option>Absente</option>
                                                <option>Modérée</option>
                                                <option>Importante</option>
                                            </select>
                                            <button v-if="myReinDroit" @click.prevent="updateReinsDroit()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                            <button v-else @click.prevent="addNewReinsDroit" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                        </div>
                                        
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Dimensions</th>
                                                <th>Différenciation</th>
                                                <th>Dilatation pyélo-calicielle</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="reinDr._id" v-for="reinDr in reinsDroit">
                                                <td v-if="  reinDr.consultation == consultation2._id ">{{reinDr.dimensions}}</td>
                                                <td v-if="  reinDr.consultation == consultation2._id ">{{reinDr.differenciation}}</td>
                                                <td v-if="  reinDr.consultation == consultation2._id ">{{reinDr.dilatation}}</td>
                                                <td v-if="  reinDr.consultation == consultation2._id ">
                                                    <a @click.prevent="editReinsDroit(reinDr)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteReinsDroit(reinDr._id)" href="#"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>Rein gauche</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row divInputsRein">
                                            <input v-model="dimensionsGch" class="form-control" type="text" placeholder="Dimensions">
                                            <select v-model="differenciationGch" class="form-control">
                                                <option value="" disabled selected>Différenciation</option>
                                                <option>Bonne</option>
                                                <option>Médiocre</option>
                                                <option>Absente</option>
                                            </select>
                                            <select v-model="dilatationGch" class="form-control">
                                                <option value="" disabled selected>Dilatation pyélo-calicielle</option>
                                                <option>Absente</option>
                                                <option>Modérée</option>
                                                <option>Importante</option>
                                            </select>
                                            <button v-if="myReinGauche" @click.prevent="updateReinsGauche()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                            <button v-else @click.prevent="addNewReinsGauche" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                        </div>
                                        
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Dimensions</th>
                                                <th>Différenciation</th>
                                                <th>Dilatation pyélo-calicielle</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="reinGch._id" v-for="reinGch in reinsGauche">
                                                <td v-if="  reinGch.consultation == consultation2._id ">{{reinGch.dimensionsGch}}</td>
                                                <td v-if="  reinGch.consultation == consultation2._id ">{{reinGch.differenciationGch}}</td>
                                                <td v-if="  reinGch.consultation == consultation2._id ">{{reinGch.dilatationGch}}</td>
                                                <td v-if="  reinGch.consultation == consultation2._id ">
                                                    <a @click.prevent="editReinsGauche(reinGch)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteReinsGauche(reinGch._id)" href="#"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>La vessie </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row divInputsRein">
                                            <select v-model="repletion"  class="form-control">
                                                <option value="" disabled selected>Réplétion...</option>
                                                <option>insuffisante</option>
                                                <option>modérée</option>
                                                <option>suffisante</option>
                                            </select>

                                            <select v-model="contenu" class="form-control">
                                                <option value="" disabled selected>Contenu...</option>
                                                <option>transsonique </option>
                                                <option>lithiasique échogène</option>
                                            </select>

                                            <select v-model="parois" class="form-control">
                                                <option value="" disabled selected>Parois...</option>
                                                <option>régulières </option>
                                                <option>irrégulières avec diverticule épaississement</option>
                                            </select>

                                            <select v-model="residuPostMictionnel" class="form-control">
                                                <option value="" disabled selected>Résidu post-mictionnel...</option>
                                                <option>non apprécié</option>
                                                <option>absent</option>
                                                <option>négligeable</option>
                                                <option>important quantité cc</option>
                                            </select>
                                            <button v-if="myVessies" @click.prevent="updateVessies()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                            <button v-else @click.prevent="addNewVessies" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                        </div>
                                        
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Réplétion</th>
                                                <th>Contenu</th>
                                                <th>Parois</th>
                                                <th>Résidu post-mictionnel</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="ves._id" v-for="ves in vessies">
                                                <td v-if="  ves.consultation == consultation2._id ">{{ves.repletion}}</td>
                                                <td v-if="  ves.consultation == consultation2._id ">{{ves.contenu}}</td>
                                                <td v-if="  ves.consultation == consultation2._id ">{{ves.parois}}</td>
                                                <td v-if="  ves.consultation == consultation2._id ">{{ves.residuPostMictionnel}}</td>
                                                <td v-if="  ves.consultation == consultation2._id ">
                                                    <a @click.prevent="editVessies(ves)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteVessies(ves._id)" href="#"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>La prostate</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="dimensionsPrs" class="col-sm-3 col-form-label">Dimensions</label>
                                            <div class="col-sm-8">
                                                <input v-model="dimensionsPrs" type="text"  class="form-control" id="dimensionsPrs" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="volumePrs" class="col-sm-3 col-form-label">Volume</label>
                                            <div class="col-sm-8">
                                                <input v-model="volumePrs" type="text" class="form-control" id="volumePrs">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="echostructurePrs" class="col-sm-3 col-form-label">Échostructure</label>
                                            <div class="col-sm-8">
                                                <input v-model="echostructurePrs" type="text" class="form-control" id="echostructurePrs">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="contoursPrs" class="col-sm-3 col-form-label">Contours</label>
                                            <div class="col-sm-8">
                                                <input v-model="contoursPrs" type="text" class="form-control" id="contoursPrs">
                                            </div>
                                        </div>
                                        <button v-if="myProstate" @click.prevent="updateProstates()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                        <button v-else @click.prevent="addNewProstates" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Dimensions</th>
                                                <th>Volume</th>
                                                <th>Échostructure</th>
                                                <th>Contours</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="pros._id" v-for="pros in prostates">
                                                <td v-if="  pros.consultation == consultation2._id ">{{pros.dimensionsPrs}}</td>
                                                <td v-if="  pros.consultation == consultation2._id ">{{pros.volumePrs}}</td>
                                                <td v-if="  pros.consultation == consultation2._id ">{{pros.echostructurePrs}}</td>
                                                <td v-if="  pros.consultation == consultation2._id ">{{pros.contoursPrs}}</td>
                                                <td v-if="  pros.consultation == consultation2._id ">
                                                    <a @click.prevent="editProstates(pros)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteProstates(pros._id)" href="#"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>Testicules Gauche</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row divInputsRein">
                                            <input v-model="mmGch" class="form-control" type="text" placeholder="mm">
                                            <select v-model="contoursGch" class="form-control">
                                                <option value="" disabled selected>Les contours sont...</option>
                                                <option>réguliers</option>
                                                <option>irreguliers</option>
                                            </select>
                                            <select v-model="echostructureGch" class="form-control">
                                                <option value="" disabled selected>L’échostructure est ... </option>
                                                <option>homogène</option>
                                                <option>hétérogène</option>
                                            </select>
                                            <input v-model="AvEcDpCGch" class="form-control" type="text" placeholder="Aspect de la vascularisation à l’écho-Doppler couleur">
                                            <button v-if="myTesticuleGauches" @click.prevent="updateTesticulesGch()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                            <button v-else @click.prevent="addNewTesticulesGch" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                        </div>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>mm</th>
                                                <th>Contours </th>
                                                <th>L’échostructure</th>
                                                <th>Aspect de la vascularisation à l’écho-Doppler couleur</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="testicGch._id" v-for="testicGch in testiculesGch">
                                                <td v-if="  testicGch.consultation == consultation2._id ">{{testicGch.mmGch}}</td>
                                                <td v-if="  testicGch.consultation == consultation2._id ">{{testicGch.contoursGch}}</td>
                                                <td v-if="  testicGch.consultation == consultation2._id ">{{testicGch.echostructureGch}}</td>
                                                <td v-if="  testicGch.consultation == consultation2._id ">{{testicGch.AvEcDpCGch}}</td>
                                                <td v-if="  testicGch.consultation == consultation2._id ">
                                                    <a @click.prevent="editTesticulesGch(testicGch)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteTesticulesGch(testicGch._id)" href="#"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>Testicules droit</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row divInputsRein">
                                            <input v-model="mmDr" class="form-control" type="text" placeholder="mm">
                                            <select v-model="contoursDr" class="form-control">
                                                <option value="" disabled selected>Les contours sont...</option>
                                                <option>réguliers</option>
                                                <option>irreguliers</option>
                                            </select>
                                            <select v-model="echostructureDr" class="form-control">
                                                <option value="" disabled selected>L’échostructure est ... </option>
                                                <option>homogène</option>
                                                <option>hétérogène</option>
                                            </select>
                                            <input v-model="AvEcDpCDr" class="form-control" type="text" placeholder="Aspect de la vascularisation à l’écho-Doppler couleur">
                                            <button v-if="myTesticuleDroit" @click.prevent="updateTesticulesDr()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                            <button v-else @click.prevent="addNewTesticulesDr" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                        </div>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>mm</th>
                                                <th>Contours</th>
                                                <th>L’échostructure</th>
                                                <th>Aspect de la vascularisation à l’écho-Doppler couleur</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="testicDr._id" v-for="testicDr in testiculesDr">
                                                <td v-if="  testicDr.consultation == consultation2._id ">{{testicDr.mmDr}}</td>
                                                <td v-if="  testicDr.consultation == consultation2._id ">{{testicDr.contoursDr}}</td>
                                                <td v-if="  testicDr.consultation == consultation2._id ">{{testicDr.echostructureDr}}</td>
                                                <td v-if="  testicDr.consultation == consultation2._id ">{{testicDr.AvEcDpCDr}}</td>
                                                <td v-if="  testicDr.consultation == consultation2._id ">
                                                    <a @click.prevent="editTesticulesDr(testicDr)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteTesticulesDr(testicDr._id)" href="#"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>Épididymes</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="epidDr" class="col-sm-4 col-form-label">Droit</label>
                                            <div class="col-sm-8">
                                                <input v-model="epidDr" type="text"  class="form-control" id="epidDr" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="epidGch" class="col-sm-4 col-form-label">Gauche</label>
                                            <div class="col-sm-8">
                                                <input v-model="epidGch" type="text" class="form-control" id="epidGch">
                                            </div>
                                        </div>
                                        <button v-if="myEpididymes " @click.prevent="updateEpid()"  class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                        <button v-else @click.prevent="addNewEpid" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Droit</th>
                                                <th>Gauche</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="epid._id" v-for="epid in epididymes">
                                                <td v-if="  epid.consultation == consultation2._id ">{{epid.epidDr}}</td>
                                                <td v-if="  epid.consultation == consultation2._id ">{{epid.epidGch}}</td>
                                                <td v-if="  epid.consultation == consultation2._id ">
                                                    <a @click.prevent="editEpid(epid)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteEpid(epid._id)" href="#"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>Hydrocèle</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="hydrDr" class="col-sm-4 col-form-label">Droit</label>
                                            <div class="col-sm-8">
                                                <input v-model="hydrDr" type="text"  class="form-control" id="hydrDr" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="hydrGch" class="col-sm-4 col-form-label">Gauche</label>
                                            <div class="col-sm-8">
                                                <input v-model="hydrGch" type="text" class="form-control" id="hydrGch">
                                            </div>
                                        </div>
                                        <button v-if="myHydrocele" @click.prevent="updateHydr()"  class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                        <button v-else @click.prevent="addNewHydr" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Droit</th>
                                                <th>Gauche</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="hydr._id" v-for="hydr in hydroceles">
                                                <td v-if="  hydr.consultation == consultation2._id ">{{hydr.hydrDr}}</td>
                                                <td v-if="  hydr.consultation == consultation2._id ">{{hydr.hydrGch}}</td>
                                                <td v-if="  hydr.consultation == consultation2._id ">
                                                    <a @click.prevent="editHydr(hydr)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteHydr(hydr._id)" href="#"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>Varicocèle</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="varicDr" class="col-sm-4 col-form-label">Droit</label>
                                            <div class="col-sm-8">
                                                <input v-model="varicDr" type="text"  class="form-control" id="varicDr" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="varicGch" class="col-sm-4 col-form-label">Gauche</label>
                                            <div class="col-sm-8">
                                                <input v-model="varicGch" type="text" class="form-control" id="varicGch">
                                            </div>
                                        </div>
                                        <button v-if="myVaricocele" @click.prevent="updateVaric()"  class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                        <button v-else @click.prevent="addNewVaric" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Droit</th>
                                                <th>Gauche</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="varic._id" v-for="varic in varicoceles">
                                                <td v-if="  varic.consultation == consultation2._id ">{{varic.varicDr}}</td>
                                                <td v-if="  varic.consultation == consultation2._id ">{{varic.varicGch}}</td>
                                                <td v-if="  varic.consultation == consultation2._id ">
                                                    <a @click.prevent="editVaric(varic)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteVaric(varic._id)" href="#"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>Pancréas</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row">
                                            <div class="divInput">
                                            <input v-model="pancreas" type="text" class="form-control" placeholder="pancréas">
                                            </div>
                                            <div class="divInput">
                                            <input v-model="rmqPancreas" type="text" class="form-control" placeholder="remarque">
                                            </div>
                                            <button v-if="myPancreas" @click.prevent="updatePanc()"  class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                            <button v-else @click.prevent="addNewPanc" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                        </div>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>pancréas</th>
                                                <th>Remarque</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="panc._id" v-for="panc in pancreases">
                                                <td v-if="  panc.consultation == consultation2._id ">{{panc.pancreas}}</td>
                                                <td v-if="  panc.consultation == consultation2._id ">{{panc.rmqPancreas}}</td>
                                                <td v-if="  panc.consultation == consultation2._id ">
                                                    <a @click.prevent="editPanc(panc)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deletePanc(panc._id)" href="#"><i class="fas fa-trash-alt"></i></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="radiologique && echoFemme && consultation && cons" class="enregistrementRad mt-2 row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-title">
                                    <h5>SAC GESTATIONNEL</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="nombre" class="col-sm-3 col-form-label">Nombre</label>
                                            <div class="col-sm-4">
                                                <input v-model="nombre" type="text"  class="form-control" id="nombre" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="position" class="col-sm-3 col-form-label">Position</label>
                                            <div class="col-sm-4">
                                                <input v-model="position" type="text" class="form-control" id="position">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="forme" class="col-sm-3 col-form-label">Forme</label>
                                            <div class="col-sm-4">
                                                <input v-model="forme" type="text" class="form-control" id="forme">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="diametre" class="col-sm-3 col-form-label">Diamètre</label>
                                            <div class="col-sm-4">
                                                <select v-model="diametre" class="form-control">
                                                <option value="" disabled selected>diamètre...</option>
                                                <option>longitudinale</option>
                                                <option>transverse</option>
                                                <option>antéropostérieur</option>
                                            </select>
                                            </div>
                                        </div>
                                        <button v-if="mySacGest" @click.prevent="updateSacGests()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                        <button v-else @click.prevent="addNewSacGests" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Position</th>
                                                <th>Forme</th>
                                                <th>Diamètre</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="sac._id" v-for="sac in sacGests">
                                                <td v-if="  sac.consultation == consultation2._id ">{{sac.nombre}}</td>
                                                <td v-if="  sac.consultation == consultation2._id ">{{sac.position}}</td>
                                                <td v-if="  sac.consultation == consultation2._id ">{{sac.forme}}</td>
                                                <td v-if="  sac.consultation == consultation2._id ">{{sac.diametre}}</td>
                                                <td v-if="  sac.consultation == consultation2._id ">
                                                    <a @click.prevent="editSacGests(sac)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteSacGests(sac._id)" href="#"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>Embryon</h5>
                                </div>
                                <div class="col-md-12">
                                        <h3>Mensurations : </h3>
                                        <form>
                                            <div class="form-group row">
                                                <label for="lcc" class="col-sm-3 col-form-label">LCC</label>
                                                <div class="col-sm-4">
                                                    <input v-model="lcc" type="text"  class="form-control" id="lcc" >
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="bip" class="col-sm-3 col-form-label">BIP</label>
                                                <div class="col-sm-4">
                                                    <input v-model="bip" type="text" class="form-control" id="bip">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="fl" class="col-sm-3 col-form-label">FL</label>
                                                <div class="col-sm-4">
                                                    <input v-model="fl" type="text" class="form-control" id="fl">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="dat" class="col-sm-3 col-form-label">DAT</label>
                                                <div class="col-sm-4">
                                                    <input v-model="dat" type="text" class="form-control" id="dat">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="hc" class="col-sm-3 col-form-label">HC</label>
                                                <div class="col-sm-4">
                                                    <input v-model="hc" type="text" class="form-control" id="hc">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="autresMens" class="col-sm-3 col-form-label">Autres</label>
                                                <div class="col-sm-4">
                                                    <input v-model="autresMens" type="text" class="form-control" id="autresMens">
                                                </div>
                                            </div>
                                            <button v-if="myMens" @click.prevent="updateMens()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                            <button v-else @click.prevent="addNewMens" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                        </form>
                                        <div class="table-responsive">
                                            <table class="main-table text-center table table-bordered">
                                                <tr>
                                                    <th>LCC</th>
                                                    <th>BIP</th>
                                                    <th>FL</th>
                                                    <th>DAT</th>
                                                    <th>HC</th>
                                                    <th>Autres</th>
                                                    <th>Control</th>
                                                </tr>
                                                <tr v-bind:key="mens._id" v-for="mens in mensurations">
                                                    <td v-if="  mens.consultation == consultation2._id ">{{mens.lcc}}</td>
                                                    <td v-if="  mens.consultation == consultation2._id ">{{mens.bip}}</td>
                                                    <td v-if="  mens.consultation == consultation2._id ">{{mens.fl}}</td>
                                                    <td v-if="  mens.consultation == consultation2._id ">{{mens.dat}}</td>
                                                    <td v-if="  mens.consultation == consultation2._id ">{{mens.hc}}</td>
                                                    <td v-if="  mens.consultation == consultation2._id ">{{mens.autresMens}}</td>
                                                    <td v-if="  mens.consultation == consultation2._id ">
                                                        <a @click.prevent="editMens(mens)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                        <a @click.prevent="deleteMens(mens._id)" href="#"><i class="fas fa-trash-alt"></i></a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="position" class="col-sm-3 col-form-label">Position</label>
                                            <div class="col-sm-4">
                                                <select v-model="positionEmb" class="form-control">
                                                    <option value="" disabled selected>position...</option>
                                                    <option>siège</option>
                                                    <option>transverse</option>
                                                    <option>oblique</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="activite" class="col-sm-3 col-form-label">Activité cardiaque</label>
                                            <div class="col-sm-4">
                                                <select v-model="activiteCardiaque" class="form-control">
                                                    <option value="" disabled selected>activité cardiaque...</option>
                                                    <option>Absente</option>
                                                    <option>Présente</option>
                                                </select>
                                                <input style="margin-top: 10px" v-model="fcActiv" type="text" placeholder="FC= ...b/min" class="form-control" id="fcActiv">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="mouvement" class="col-sm-3 col-form-label">Mouvement fœtus</label>
                                            <div class="col-sm-4">
                                                <select v-model="mouvementFoetus" class="form-control">
                                                    <option value="" disabled selected>mouvement fœtus...</option>
                                                    <option>Absent</option>
                                                    <option>Présent</option>
                                                    <option>Lent-rapide</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="liquide" class="col-sm-3 col-form-label">Liquide amniotique</label>
                                            <div class="col-sm-4">
                                                <select v-model="liquideAmniotique" class="form-control">
                                                    <option value="" disabled selected>Quantité...</option>
                                                    <option>Normale</option>
                                                    <option>Excès</option>
                                                    <option>Peu</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="placenta" class="col-sm-3 col-form-label">Placenta</label>
                                            <div class="col-sm-3">
                                                <select v-model="placenta1" class="form-control">
                                                    <option value="" disabled selected>...</option>
                                                    <option>bas inséré</option>
                                                    <option>non bas inséré</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-3">
                                                <select v-model="placenta2" class="form-control">
                                                    <option value="" disabled selected>...</option>
                                                    <option>Antérieur</option>
                                                    <option>Postérieur</option>
                                                    <option>Fundique</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-3">
                                                <select v-model="placenta3" class="form-control">
                                                    <option value="" disabled selected>...</option>
                                                    <option>Laterodroit</option>
                                                    <option>laterogauche</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="ageGest" class="col-sm-3 col-form-label">Age gestationnel</label>
                                            <div class="col-sm-4">
                                                <input v-model="ageGestationnel" type="text" class="form-control" id="ageGest">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="datePresume" class="col-sm-3 col-form-label">Date présumé d’accouchement</label>
                                            <div class="col-sm-4">
                                                <input v-model="datePresume" type="date" class="form-control" id="datePresume">
                                            </div>
                                        </div>
                                        <button v-if="myEmbryon" @click.prevent="updateEmbr()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                        <button v-else @click.prevent="addNewEmbr" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Position</th>
                                                <th>Activité cardiaque</th>
                                                <th>Mouvement fœtus</th>
                                                <th>Liquide amniotique</th>
                                                <th>Placenta</th>
                                                <th>Age gestationnel</th> 
                                                <th>Date présumé d’accouchement</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="embr._id" v-for="embr in embryons">
                                                <td v-if="  embr.consultation == consultation2._id ">{{ embr.positionEmb }}</td>
                                                <td v-if="  embr.consultation == consultation2._id ">
                                                    <tr>
                                                        <td>{{embr.activiteCardiaque}}</td>
                                                        <td>{{embr.fcActiv}}</td>
                                                    </tr>
                                                </td>
                                                <td v-if="  embr.consultation == consultation2._id ">{{embr.mouvementFoetus}}</td>
                                                <td v-if="  embr.consultation == consultation2._id ">{{embr.liquideAmniotique}}</td>
                                                <td v-if="  embr.consultation == consultation2._id ">
                                                    <tr>
                                                        <td>{{embr.placenta1}}</td>
                                                        <td>{{embr.placenta2}}</td>
                                                        <td>{{embr.placenta3}}</td>
                                                    </tr>
                                                </td>
                                                <td v-if="  embr.consultation == consultation2._id ">{{embr.ageGestationnel}}</td>
                                                <td v-if="  embr.consultation == consultation2._id ">{{embr.datePresume}}</td>
                                                <td v-if="  embr.consultation == consultation2._id ">
                                                    <a @click.prevent="editEmbr(embr)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteEmbr(embr._id)" href="#"><i class="fas fa-trash-alt"></i></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="radiologique && autresRadio && consultation && cons" class="enregistrementRad mt-2 row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Autres</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="ecg" class="col-sm-3 col-form-label">ECG</label>
                                            <div class="col-sm-4">
                                                <input v-model="ecg" type="text"  class="form-control" id="ecg" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="radioThoracique" class="col-sm-3 col-form-label">RADIOGRAPHIE THORACIQUE</label>
                                            <div class="col-sm-4">
                                                <input v-model="radioThoracique" type="text" class="form-control" id="radioThoracique">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="scanner" class="col-sm-3 col-form-label">SCANNER</label>
                                            <div class="col-sm-4">
                                                <input v-model="scanner" type="text" class="form-control" id="scanner">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="irm" class="col-sm-3 col-form-label">IRM</label>
                                            <div class="col-sm-4">
                                                <input v-model="irm" type="text" class="form-control" id="irm">
                                            </div>
                                        </div>
                                        <button v-if="myAutreRad" @click.prevent="updateAutreRad()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                        <button v-else @click.prevent="addNewAutreRad" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>ECG</th>
                                                <th>ADIOGRAPHIE THORACIQUE</th>
                                                <th>SCANNER</th>
                                                <th>IRM</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="autreRad._id" v-for="autreRad in autresRadio2">
                                                <td v-if="  autreRad.consultation == consultation2._id ">{{autreRad.ecg}}</td>
                                                <td v-if="  autreRad.consultation == consultation2._id ">{{autreRad.radioThoracique}}</td>
                                                <td v-if="  autreRad.consultation == consultation2._id ">{{autreRad.scanner}}</td>
                                                <td v-if="  autreRad.consultation == consultation2._id ">{{autreRad.irm}}</td>
                                                <td v-if="  autreRad.consultation == consultation2._id ">
                                                    <a @click.prevent="editAutreRad(autreRad)" href="#"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a @click.prevent="deleteAutreRad(autreRad._id)" href="#"><i class="fas fa-trash-alt"></i></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-if="myOrdns" class="modal-title" id="addNewLabel">Modifier ordonnance</h5>
                        <h5 v-else class="modal-title" id="addNewLabel">Nouveau ordonnance</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group row">
                                <div class="col-sm-12">
                                <input v-model="medicament" type="text" class="form-control" id="medicament" placeholder="Médicament">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-12">
                                <input v-model="quantite" type="text" class="form-control" id="quantite" placeholder="Quantité">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-12">
                                <input v-model="prise" type="text" class="form-control" id="prise" placeholder="Prise">
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-12">
                                <input v-model="periode" type="text" class="form-control" id="periode" placeholder="période">
                                </div>
                            </div>
                            
                            <div class="form-group row">
                                <div class="col-sm-12">
                                <input v-model="nbrParJour" type="text" class="form-control" id="nbrParJour" placeholder="Nombre par jour">
                                </div>
                            </div>

                            <div class="mt form-group row">
                                <label for="quand" class="col-sm-2 col-form-label">Quand: </label>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input v-model="quand" type="radio" value="avant" id="avant" name="quand" class="custom-control-input">
                                    <label class="custom-control-label" for="avant">Avant</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input v-model="quand" type="radio" value="pendant" id="pendant" name="quand" class="custom-control-input">
                                    <label class="custom-control-label" for="pendant">Pendant</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input v-model="quand" type="radio" value="aprés" id="apres" name="quand" class="custom-control-input">
                                    <label class="custom-control-label" for="apres">Après</label>
                                </div>
                            </div>
                            
                            <div class="form-group row">
                                <div class="col-sm-12">
                                <input v-model="remarque" type="text" class="form-control" id="remarque" placeholder="Remarque">
                                </div>
                            </div>                            

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>

                        <input v-if="myOrdns" type="submit" @click.prevent="updateOrdonnance()" class="btn btn-success" value="Modifier">
                        <input v-else type="submit" @click.prevent="addnewOrdonnance" class="btn btn-success" value="Enregistrer">
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>

import $ from 'jquery';
import axios from 'axios';

import { mapActions, mapGetters } from 'vuex'

import { mapState } from 'vuex';

var url ='localhost:5000'
//var url ='backend.storeino.info'

export default {
    data:function(){
    return{
            consultation: true,
            ordonnance: false,
            certificats: false,
            remarques: false,
            examen: true,
            bilan: false,
            normal : true,
            radiologique : false,
            certificatMedical : true,
            medicalMariage : false,
            puberteMariage : false,
            imprimerCertMdc : false,
            normalEcho : true,
            echoFemme : false,
            autresRadio : false,
            itemHeight: 39,
            selectedPatient : null,
            selected: 0,
            query:'',
            visible: false,
            shouldReset: true,
            patients:[],
            consulations:[],
            date : '',
            idCons:'',
            cons: true,
            adding: false,
            ordonnances:[],
            quantite : '',
            prise : '',
            periode : '',
            nbrParJour : '',
            quand : '',
            remarque : '',
            medicament : '',
            certificatsMedicaux:[],
            dateDebut : '',
            dateFin : '',
            duree : '',
            lastCons:'',
            activerTd : false,
            myOrdns : null,
            foies:[],
            tailleFoi : '',
            structureFoi :'',
            contoursFoi :'',
            autresAnomalies :'',
            myFoie: null,
            vesicules :[],
            tailleVsB : '',
            paroisVsB : '',
            formeVsB : '',
            autresVsB : '',
            myVesicule: null,
            voies : [],
            intrahEpatique : '',
            extrahepatique : '',
            myVoie: null,
            rates:[],
            tailleRat : '',
            structureRat : '',
            contoursRat : '',
            autresAnomaliesRat : '',
            myRate: null,
            reinsDroit : [],
            dimensions : '',
            differenciation : '',
            dilatation: '',
            myReinDroit : null,
            reinsGauche : [],
            dimensionsGch : '',
            differenciationGch : '',
            dilatationGch : '',
            myReinGauche : '',
            vessies: [],
            repletion : '',
            contenu : '',
            parois : '',
            residuPostMictionnel : '',
            myVessies : null,
            prostates : [],
            dimensionsPrs : '',
            volumePrs : '',
            echostructurePrs : '',
            contoursPrs : '',
            myProstate : null,
            testiculesGch: [],
            mmGch: '',
            contoursGch : '',
            echostructureGch : '',
            AvEcDpCGch : '',
            myTesticuleGauches : null,
            testiculesDr : [],
            mmDr: '',
            contoursDr : '',
            echostructureDr : '',
            AvEcDpCDr : '',
            myTesticuleDroit : null,
            epididymes : [],
            epidDr : '',
            epidGch : '',
            myEpididymes : null,
            hydroceles : [],
            hydrDr : '',
            hydrGch : '',
            myHydrocele : null,
            varicoceles : [],
            varicDr : '',
            varicGch : '',
            myVaricocele : null,
            sacGests : [],
            nombre : '',
            position : '',
            forme : '',
            diametre : '',
            mySacGest : null,
            embryons : [],
            positionEmb : '',
            activiteCardiaque : '',
            fcActiv : '',
            mouvementFoetus : '',
            liquideAmniotique : '',
            placenta1 : '',
            placenta2 : '',
            placenta3 : '',
            ageGestationnel : '',
            datePresume : '',
            myEmbryon : null,
            mensurations : [],
            lcc : '',
            bip : '',
            fl : '',
            dat : '',
            hc : '',
            autresMens : '',
            myMens : null,
            autresRadio2 : [],
            ecg : '',
            radioThoracique : '',
            scanner : '',
            irm : '',
            myAutreRad : null,
            biologies : [],
            NfsPq : '',
            TSHus : '',
            T3 : '',
            T4 : '',
            Glycemie : '',
            HBGA1c : '',
            LDL : '',
            HDL : '',
            TG : '',
            CT : '',
            PSA : '',
            TP : '',
            TCK : '',
            INR : '',
            Groupage : '',
            TPHA : '',
            VDRL : '',
            SerologieToxo : '',
            SerologieRub : '',
            AutresBio : '',
            myBiologie : null,
            appareils:[],
            abdominal : '',
            pleuropulmonaire : '',
            cardiovasculaire : '',
            gynecologique : '',
            osteoarticulaire : '',
            reste : '',
            myAppareil : null,
            pancreases : [],
            pancreas : '',
            rmqPancreas : '',
            myPancreas : null,
            dateNow : new Date(),
        }
    },
    created: function(){
        this.consultationBtn();
        this.getPatients();
        this.getConsultaions();
        this.getProfile();
        this.getAppareils();
        this.getBiologies();
        this.getOrdonnance();
        this.getFoie();
        this.getVesicules();
        this.getVoies();
        this.getRates();
        this.getReinsDroit();
        this.getReinsGauche();
        this.getVessies();
        this.getProstates();
        this.getTesticulesGch();
        this.getTesticulesDr();
        this.getEpididymes();
        this.getHydroceles();
        this.getVaricoceles();
        this.getSacGests();
        this.getEmbryons();
        this.getMensurations();
        this.getAutresRadio();
        this.getPancreases();
        //this.getAntecedents();
        //console.log(this.idCons);
    },
    computed:{
        ...mapState(['consultations']),
        consultation2(){
            return this.consultations.find(c => c._id == this.$route.params._id);
        },
        matches(){
                console.log(this.query);
            if(this.query == ''){
                return [];
            }
            return this.patients.filter((patient) => patient.nom.toLowerCase().includes(this.query.toLowerCase()))
        },
        ...mapGetters(['user']),
    },
    methods: {
        async saveConsultation(){
            if(this.selectedPatient != null){
                this.consultation2.patient = this.selectedPatient._id;
                await this.$store.dispatch('editConsultation', this.consultation2);
            }
            else{
                await this.$store.dispatch('editConsultation', this.consultation2);
                //this.$swal('Modifier' , 'modifier avec Succès', 'warning');
            }
            
        },








        toggleVisible(){
            var idPat = document.getElementById('idPatient').textContent;
            console.log(idPat);
            this.visible = !this.visible;
            setTimeout(() => {
                this.$refs.input.focus();
            }, 50);  
        },
        patientClicked(index){
            this.selected = index;
            this.selectPatient();   
            
            //console.log(this.matches[index]);
            //this.visible = false;
            //document.getElementById('inputPatient').innerHTML = this.matches[index.nom];
        },
        selectPatient(){
            var idPat = document.getElementById('idPatient').textContent;
            console.log(idPat)
            this.selectedPatient = this.matches[this.selected];
            this.visible = false;

            if(this.shouldReset){
                this.query = '';
                this.selected = 0;
            }

            JSON.parse(JSON.stringify(this.selectedPatient));
        },
        up(){
            if(this.selected == 0){
                return;
            }
            this.selected -= 1;
            this.scrollToItem();
        },
        scrollToItem(){
            this.$refs.optionsList.scrollTop = this.selected * this.itemHeight;
        },
        down(){
            if(this.selected > this.matches.length - 1){
                return;
            }   
            this.selected += 1;
            this.scrollToItem();
        },

         printContent2 : function(el){
            var restorepage = document.body.innerHTML;
            var printcontent = document.getElementById(el).innerHTML;
            //printcontent.print();
            document.body.innerHTML = printcontent;
            window.print();
            document.body.innerHTML = restorepage;
        },

        getPatients(){
                axios.get('http://'+url+'/patients/')
                .then(res => this.patients = res.data)
                .catch(err => console.log(err));
        },
        getConsultaions(){
                axios.get('http://'+url+'/consultations')
                .then(res => this.consulations = res.data)
                .catch(err => console.log(err));
        },
        
        addnewCons(){
           

            if(this.date !== '' && document.getElementById('inputPatint').textContent !== '' ){

                var idPat = document.getElementById('idPatient').textContent;
                console.log(idPat);

                let newCons = {
                    date: this.date,
                    patient: idPat
                }

                axios.post('http://'+url+'/consultations/'+this.user._id+'/addCons', newCons)
                .then(res => {
                    this.consulations = [res.data, ...this.consulations];
                    this.lastCons = '';
                    this.lastCons =[res.data, ...this.lastCons];
                    console.log(this.lastCons._id);
                    /*var lastPosition = this.consulations.length -1;

                    this.idCons = this.consulations[lastPosition]._id;
                    console.log(this.idCons);*/
                });
                this.cons = true;
            }

        },

        getAppareils(){
                axios.get('http://'+url+'/examensClinique/appareil')
                .then(res => this.appareils = res.data)
                .catch(err => console.log(err));
        },

        addNewAppareil(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.abdominal !== '' || this.pleuropulmonaire !== '' || this.cardiovasculaire !== '' || 
            this.gynecologique !== '' || this.osteoarticulaire !== '' || this.reste !== '' ){
                /*var lastPosition = this.consulations.length -1;
                    this.idCons = this.consulations[lastPosition]._id;*/

                    let newAppareil = {
                        abdominal : this.abdominal,
                        pleuropulmonaire : this.pleuropulmonaire,
                        cardiovasculaire : this.cardiovasculaire,
                        gynecologique : this.gynecologique,
                        osteoarticulaire : this.osteoarticulaire,
                        reste : this.reste,
                        consultation : lsIDcons
                    };

                axios.post('http://'+url+'/examensClinique/addExamAppareil', newAppareil)
                .then(res => {
                    this.appareils = [res.data, ...this.appareils];
                    this.abdominal = ''; this.pleuropulmonaire = '';
                    this.cardiovasculaire = ''; this.gynecologique = '';
                    this.osteoarticulaire = ''; this.reste = '';
                });
                this.cons = true;
            }

        },

        deleteAppareil(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/examensClinique/deleteExmAppareil/${_id}`)             
                .then( () =>{
                    this.appareils = this.appareils.filter(Appr => Appr._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getAppareils();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myAppareil = null;
            }
        },

        editAppareil(Appr){
            this.myAppareil = Appr;
            this.abdominal = Appr.abdominal;
            this.pleuropulmonaire = Appr.pleuropulmonaire;
            this.cardiovasculaire = Appr.cardiovasculaire;
            this.gynecologique = Appr.gynecologique;
            this.osteoarticulaire = Appr.osteoarticulaire;
            this.reste = Appr.reste;

        },

        updateAppareil(){
            let App = {
                ...this.myAppareil,
                abdominal : this.abdominal,
                pleuropulmonaire : this.pleuropulmonaire,
                cardiovasculaire : this.cardiovasculaire,
                gynecologique : this.gynecologique,
                osteoarticulaire : this.osteoarticulaire,
                reste : this.reste,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.abdominal !== '' || this.pleuropulmonaire !== '' || this.cardiovasculaire !== '' || 
            this.gynecologique !== '' || this.osteoarticulaire !== '' || this.reste !== '' ){
                axios.put('http://'+url+'/examensClinique/updateExmAppareil/'+App._id, App)
                .then(res => {
                    this.appareils = this.appareils.map(ap => {
                        if(res.data._id === ap._id){
                            return res.data
                        }
                        return ap;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getAppareils();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myAppareil = null;
                this.abdominal = ''; this.pleuropulmonaire = '';
                this.cardiovasculaire = ''; this.gynecologique = '';
                this.osteoarticulaire = ''; this.reste = '';
            }
        },

        getBiologies(){
                axios.get('http://'+url+'/examensParaClin/Bio')
                .then(res => this.biologies = res.data)
                .catch(err => console.log(err));
        },

        addNewBiologie(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.NfsPq !== '' || this.TSHus !== '' || this.T3 !== '' || this.T4 !== '' || 
            this.Glycemie !== '' || this.HBGA1c !== '' || this.LDL !== '' || this.HDL !== '' || 
            this.TG !== '' || this.CT !== '' || this.PSA !== '' || this.TP !== '' || 
            this.TCK !== '' || this.INR !== '' || this.Groupage !== '' || this.TPHA !== '' || 
            this.VDRL !== '' || this.SerologieToxo !== '' || this.SerologieRub !== '' || this.AutresBio !== '' ){
                /*var lastPosition = this.consulations.length -1;
                    this.idCons = this.consulations[lastPosition]._id;*/

                    let newBiologie = {
                        NfsPq : this.NfsPq,
                        TSHus : this.TSHus,
                        T3 : this.T3,
                        T4 : this.T4,
                        Glycemie : this.Glycemie,
                        HBGA1c : this.HBGA1c,
                        LDL : this.LDL,
                        HDL : this.HDL,
                        TG : this.TG,
                        CT : this.CT,
                        PSA : this.PSA,
                        TP : this.TP,
                        TCK : this.TCK,
                        INR : this.INR,
                        Groupage : this.Groupage,
                        TPHA : this.TPHA,
                        VDRL : this.VDRL,
                        SerologieToxo : this.SerologieToxo,
                        SerologieRub : this.SerologieRub,
                        AutresBio : this.AutresBio,
                        consultation : lsIDcons
                    };

                axios.post('http://'+url+'/examensParaClin/addExamBiologie', newBiologie)
                .then(res => {
                    this.biologies = [res.data, ...this.biologies];

                    this.NfsPq = '' ; this.TSHus = '';  this.T3 = '';  this.T4 = '';  
                    this.Glycemie = '' ;  this.HBGA1c = '' ; this.LDL = '' ; this.HDL = '' ; 
                    this.TG = '' ; this.CT = '' ; this.PSA = '' ; this.TP = '' ;
                    this.TCK = '' ; this.INR = '' ; this.Groupage = '' ; this.TPHA = '' ;
                    this.VDRL = '' ; this.SerologieToxo = '' ; this.SerologieRub = '' ; this.AutresBio = '';
                });
                this.cons = true;
            }

        },

        deleteBiologie(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/examensParaClin/deleteExamBio/${_id}`)             
                .then( () =>{
                    this.biologies = this.biologies.filter(bio => bio._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getBiologies();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myBiologie = null;
            }
        },

        editBiologie(bio){
            this.myBiologie = bio;

            this.NfsPq = bio.NfsPq
            this.TSHus = bio.TSHus
            this.T3 = bio.T3
            this.T4 = bio.T4
            this.Glycemie = bio.Glycemie
            this.HBGA1c = bio.HBGA1c
            this.LDL = bio.LDL
            this.HDL = bio.HDL
            this.TG = bio.TG
            this.CT = bio.CT
            this.PSA = bio.PSA
            this.TP = bio.TP
            this.TCK = bio.TCK
            this.INR = bio.INR
            this.Groupage = bio.Groupage
            this.TPHA = bio.TPHA
            this.VDRL = bio.VDRL
            this.SerologieToxo = bio.SerologieToxo
            this.SerologieRub = bio.SerologieRub
            this.AutresBio = bio.AutresBio
        },

        updateBiologie(){
            let Bio = {
                ...this.myBiologie,

                NfsPq : this.NfsPq,
                TSHus : this.TSHus,
                T3 : this.T3,
                T4 : this.T4,
                Glycemie : this.Glycemie,
                HBGA1c : this.HBGA1c,
                LDL : this.LDL,
                HDL : this.HDL,
                TG : this.TG,
                CT : this.CT,
                PSA : this.PSA,
                TP : this.TP,
                TCK : this.TCK,
                INR : this.INR,
                Groupage : this.Groupage,
                TPHA : this.TPHA,
                VDRL : this.VDRL,
                SerologieToxo : this.SerologieToxo,
                SerologieRub : this.SerologieRub,
                AutresBio : this.AutresBio,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.NfsPq !== '' || this.TSHus !== '' || this.T3 !== '' || this.T4 !== '' || 
            this.Glycemie !== '' || this.HBGA1c !== '' || this.LDL !== '' || this.HDL !== '' || 
            this.TG !== '' || this.CT !== '' || this.PSA !== '' || this.TP !== '' || 
            this.TCK !== '' || this.INR !== '' || this.Groupage !== '' || this.TPHA !== '' || 
            this.VDRL !== '' || this.SerologieToxo !== '' || this.SerologieRub !== '' || this.AutresBio !== ''){
                axios.put('http://'+url+'/examensParaClin/updateExamenBio/'+Bio._id, Bio)
                .then(res => {
                    this.biologies = this.biologies.map(b => {
                        if(res.data._id === b._id){
                            return res.data
                        }
                        return b;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getBiologies();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myBiologie = null;
                this.NfsPq = '' ; this.TSHus = '';  this.T3 = '';  this.T4 = '';  
                this.Glycemie = '' ;  this.HBGA1c = '' ; this.LDL = '' ; this.HDL = '' ; 
                this.TG = '' ; this.CT = '' ; this.PSA = '' ; this.TP = '' ;
                this.TCK = '' ; this.INR = '' ; this.Groupage = '' ; this.TPHA = '' ;
                this.VDRL = '' ; this.SerologieToxo = '' ; this.SerologieRub = '' ; this.AutresBio = '';
            }
        },

        getOrdonnance(){
                axios.get('http://'+url+'/ordonnances')
                .then(res => this.ordonnances = res.data)
                .catch(err => console.log(err));
        },
        btnAjouterOrdonnance(){
            this.myOrdns = null;
            this.quantite = ''; this.prise = ''; this.periode = ''; this.nbrParJour = '';
                this.quand = ''; this.remarque=''; this.medicament = ''; 
        },
        addnewOrdonnance(){
            
            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;
            
            if(this.quantite !== '' || this.prise !== '' || this.periode !== '' ||  
            this.nbrParJour !== '' || this.quand !== '' || this.remarque !== '' ||  
            this.medicament !== '' ){

                    /*
                    var lastPosition = this.consulations.length - 1 ;
                    this.idCons = this.consulations[lastPosition]._id;
                    console.log(this.idCons);*/

                let newOrdonnance = {
                    quantite : this.quantite,
                    prise : this.prise,
                    periode : this.periode,
                    nbrParJour : this.nbrParJour,
                    quand : this.quand,
                    remarque : this.remarque,
                    medicament : this.medicament,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/ordonnances/addOrdns', newOrdonnance)
                .then(res => {
                    this.ordonnances = [res.data, ...this.ordonnances];
                    this.quantite = ''; this.prise = ''; this.periode = ''; this.nbrParJour = '';
                    this.quand = ''; this.remarque = ''; this.medicament = ''; 

                    $('#addNew').modal('hide');
                });
                this.cons = true;
            }

        },

        deleteOrdonnance(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/ordonnances/deleteOrdns/${_id}`)             
                .then( () =>{
                    this.ordonnances = this.ordonnances.filter(ordns => ordns._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getOrdonnance();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myOrdns = null;
            }
        },     
        
        editOrdonnance(ordns){
            this.myOrdns = ordns;
            this.quantite = ordns.quantite;
            this.prise = ordns.prise;
            this.periode = ordns.periode;
            this.nbrParJour = ordns.nbrParJour;
            this.quand = ordns.quand;
            this.remarque = ordns.remarque;
            this.medicament = ordns.medicament;
        },

        updateOrdonnance(){
            let Ord = {
                ...this.myOrdns,
                quantite: this.quantite,
                prise: this.prise,
                periode: this.periode,
                nbrParJour: this.nbrParJour,
                quand: this.quand,
                remarque: this.remarque,
                medicament: this.medicament,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.quantite !=='' || this.prise !=='' ||
                this.nbrParJour !=='' || this.quand || 
                this.remarque !=='' || this.medicament !=='' 
            ){
                axios.put('http://'+url+'/ordonnances/updateOrdns/'+Ord._id, Ord)
                .then(res => {
                    this.ordonnances = this.ordonnances.map(o => {
                        if(res.data._id === o._id){
                            return res.data
                        }
                        return o;
                    });
                    
                });
                $('#addNew').modal('hide');
                var typeInter = setInterval( () => {
                    this.getOrdonnance();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myOrdns = null;
                this.quantite = ''; this.prise = ''; this.periode = ''; this.nbrParJour = '';
                this.quand = ''; this.remarque=''; this.medicament = ''; 
            }
        },

        getFoie(){
                axios.get('http://'+url+'/foie')
                .then(res => this.foies = res.data)
                .catch(err => console.log(err));
        },

        addNewFoie(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.tailleFoi !=='' || this.structureFoi !=='' || this.contoursFoi !=='' || this.autresAnomalies !=='' ){
                let newFoie = {
                    tailleFoi : this.tailleFoi,
                    structureFoi : this.structureFoi,
                    contoursFoi : this.contoursFoi,
                    autresAnomalies : this.autresAnomalies,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/foie/addFoie', newFoie)
                .then(res => {
                    this.foies = [res.data, ...this.foies];
                    this.tailleFoi = '';
                    this.structureFoi = ''; 
                    this.contoursFoi = '';
                    this.autresAnomalies = ''; 
                });
                this.cons = true;
            }
        },

        deleteFoie(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/foie/deleteFoie/${_id}`)             
                .then( () =>{
                    this.foies = this.foies.filter(foi => foi._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getFoie();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myFoie = null;
            }
        },

        editFoie(foi){
            this.myFoie = foi;
            this.tailleFoi = foi.tailleFoi;
            this.structureFoi = foi.structureFoi;
            this.contoursFoi = foi.contoursFoi;
            this.autresAnomalies = foi.autresAnomalies; 
        },

        updateFoie(){
            let Foie = {
                ...this.myFoie,
                tailleFoi: this.tailleFoi,
                structureFoi: this.structureFoi,
                contoursFoi: this.contoursFoi,
                autresAnomalies: this.autresAnomalies, 
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.tailleFoi !=='' || this.structureFoi !=='' || this.contoursFoi !=='' || this.autresAnomalies !==''){
                axios.put('http://'+url+'/foie/updateFoie/'+Foie._id, Foie)
                .then(res => {
                    this.foies = this.foies.map(f => {
                        if(res.data._id === f._id){
                            return res.data
                        }
                        return f;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getFoie();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myFoie = null;
                this.tailleFoi = '';
                this.structureFoi = ''; 
                this.contoursFoi = '';
                this.autresAnomalies = ''; 
            }
        },

        getVesicules(){
                axios.get('http://'+url+'/vesiculeBiliaire')
                .then(res => this.vesicules = res.data)
                .catch(err => console.log(err));
        },

        addNewVesicule(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.tailleVsB !=='' || this.paroisVsB !=='' || this.formeVsB !=='' || this.autresVsB !=='' ){
                let newVesicule = {
                    tailleVsB : this.tailleVsB,
                    paroisVsB : this.paroisVsB,
                    formeVsB : this.formeVsB,
                    autresVsB : this.autresVsB,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/vesiculeBiliaire/addVscBil', newVesicule)
                .then(res => {
                    this.vesicules = [res.data, ...this.vesicules];
                    this.tailleVsB = '';
                    this.paroisVsB = ''; 
                    this.formeVsB = '';
                    this.autresVsB = ''; 
                });
                this.cons = true;
            }
        },

        deleteVesicule(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/vesiculeBiliaire/deleteVscBil/${_id}`)             
                .then( () =>{
                    this.vesicules = this.vesicules.filter(vesic => vesic._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getVesicules();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myVesicule = null;
            }
        },

        editVesicule(vesic){
            this.myVesicule = vesic;
            this.tailleVsB = vesic.tailleVsB;
            this.paroisVsB = vesic.paroisVsB;
            this.formeVsB = vesic.formeVsB;
            this.autresVsB = vesic.autresVsB; 
        }, 

        updateVesicule(){
            let Vesicule = {
                ...this.myVesicule,
                tailleVsB: this.tailleVsB,
                paroisVsB: this.paroisVsB,
                formeVsB: this.formeVsB,
                autresVsB: this.autresVsB,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.tailleVsB !=='' || this.paroisVsB !=='' || this.formeVsB !=='' || this.autresVsB !=='' ){
                axios.put('http://'+url+'/vesiculeBiliaire/updateVscBil/'+Vesicule._id, Vesicule)
                .then(res => {
                    this.vesicules = this.vesicules.map(v => {
                        if(res.data._id === v._id){
                            return res.data
                        }
                        return v;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getVesicules();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myVesicule = null;
                this.tailleVsB = '';
                this.paroisVsB = ''; 
                this.formeVsB = '';
                this.autresVsB = ''; 
            }
        },

        getVoies(){
                axios.get('http://'+url+'/voiesBiliaires')
                .then(res => this.voies = res.data)
                .catch(err => console.log(err));
        },

        addNewVoies(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.intrahEpatique !=='' || this.extrahepatique !==''){
                let newVoies = {
                    intrahEpatique : this.intrahEpatique,
                    extrahepatique : this.extrahepatique,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/voiesBiliaires/addVoiBil', newVoies)
                .then(res => {
                    this.voies = [res.data, ...this.voies];
                    this.intrahEpatique = '';
                    this.extrahepatique = ''; 
                });
                this.cons = true;
            }
        },

        deleteVoies(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/voiesBiliaires/deleteVoiBil/${_id}`)             
                .then( () =>{
                    this.voies = this.voies.filter(voi => voi._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getVoies();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myVoie = null;
            }
        },

        editVoies(voi){
            this.myVoie = voi;
            this.intrahEpatique = voi.intrahEpatique;
            this.extrahepatique = voi.extrahepatique; 
        },

        updateVoies(){
            let Voie = {
                ...this.myVoie,
                intrahEpatique: this.intrahEpatique,
                extrahepatique: this.extrahepatique,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.intrahEpatique !=='' || this.extrahepatique !==''){
                axios.put('http://'+url+'/voiesBiliaires/updateVoiBil/'+Voie._id, Voie)
                .then(res => {
                    this.voies = this.voies.map(vo => {
                        if(res.data._id === vo._id){
                            return res.data
                        }
                        return vo;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getVoies();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myVoie = null;
                this.intrahEpatique = '';
                this.extrahepatique = '';
            }
        },

        getRates(){
                axios.get('http://'+url+'/rates')
                .then(res => this.rates = res.data)
                .catch(err => console.log(err));
        },

        addNewRates(){


            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.tailleRat !=='' || this.structureRat !=='' || this.contoursRat !=='' || this.autresAnomaliesRat !==''){
                let NewRates = {
                    tailleRat : this.tailleRat,
                    structureRat : this.structureRat,
                    contoursRat : this.contoursRat,
                    autresAnomaliesRat : this.autresAnomaliesRat,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/rates/addRat', NewRates)
                .then(res => {
                    this.rates = [res.data, ...this.rates];
                    this.tailleRat = '';
                    this.structureRat = ''; 
                    this.contoursRat = '';
                    this.autresAnomaliesRat = ''; 
                });
                this.cons = true;
            }
        },

        deleteRates(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/rates/deleteRat/${_id}`)             
                .then( () =>{
                    this.rates = this.rates.filter(rat => rat._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getRates();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myRate = null;
            }
        },

        editRates(rat){
            this.myRate = rat;
            this.tailleRat = rat.tailleRat;
            this.structureRat = rat.structureRat;
            this.contoursRat = rat.contoursRat;
            this.autresAnomaliesRat = rat.autresAnomaliesRat; 
        },

        updateRates(){
            let Rate = {
                ...this.myRate,
                tailleRat: this.tailleRat,
                structureRat: this.structureRat,
                contoursRat: this.contoursRat,
                autresAnomaliesRat: this.autresAnomaliesRat,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.rate !=='' || this.rmqRate !==''){
                axios.put('http://'+url+'/rates/updateRat/'+Rate._id, Rate)
                .then(res => {
                    this.rates = this.rates.map(rt => {
                        if(res.data._id === rt._id){
                            return res.data
                        }
                        return rt;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getRates();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myRate = null;
                this.tailleRat = '';
                this.structureRat = ''; 
                this.contoursRat = '';
                this.autresAnomaliesRat = ''; 
            }
        },

        getReinsDroit(){
                axios.get('http://'+url+'/reinsDroit')
                .then(res => this.reinsDroit = res.data)
                .catch(err => console.log(err));
        },

        addNewReinsDroit(){


            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.dimensions !=='' || this.differenciation || this.dilatation ){
                let NewReinsDroit = {
                    dimensions : this.dimensions,
                    differenciation : this.differenciation,
                    dilatation : this.dilatation,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/reinsDroit/addReinDr', NewReinsDroit)
                .then(res => {
                    this.reinsDroit = [res.data, ...this.reinsDroit];
                    this.dimensions = '';
                    this.differenciation = ''; 
                    this.dilatation = '';
                });
                this.cons = true;
            }
        },

        deleteReinsDroit(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/reinsDroit/deleteReinDr/${_id}`)             
                .then( () =>{
                    this.reinsDroit = this.reinsDroit.filter(reinDr => reinDr._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getReinsDroit();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myReinDroit = null;
            }
        },

        editReinsDroit(reinDr){
            this.myReinDroit = reinDr;
            this.dimensions = reinDr.dimensions;
            this.differenciation = reinDr.differenciation;
            this.dilatation = reinDr.dilatation;
        },

        updateReinsDroit(){
            let ReinDr = {
                ...this.myReinDroit,
                dimensions: this.dimensions,
                differenciation: this.differenciation,
                dilatation: this.dilatation,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.dimensions !=='' || this.differenciation !=='' ||this.dilatation !==''){
                axios.put('http://'+url+'/reinsDroit/updateReinDr/'+ReinDr._id, ReinDr)
                .then(res => {
                    this.reinsDroit = this.reinsDroit.map(rd => {
                        if(res.data._id === rd._id){
                            return res.data
                        }
                        return rd;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getReinsDroit();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myReinDroit = null;
                this.dimensions = '';
                this.differenciation = '';
                this.dilatation = '';
            }
        },

        getReinsGauche(){
                axios.get('http://'+url+'/reinsGauche')
                .then(res => this.reinsGauche = res.data)
                .catch(err => console.log(err));
        },

        addNewReinsGauche(){


            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.dimensionsGch !=='' || this.differenciationGch !==''  || this.dilatationGch !=='' ){
                let NewReinsGauche = {
                    dimensionsGch : this.dimensionsGch,
                    differenciationGch : this.differenciationGch,
                    dilatationGch : this.dilatationGch,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/reinsGauche/addReinGch', NewReinsGauche)
                .then(res => {
                    this.reinsGauche = [res.data, ...this.reinsGauche];
                    this.dimensionsGch = '';
                    this.differenciationGch = ''; 
                    this.dilatationGch = '';
                });
                this.cons = true;
            }
        },

        deleteReinsGauche(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/reinsGauche/deleteReinGch/${_id}`)             
                .then( () =>{
                    this.reinsGauche = this.reinsGauche.filter(reinGch => reinGch._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getReinsGauche();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myReinGauche = null;
            }
        },

        editReinsGauche(reinGch){
            this.myReinGauche = reinGch;
            this.dimensionsGch = reinGch.dimensionsGch;
            this.differenciationGch = reinGch.differenciationGch;
            this.dilatationGch = reinGch.dilatationGch;
        },

        updateReinsGauche(){
            let ReinGch = {
                ...this.myReinGauche,
                dimensionsGch: this.dimensionsGch,
                differenciationGch: this.differenciationGch,
                dilatationGch: this.dilatationGch,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.dimensionsGch !=='' || this.differenciationGch !=='' ||this.dilatationGch !==''){
                axios.put('http://'+url+'/reinsGauche/updateReinGch/'+ReinGch._id, ReinGch)
                .then(res => {
                    this.reinsGauche = this.reinsGauche.map(rg => {
                        if(res.data._id === rg._id){
                            return res.data
                        }
                        return rg;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getReinsGauche();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myReinGauche = null;
                this.dimensionsGch = '';
                this.differenciationGch = '';
                this.dilatationGch = '';
            }
        },

        getVessies(){
                axios.get('http://'+url+'/vessies')
                .then(res => this.vessies = res.data)
                .catch(err => console.log(err));
        },

        addNewVessies(){


            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.repletion !=='' || this.contenu !=='' || this.parois !=='' || this.residuPostMictionnel !=='' ){
                let NewVessies = {
                    repletion : this.repletion,
                    contenu : this.contenu,
                    parois : this.parois,
                    residuPostMictionnel : this.residuPostMictionnel,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/vessies/addVessie', NewVessies)
                .then(res => {
                    this.vessies = [res.data, ...this.vessies];
                    this.repletion = '';
                    this.contenu = ''; 
                    this.parois = '';
                    this.residuPostMictionnel = '';
                });
                this.cons = true;
            }
        },

        deleteVessies(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/vessies/deleteVessie/${_id}`)             
                .then( () =>{
                    this.vessies = this.vessies.filter(ves => ves._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getVessies();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myVessies = null;
            }
        },

        editVessies(ves){
            this.myVessies = ves;
            this.repletion = ves.repletion;
            this.contenu = ves.contenu;
            this.parois = ves.parois;
            this.residuPostMictionnel = ves.residuPostMictionnel;
        },

        updateVessies(){
            let Vessie = {
                ...this.myVessies,
                repletion: this.repletion,
                contenu: this.contenu,
                parois: this.parois,
                residuPostMictionnel: this.residuPostMictionnel,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.repletion !=='' || this.contenu !=='' || this.parois !=='' || this.residuPostMictionnel !==''){
                axios.put('http://'+url+'/vessies/updateVessie/'+Vessie._id, Vessie)
                .then(res => {
                    this.vessies = this.vessies.map(vs => {
                        if(res.data._id === vs._id){
                            return res.data
                        }
                        return vs;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getVessies();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myVessies = null;
                this.repletion = '',
                this.contenu = '',
                this.parois = '',
                this.residuPostMictionnel = ''
            }
        },

        getProstates(){
                axios.get('http://'+url+'/prostates')
                .then(res => this.prostates = res.data)
                .catch(err => console.log(err));
        },

        addNewProstates(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.dimensionsPrs !=='' || this.volumePrs !=='' || this.echostructurePrs !=='' || this.contoursPrs !=='' ){
                let NewProstates = {
                    dimensionsPrs : this.dimensionsPrs,
                    volumePrs : this.volumePrs,
                    echostructurePrs : this.echostructurePrs,
                    contoursPrs : this.contoursPrs,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/prostates/addProstate', NewProstates)
                .then(res => {
                    this.prostates = [res.data, ...this.prostates];
                    this.dimensionsPrs = '';
                    this.volumePrs = ''; 
                    this.echostructurePrs = '';
                    this.contoursPrs = '';
                });
                this.cons = true;
            }
        },

        deleteProstates(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/prostates/deleteProst/${_id}`)             
                .then( () =>{
                    this.prostates = this.prostates.filter(pros => pros._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getProstates();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myProstate = null;
            }
        },

        editProstates(pros){
            this.myProstate = pros;
            this.dimensionsPrs = pros.dimensionsPrs;
            this.volumePrs = pros.volumePrs;
            this.echostructurePrs = pros.echostructurePrs;
            this.contoursPrs = pros.contoursPrs;
        },

        updateProstates(){
            let Prostate = {
                ...this.myProstate,
                dimensionsPrs: this.dimensionsPrs,
                volumePrs: this.volumePrs,
                echostructurePrs: this.echostructurePrs,
                contoursPrs: this.contoursPrs,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.dimensionsPrs !=='' || this.volumePrs !=='' || this.echostructurePrs !=='' || this.contoursPrs !==''){
                axios.put('http://'+url+'/prostates/updateProst/'+Prostate._id, Prostate)
                .then(res => {
                    this.prostates = this.prostates.map(prs => {
                        if(res.data._id === prs._id){
                            return res.data
                        }
                        return prs;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getProstates();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myProstate = null;
                this.dimensionsPrs = '';
                this.volumePrs = ''; 
                this.echostructurePrs = '';
                this.contoursPrs = '';
            }
        },

        getTesticulesGch(){
                axios.get('http://'+url+'/testiculesGch')
                .then(res => this.testiculesGch = res.data)
                .catch(err => console.log(err));
        },

        addNewTesticulesGch(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.mmGch !=='' || this.contoursGch !=='' || this.echostructureGch !=='' || this.AvEcDpCGch !==''){
                let NewTesticulesGch = {
                    mmGch : this.mmGch,
                    contoursGch : this.contoursGch,
                    echostructureGch : this.echostructureGch,
                    AvEcDpCGch : this.AvEcDpCGch,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/testiculesGch/addTesticGch', NewTesticulesGch)
                .then(res => {
                    this.testiculesGch = [res.data, ...this.testiculesGch];
                    this.mmGch = '';
                    this.contoursGch = '';
                    this.echostructureGch = ''; 
                    this.AvEcDpCGch = '';
                });
                this.cons = true;
            }
        },

        deleteTesticulesGch(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/testiculesGch/deleteTesticGch/${_id}`)             
                .then( () =>{
                    this.testiculesGch = this.testiculesGch.filter(testicGch => testicGch._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getTesticulesGch();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myTesticuleGauches = null;
            }
        },

        editTesticulesGch(testicGch){
            this.myTesticuleGauches = testicGch;
            this.mmGch = testicGch.mmGch;
            this.contoursGch = testicGch.contoursGch;
            this.echostructureGch = testicGch.echostructureGch;
            this.AvEcDpCGch = testicGch.AvEcDpCGch;
        },

        updateTesticulesGch(){
            let TesticuleGch = {
                ...this.myTesticuleGauches,
                mmGch: this.mmGch,
                contoursGch: this.contoursGch,
                echostructureGch: this.echostructureGch,
                AvEcDpCGch: this.AvEcDpCGch,
            }
            var CaractersLength = "HH",
                i= 0;
            if( this.mmGch !=='' || this.contoursGch !=='' || this.echostructureGch !=='' || this.AvEcDpCGch !==''){
                axios.put('http://'+url+'/testiculesGch/updateTesticGch/'+TesticuleGch._id, TesticuleGch)
                .then(res => {
                    this.testiculesGch = this.testiculesGch.map(tg => {
                        if(res.data._id === tg._id){
                            return res.data
                        }
                        return tg;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getTesticulesGch();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myTesticuleGauches = null;
                this.mmGch = '';
                this.contoursGch = '';
                this.echostructureGch = ''; 
                this.AvEcDpCGch = '';
            }
        },

        getTesticulesDr(){
                axios.get('http://'+url+'/testiculesDroit')
                .then(res => this.testiculesDr = res.data)
                .catch(err => console.log(err));
        },

        addNewTesticulesDr(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if( this.mmDr !=='' || this.contoursDr !=='' || this.echostructureDr !=='' || this.AvEcDpCDr !==''){
                let NewTesticulesDr = {
                    mmDr: this.mmDr,
                    contoursDr : this.contoursDr,
                    echostructureDr : this.echostructureDr,
                    AvEcDpCDr : this.AvEcDpCDr,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/testiculesDroit/addTesticDr', NewTesticulesDr)
                .then(res => {
                    this.testiculesDr = [res.data, ...this.testiculesDr];
                    this.mmDr = '';
                    this.contoursDr = '';
                    this.echostructureDr = ''; 
                    this.AvEcDpCDr = '';
                });
                this.cons = true;
            }
        },

        deleteTesticulesDr(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/testiculesDroit/deleteTesticDr/${_id}`)             
                .then( () =>{
                    this.testiculesDr = this.testiculesDr.filter(testicDr => testicDr._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getTesticulesDr();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myTesticuleDroit = null;
            }
        },

        editTesticulesDr(testicDr){
            this.myTesticuleDroit = testicDr;
            this.mmDr = testicDr.mmDr;
            this.contoursDr = testicDr.contoursDr;
            this.echostructureDr = testicDr.echostructureDr;
            this.AvEcDpCDr = testicDr.AvEcDpCDr
        },

        updateTesticulesDr(){
            let TesticuleDr = {
                ...this.myTesticuleDroit,
                mmDr : this.mmDr,
                contoursDr: this.contoursDr,
                echostructureDr: this.echostructureDr,
                AvEcDpCDr: this.AvEcDpCDr,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.mmDr !='' || this.contoursDr !=='' || this.echostructureDr !=='' || this.AvEcDpCDr !==''){
                axios.put('http://'+url+'/testiculesDroit/updateTesticDr/'+TesticuleDr._id, TesticuleDr)
                .then(res => {
                    this.testiculesGch = this.testiculesGch.map(td => {
                        if(res.data._id === td._id){
                            return res.data
                        }
                        return td;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getTesticulesDr();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myTesticuleDroit = null;
                this.mmDr = '';
                this.contoursDr = '';
                this.echostructureDr = ''; 
                this.AvEcDpCDr = '';
            }
        },

        getEpididymes(){
                axios.get('http://'+url+'/epididymes')
                .then(res => this.epididymes = res.data)
                .catch(err => console.log(err));
        },

        addNewEpid(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if( this.epidDr !=='' || this.epidGch !=='' ){
                let NewEpididymes = {
                    epidDr: this.epidDr,
                    epidGch : this.epidGch,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/epididymes/addEpidid', NewEpididymes)
                .then(res => {
                    this.epididymes = [res.data, ...this.epididymes];
                    this.epidDr = '';
                    this.epidGch = '';
                });
                this.cons = true;
            }
        },

        deleteEpid(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/epididymes/deleteEpidid/${_id}`)             
                .then( () =>{
                    this.epididymes = this.epididymes.filter(epid => epid._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getEpididymes();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myEpididymes = null;
            }
        },

        editEpid(epid){
            this.myEpididymes = epid;
            this.epidDr = epid.epidDr;
            this.epidGch = epid.epidGch;
        },

        updateEpid(){
            let Epididyme = {
                ...this.myEpididymes,
                epidDr : this.epidDr,
                epidGch: this.epidGch,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.epidDr !='' || this.epidGch !==''){
                axios.put('http://'+url+'/epididymes/updateEpidid/'+Epididyme._id, Epididyme)
                .then(res => {
                    this.epididymes = this.epididymes.map(ep => {
                        if(res.data._id === ep._id){
                            return res.data
                        }
                        return ep;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getEpididymes();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myEpididymes = null;
                this.epidDr = '';
                this.epidGch = '';
            }
        },

        getHydroceles(){
                axios.get('http://'+url+'/hydroceles')
                .then(res => this.hydroceles = res.data)
                .catch(err => console.log(err));
        },

        addNewHydr(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if( this.hydrDr !=='' || this.hydrGch !=='' ){
                let NewHydroceles = {
                    hydrDr: this.hydrDr,
                    hydrGch : this.hydrGch,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/hydroceles/addHydr', NewHydroceles)
                .then(res => {
                    this.hydroceles = [res.data, ...this.hydroceles];
                    this.hydrDr = '';
                    this.hydrGch = '';
                });
                this.cons = true;
            }
        },

        deleteHydr(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/hydroceles/deleteHydr/${_id}`)             
                .then( () =>{
                    this.hydroceles = this.hydroceles.filter(hydr => hydr._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getHydroceles();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myHydrocele = null;
            }
        },

        editHydr(hydr){
            this.myHydrocele = hydr;
            this.hydrDr = hydr.hydrDr;
            this.hydrGch = hydr.hydrGch;
        },

        updateHydr(){
            let Hydrocele = {
                ...this.myHydrocele,
                hydrDr : this.hydrDr,
                hydrGch: this.hydrGch,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.hydrDr !='' || this.hydrGch !==''){
                axios.put('http://'+url+'/hydroceles/updateHydr/'+Hydrocele._id, Hydrocele)
                .then(res => {
                    this.hydroceles = this.hydroceles.map(hy => {
                        if(res.data._id === hy._id){
                            return res.data
                        }
                        return hy;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getHydroceles();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myHydrocele = null;
                this.hydrDr = '';
                this.hydrGch = '';
            }
        },

        getVaricoceles(){
                axios.get('http://'+url+'/varicoceles')
                .then(res => this.varicoceles = res.data)
                .catch(err => console.log(err));
        },

        addNewVaric(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if( this.varicDr !=='' || this.varicGch !=='' ){
                let NewVaricoceles = {
                    varicDr: this.varicDr,
                    varicGch : this.varicGch,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/varicoceles/addVaric', NewVaricoceles)
                .then(res => {
                    this.varicoceles = [res.data, ...this.varicoceles];
                    this.varicDr = '';
                    this.varicGch = '';
                });
                this.cons = true;
            }
        },

        deleteVaric(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/varicoceles/deleteVaric/${_id}`)             
                .then( () =>{
                    this.varicoceles = this.varicoceles.filter(varic => varic._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getVaricoceles();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myVaricocele = null;
            }
        },

        editVaric(varic){
            this.myVaricocele = varic;
            this.varicDr = varic.varicDr;
            this.varicGch = varic.varicGch;
        },

        updateVaric(){
            let Varicocele = {
                ...this.myVaricocele,
                varicDr : this.varicDr,
                varicGch: this.varicGch,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.varicDr !='' || this.varicGch !==''){
                axios.put('http://'+url+'/varicoceles/updateVaric/'+Varicocele._id, Varicocele)
                .then(res => {
                    this.varicoceles = this.varicoceles.map(vr => {
                        if(res.data._id === vr._id){
                            return res.data
                        }
                        return vr;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getVaricoceles();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myVaricocele = null;
                this.varicDr = '';
                this.varicGch = '';
            }
        },

        getSacGests(){
                axios.get('http://'+url+'/sacGests')
                .then(res => this.sacGests = res.data)
                .catch(err => console.log(err));
        },

        addNewSacGests(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.nombre !=='' || this.position !=='' || this.forme !=='' || this.diametre !=='' ){
                let NewSacGests = {
                    nombre: this.nombre,
                    position : this.position,
                    forme: this.forme,
                    diametre : this.diametre,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/sacGests/addSacGest', NewSacGests)
                .then(res => {
                    this.sacGests = [res.data, ...this.sacGests];
                    this.nombre = '';
                    this.position = '';
                    this.forme = '';
                    this.diametre = '';
                });
                this.cons = true;
            }
        },

        deleteSacGests(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/sacGests/deleteSacGest/${_id}`)             
                .then( () =>{
                    this.sacGests = this.sacGests.filter(sac => sac._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getSacGests();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.mySacGest = null;
            }
        },

        editSacGests(sac){
            this.mySacGest = sac;
            this.nombre = sac.nombre;
            this.position = sac.position;
            this.forme = sac.forme;
            this.diametre = sac.diametre;
        },

        updateSacGests(){
            let SacGest = {
                ...this.mySacGest,
                nombre : this.nombre,
                position: this.position,
                forme : this.forme,
                diametre: this.diametre
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.nombre !=='' || this.position !=='' || this.forme !=='' || this.diametre !=='' ){
                axios.put('http://'+url+'/sacGests/updateSacGest/'+SacGest._id, SacGest)
                .then(res => {
                    this.sacGests = this.sacGests.map(sg => {
                        if(res.data._id === sg._id){
                            return res.data
                        }
                        return sg;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getSacGests();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.mySacGest = null;
                this.nombre = '';
                this.position = '';
                this.diametre = '';
                this.forme = '';
            }
        },

        getEmbryons(){
                axios.get('http://'+url+'/embryons')
                .then(res => this.embryons = res.data)
                .catch(err => console.log(err));
        },

        addNewEmbr(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.positionEmb !=='' || this.activiteCardiaque !=='' || this.fcActiv !=='' || this.mouvementFoetus !=='' || 
            this.liquideAmniotique !=='' || this.placenta1 !=='' || this.placenta2 !=='' || this.placenta3 !=='' || 
            this.ageGestationnel !=='' || this.datePresume !=='' ){
                let NewEmbryons = {
                    positionEmb: this.positionEmb,
                    activiteCardiaque : this.activiteCardiaque,
                    fcActiv: this.fcActiv,
                    mouvementFoetus : this.mouvementFoetus,
                    liquideAmniotique: this.liquideAmniotique,
                    placenta1 : this.placenta1,
                    placenta2: this.placenta2,
                    placenta3 : this.placenta3,
                    ageGestationnel: this.ageGestationnel,
                    datePresume : this.datePresume,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/embryons/addEmbryon', NewEmbryons)
                .then(res => {
                    this.embryons = [res.data, ...this.embryons];
                    this.positionEmb = '';
                    this.activiteCardiaque = '';
                    this.fcActiv = '';
                    this.mouvementFoetus = '';
                    this.liquideAmniotique = '';
                    this.placenta1 = '';
                    this.placenta2 = '';
                    this.placenta3 = '';
                    this.ageGestationnel = '';
                    this.datePresume = '';
                });
                this.cons = true;
            }
        },

        deleteEmbr(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/embryons/deleteEmbryon/${_id}`)             
                .then( () =>{
                    this.embryons = this.embryons.filter(embr => embr._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getEmbryons();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myEmbryon = null;
            }
        },

        editEmbr(embr){
            this.myEmbryon = embr;
            this.positionEmb = embr.positionEmb;
            this.activiteCardiaque = embr.activiteCardiaque;
            this.fcActiv = embr.fcActiv;
            this.mouvementFoetus = embr.mouvementFoetus;
            this.liquideAmniotique = embr.liquideAmniotique;
            this.placenta1 = embr.placenta1;
            this.placenta2 = embr.placenta2;
            this.placenta3 = embr.placenta3;
            this.ageGestationnel = embr.ageGestationnel;
            this.datePresume = embr.datePresume;
        },

        updateEmbr(){
            let Embryon = {
                ...this.myEmbryon,
                positionEmb : this.positionEmb,
                activiteCardiaque: this.activiteCardiaque,
                fcActiv : this.fcActiv,
                mouvementFoetus: this.mouvementFoetus,
                liquideAmniotique : this.liquideAmniotique,
                placenta1: this.placenta1,
                placenta2 : this.placenta2,
                placenta3: this.placenta3,
                ageGestationnel : this.ageGestationnel,
                datePresume: this.datePresume,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.positionEmb !=='' || this.activiteCardiaque !=='' || this.fcActiv !=='' || this.mouvementFoetus !=='' || 
            this.liquideAmniotique !=='' || this.placenta1 !=='' || this.placenta2 !=='' || this.placenta3 !=='' || 
            this.ageGestationnel !=='' || this.datePresume !=='' ){
                axios.put('http://'+url+'/embryons/updateEmbryon/'+Embryon._id, Embryon)
                .then(res => {
                    this.embryons = this.embryons.map(em => {
                        if(res.data._id === em._id){
                            return res.data
                        }
                        return em;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getEmbryons();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myEmbryon = null;
                this.positionEmb = '';
                    this.activiteCardiaque = '';
                    this.fcActiv = '';
                    this.mouvementFoetus = '';
                    this.liquideAmniotique = '';
                    this.placenta1 = '';
                    this.placenta2 = '';
                    this.placenta3 = '';
                    this.ageGestationnel = '';
                    this.datePresume = '';
            }
        },

        getMensurations(){
                axios.get('http://'+url+'/mensurations')
                .then(res => this.mensurations = res.data)
                .catch(err => console.log(err));
        },

        addNewMens(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.lcc !=='' || this.bip !=='' || this.fl !=='' || this.dat !=='' || 
            this.hc !=='' || this.autresMens !==''){
                let NewMensurations = {
                    lcc: this.lcc,
                    bip : this.bip,
                    fl: this.fl,
                    dat : this.dat,
                    hc: this.hc,
                    autresMens : this.autresMens,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/mensurations/addMensuration', NewMensurations)
                .then(res => {
                    this.mensurations = [res.data, ...this.mensurations];
                    this.lcc = '';
                    this.bip = '';
                    this.fl = '';
                    this.dat = '';
                    this.hc = '';
                    this.autresMens = '';
                });
                this.cons = true;
            }
        },

        deleteMens(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/mensurations/deleteMensuration/${_id}`)             
                .then( () =>{
                    this.mensurations = this.mensurations.filter(mens => mens._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getMensurations();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myMens = null;
            }
        },

        editMens(mens){
            this.myMens = mens;
            this.lcc = mens.lcc;
            this.bip = mens.bip;
            this.fl = mens.fl;
            this.dat = mens.dat;
            this.hc = mens.hc;
            this.autresMens = mens.autresMens;
        },

        updateMens(){
            let Mensuration = {
                ...this.myMens,
                lcc : this.lcc,
                bip: this.bip,
                fl : this.fl,
                dat: this.dat,
                hc : this.hc,
                autresMens: this.autresMens,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.lcc !=='' || this.bip !=='' || this.fl !=='' || this.dat !=='' || 
            this.hc !=='' || this.autresMens !==''){
                axios.put('http://'+url+'/mensurations/updateMensuration/'+Mensuration._id, Mensuration)
                .then(res => {
                    this.mensurations = this.mensurations.map(mn => {
                        if(res.data._id === mn._id){
                            return res.data
                        }
                        return mn;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getMensurations();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myMens = null;
                this.lcc = '';
                this.bip = '';
                this.fl = '';
                this.dat = '';
                this.hc = '';
                this.autresMens = '';
            }
        },

        getAutresRadio(){
                axios.get('http://'+url+'/autresRadio')
                .then(res => this.autresRadio2 = res.data)
                .catch(err => console.log(err));
        },

        addNewAutreRad(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.ecg !=='' || this.radioThoracique !=='' || this.scanner !=='' || this.irm !=='' ){
                let NewAutresRadio = {
                    ecg: this.ecg,
                    radioThoracique : this.radioThoracique,
                    scanner: this.scanner,
                    irm : this.irm,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/autresRadio/addAutreRadio', NewAutresRadio)
                .then(res => {
                    this.autresRadio2 = [res.data, ...this.autresRadio2];
                    this.ecg = '';
                    this.radioThoracique = '';
                    this.scanner = '';
                    this.irm = '';
                });
                this.cons = true;
            }
        },

        deleteAutreRad(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/autresRadio/deleteAutreRadio/${_id}`)             
                .then( () =>{
                    this.autresRadio2 = this.autresRadio2.filter(autreRad => autreRad._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getAutresRadio();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myAutreRad = null;
            }
        },

        editAutreRad(autreRad){
            this.myAutreRad = autreRad;
            this.ecg = autreRad.ecg;
            this.radioThoracique = autreRad.radioThoracique;
            this.scanner = autreRad.scanner;
            this.irm = autreRad.irm;
        },

        updateAutreRad(){
            let AutreRadio = {
                ...this.myAutreRad,
                ecg : this.ecg,
                radioThoracique: this.radioThoracique,
                scanner : this.scanner,
                irm: this.irm
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.ecg !=='' || this.radioThoracique !=='' || this.scanner !=='' || this.irm !=='' ){
                axios.put('http://'+url+'/autresRadio/updateAutreRadio/'+AutreRadio._id, AutreRadio)
                .then(res => {
                    this.autresRadio2 = this.autresRadio2.map(ar => {
                        if(res.data._id === ar._id){
                            return res.data
                        }
                        return ar;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getAutresRadio();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myAutreRad = null;
                this.ecg = '';
                this.radioThoracique = '';
                this.scanner = '';
                this.irm = '';
            }
        },

        getPancreases(){
                axios.get('http://'+url+'/pancrease')
                .then(res => this.pancreases = res.data)
                .catch(err => console.log(err));
        },

        addNewPanc(){

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.pancreas !=='' || this.rmqPancreas !=='' ){
                let NewPanc = {
                    pancreas: this.pancreas,
                    rmqPancreas : this.rmqPancreas,
                    consultation : lsIDcons
                };

                axios.post('http://'+url+'/pancrease/addPanc', NewPanc)
                .then(res => {
                    this.pancreases = [res.data, ...this.pancreases];
                    this.pancreas = '';
                    this.rmqPancreas = '';
                });
                this.cons = true;
            }
        },
        
        deletePanc(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://`+url+`/pancrease/deletePanc/${_id}`)             
                .then( () =>{
                    this.pancreases = this.pancreases.filter(panc => panc._id !== _id);
                })
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getPancreases();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myPancreas = null;
            }
        },

        editPanc(panc){
            this.myPancreas = panc;
            this.pancreas = panc.pancreas;
            this.rmqPancreas = panc.rmqPancreas;
        },

        updatePanc(){
            let Panc = {
                ...this.myPancreas,
                pancreas : this.pancreas,
                rmqPancreas: this.rmqPancreas,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.pancreas !=='' || this.rmqPancreas !=='' ){
                axios.put('http://'+url+'/pancrease/updatePanc/'+Panc._id, Panc)
                .then(res => {
                    this.pancreases = this.pancreases.map(pn => {
                        if(res.data._id === pn._id){
                            return res.data
                        }
                        return pn;
                    });
                    
                });
                var typeInter = setInterval( () => {
                    this.getPancreases();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);

                this.myPancreas = null;
                this.pancreas = '';
                this.rmqPancreas = '';
            }
        },

        getCertificatsMedicaux(){
            axios.get('http://'+url+'/certificatsMedicaux')
                .then( res => this.certificatsMedicaux = res.data)
                .catch(err => console.log(err)); 
        },
        addnewCertificatMedical(){
            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.dateDebut !== '' && this.dateFin !=='' && this.duree !=='' ){

                let newCertMedc = {
                    dateDebut : this.dateDebut,
                    dateFin : this.dateFin,
                    duree : this.duree,
                    consultation : lsIDcons
                };


                axios.post('http://'+url+'/certificatsMedicaux/'+this.user._id+'/addCertMdc', newCertMedc)
                .then(res => {
                    this.certificatsMedicaux = [res.data, ...this.certificatsMedicaux];
                });

                this.imprimerCertMdc = true;
            }

        },

        printContent : function(el){
           // var restorepage = document.body.innerHTML;
            var printcontent = document.getElementById(el).innerHTML;
            printcontent.print();
            //document.body.innerHTML = printcontent;
            //window.print();
            //document.body.innerHTML = restorepage;
            //window.location = '/consultation';
        },
        ...mapActions(['getProfile']),

        consultationBtn: function(){
            $('#consultationBtn').addClass('active')
            $('#ordonnanceBtn').removeClass('active')
            $('#certificatsBtn').removeClass('active')
            $('#remarquesBtn').removeClass('active')
            this.consultation = true;
            this.ordonnance = false;
            this.certificats = false;
            this.remarques = false;

            this.radiologique = false;
        },

        ordonnanceBtn: function(){
            $('#consultationBtn').removeClass('active')
            $('#ordonnanceBtn').addClass('active')
            $('#certificatsBtn').removeClass('active')
            $('#remarquesBtn').removeClass('active')
            this.consultation = false;
            this.ordonnance = true;
            this.certificats = false;
            this.remarques = false;

            this.radiologique = false;
        },

        certificatMedicalBtn : function(){
            $('#medicalMariageBtn').removeClass('active')
            $('#puberteMariageBtn').removeClass('active')
            $('#certificatMedicalBtn').addClass('active')
            this.certificatMedical = true;
            this.medicalMariage = false;
            this.puberteMariage = false;

            this.radiologique = false;
        },



        examenBtn: function(){
            $('#examenBtn').addClass('active')
            $('#bilanBtn').removeClass('active')
            this.examen = true;
            this.bilan = false;

            this.radiologique = false;
        },

        bilanBtn: function(){
            $('#examenBtn').removeClass('active')
            $('#bilanBtn').addClass('active')
            this.examen = false;
            this.bilan = true;

            this.radiologique = false;
        },

        normalBtn: function(){
            $('#normalBtn').addClass('active')
            $('#radiologiqueBtn').removeClass('active')
            this.normal = true;
            this.radiologique = false;
        },

        radiologiqueBtn: function(){
            $('#normalBtn').removeClass('active')
            $('#radiologiqueBtn').addClass('active')
            this.normal = false;
            this.radiologique = true;
            this.normalEcho = true;
        },

        normalEchoBtn : function(){
            $('#echoFemmeBtn').removeClass('active')
            $('#normalEchoBtn').addClass('active')
            $('#autresRadioBtn').removeClass('active')
            this.echoFemme = false;
            this.normalEcho = true;
            this.autresRadio = false;
        },

        echoFemmeBtn : function(){
            $('#echoFemmeBtn').addClass('active')
            $('#normalEchoBtn').removeClass('active')
            $('#autresRadioBtn').removeClass('active')
            this.echoFemme = true;
            this.normalEcho = false;
            this.autresRadio = false;
        },

        autresRadioBtn : function(){
            $('#echoFemmeBtn').removeClass('active')
            $('#normalEchoBtn').removeClass('active')
            $('#autresRadioBtn').addClass('active')
            this.echoFemme = false;
            this.normalEcho = false;
            this.autresRadio = true;
        } 

    }
}
</script>
<style scoped>
    #lastConsTable{
        display: none;
    }
</style>