<template>
    <div class="globalConsultation">

        <div class="container consPrs">
            <div class="card-title titleCons">
                <i class="fas fa-comment-medical"></i>&nbsp;
                <span><h5>La Fiche Patient</h5></span>
            </div>
            <div class="card">
                <div class="card-title cardtitleCons"> 
                    <i class="fas fa-comment-medical"></i>
                    La Fiche Patient
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

                    <!--<div class="col-md-12">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Familiaux prof</h5>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Familiaux</th>
                                                <th>Remarque</th>
                                            </tr>
                                            <tr v-bind:key="fa._id" v-for="fa in fams">
                                                <td >{{fa.familiaux }}</td>
                                                <td >{{fa.rmqFam }}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>-->
                    
                    <div>
                        <div class="card card-body">
                            <h1>{{patient2.nom}}</h1>
                            <div class="enregistrementExamen mt-2 row">
                                <div class="col-md-12">
                                    <div class="card">
                                        <div class="card-title">
                                            <h5>Les dates des consultations</h5>
                                        </div>
                                        <div class="card-body">
                                            
                                            <div class="table-responsive">
                                                <table class="main-table text-center table table-bordered">
                                                    <tr>
                                                        <th>Les dates</th>
                                                    </tr>
                                                    <tr v-bind:key="consult._id" v-for="consult in consultations">
                                                        <td  v-if="consult.patient._id == patient2._id">{{consult.date | myDate}}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="cons" class="card card-body">
                        <ul class="nav nav-tabs">
                            <li class="nav-item"><span class="nav-link active" id="consultationBtn" @click="consultationBtn">Consultation</span></li>
                        </ul>
                        <div v-if="consultationTabs" class="mt-2 mtField">
                            <ul class="nav nav-tabs">
                                <li class="nav-item"><span class="nav-link" id="examenBtn" @click="examenBtn">Examen clinique</span></li>
                                <li class="nav-item"><span class="nav-link" id="bilanBtn" @click="bilanBtn">Bilan paraclinique</span></li>
                                <li class="nav-item"><span class="nav-link" id="ordonnanceBtn" @click="ordonnanceBtn">Ordonnance</span></li>
                                <!--<li class="nav-item"><span class="nav-link" @click="antecedentBtn" id="antecedentBtn" >Antécédents</span></li>
                                <li class="nav-item"><span class="nav-link" @click="interrogatoireBtn" id="interrogatoireBtn" >Interrogatoire</span></li>
                                <li class="nav-item"><span class="nav-link" @click="examenGenBtn" id="examenGenBtn" >Examen général</span></li>-->
                            </ul>
                        </div>
                        <div v-if="examen && consultationTabs && cons" class="mt-2 mtField">
                            <ul class="nav nav-tabs">
                                <li class="nav-item"><span class="nav-link" @click="interrogatoireBtn" id="interrogatoireBtn">Interrogatoire</span></li>
                                <li class="nav-item"><span class="nav-link" @click="antecedentBtn" id="antecedentBtn" >Antécédents</span></li>
                                <li class="nav-item"><span class="nav-link" @click="examenGenBtn" id="examenGenBtn" >Examen général</span></li>
                                <li class="nav-item"><span class="nav-link" @click="parApprBtn" id="parApprBtn" >Par appareil</span></li>
                            </ul>
                        </div>
                        <div v-if="bilan && consultationTabs && cons" class="mt-2 mtField">
                            <ul class="nav nav-tabs">
                                <li class="nav-item"><span class="nav-link active" id="normalBtn" @click="normalBtn">Biologiques </span></li>
                                <li class="nav-item"><span class="nav-link" id="radiologiqueBtn" @click="radiologiqueBtn">Radiologique</span></li>
                            </ul>
                        </div>
                        <div v-if="antecedent && consultationTabs && cons" class="mt-2 mtField">
                            <ul class="nav nav-tabs">
                                <li class="nav-item"><span class="nav-link active" id="familBtn" @click="familBtn">Familiaux</span></li>
                                <li class="nav-item"><span class="nav-link" id="persBtn" @click="persBtn">Personnels</span></li>
                            </ul>
                        </div>
                        <div v-if="bilan && consultationTabs && cons && radiologique" class="mt-2 mtField">
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
                                            </tr>
                                            <tr v-bind:key="ordns._id" v-for="ordns in ordonnances">
                                                <td>{{ordns.medicament}}</td>
                                                <td>{{ordns.quantite}}</td>
                                                <td>{{ordns.prise}}</td>
                                                <td>{{ordns.periode}}</td>
                                                <td>{{ordns.nbrParJour}}</td>
                                                <td>{{ordns.quand}}</td>
                                                <td>{{ordns.remarque}}</td>
                                            </tr>
                                        </table>
                                    </div>

                                    <div id="imprmerOrdns3" class="fichOrdns">
                                        <div class="insidOrdns">
                                            <h3 class="text-center dateOrdns">{{dateNow | myDate}}</h3>
                                            <h3 class="nomPatOrd text-center">{{patient2.nom}}</h3>
                                            <ul class="list-unstyled" v-bind:key="ordns._id" v-for="ordns in ordonnances">
                                                <li class="medicOrd">{{ordns.medicament}}</li>
                                                <li>* {{ordns.quantite}} {{ordns.prise}} {{ordns.periode}} {{ordns.nbrParJour}} {{ordns.quand}}aé'</li>
                                            </ul>
                                            <br>
                                            <br>
                                            <h3 class="text-center">Signature</h3>
                                            <br>
                                            <br><br>
                                        </div>
                                        
                                    </div>
                                    <br>
                                    <button @click.prevent="printContent3('imprmerOrdns3')" class="btn btn-primary addTas">Imprimer</button>

                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    
                    <div v-if="parAppr && consultationTabs && cons" class="enregistrementExamen mt-2 row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Par appareil</h5>
                                </div>
                                <div class="card-body">
                                    
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Abdominal</th>
                                                <th>Pleuropulmonaire</th>
                                                <th>Cardiovasculaire</th>
                                                <th>Gynecologique</th>
                                                <th>Osteoarticulaire </th>
                                                <th>Reste</th>
                                            </tr>
                                            <tr v-bind:key="Appr._id" v-for="Appr in appareils">
                                                <td>{{Appr.abdominal}}</td>
                                                <td>{{Appr.pleuropulmonaire}}</td>
                                                <td>{{Appr.cardiovasculaire}}</td>
                                                <td>{{Appr.gynecologique}}</td>
                                                <td>{{Appr.osteoarticulaire}}</td>
                                                <td>{{Appr.reste}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="bilan && consultationTabs && cons && normal" class="enregistrementBilan mt-2 row">
                        
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
                                </tr>
                                <tr v-bind:key="bio._id" v-for="bio in biologies">
                                    <td>{{bio.NfsPq}}</td>
                                    <td>
                                        <tr>
                                            <td>{{bio.TSHus}}</td>
                                            <td>{{bio.T3}}</td>
                                            <td>{{bio.T4}}</td>
                                        </tr>
                                    </td>
                                    <td>{{bio.Glycemie}}</td>
                                    <td>{{bio.HBGA1c}}</td>
                                    <td>
                                        <tr>
                                            <td>{{bio.LDL}}</td>
                                            <td>{{bio.HDL}}</td>
                                            <td>{{bio.TG}}</td>
                                            <td>{{bio.CT}}</td>
                                        </tr>
                                    </td>
                                    <td>{{bio.PSA}}</td>
                                    <td>
                                        <tr>
                                            <td>{{bio.TP}}</td>
                                            <td>{{bio.TCK}}</td>
                                            <td>{{bio.INR}}</td>
                                        </tr>
                                    </td>
                                    <td>{{bio.Groupage}}</td>
                                    <td>
                                        <tr>
                                            <td>{{bio.TPHA}}</td>
                                            <td>{{bio.VDRL}}</td>
                                        </tr>
                                    </td>
                                    <td>{{bio.SerologieToxo}}</td>
                                    <td>{{bio.SerologieRub}}</td>
                                    <td>{{bio.AutresBio}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div v-if="antecedent && famil && consultationTabs && cons " class="enregistrementBilan mt-2 row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Familiaux</h5>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Familiaux</th>
                                                <th>Remarque</th>
                                            </tr>
                                            <tr v-bind:key="fam._id" v-for="fam in familias">
                                                <td v-if="fam.patient == patient2._id">{{fam.familiaux }}</td>
                                                <td v-if="fam.patient == patient2._id">{{fam.rmqFam }}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="antecedent && personnels && consultationTabs && cons " class="enregistrementBilan mt-2 row">
                        
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Médicaux</h5>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>HTA </th>
                                                <th>Diabète</th>
                                                <th>Allergie</th>
                                                <th>Autres </th>
                                            </tr>
                                            <tr v-bind:key="medic._id" v-for="medic in medicals">
                                                <td v-if="medic.patient == patient2._id">{{medic.hta}}</td>
                                                <td v-if="medic.patient == patient2._id">{{medic.diabete}}</td>
                                                <td v-if="medic.patient == patient2._id">{{medic.allergie}}</td>
                                                <td v-if="medic.patient == patient2._id">{{medic.autresMdc}}</td>
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Chirurgicaux</th>
                                                <th>Remarque</th>
                                            </tr>
                                            <tr v-bind:key="chirg._id" v-for="chirg in chirurgics">
                                                <td v-if="chirg.patient == patient2._id">{{chirg.chirurgicaux}}</td>
                                                <td v-if="chirg.patient == patient2._id">{{chirg.rmqChirg}}</td>
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Obstétricaux</th>
                                                <th>Remarque</th>
                                            </tr>
                                            <tr v-bind:key="obst._id" v-for="obst in obstetrics">
                                                <td v-if="obst.patient == patient2._id">{{obst.Obstetricaux}}</td>
                                                <td v-if="obst.patient == patient2._id">{{obst.rmqObst}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="interrogatoire && consultationTabs && cons" class="enregistrementBilan mt-2 row">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Motif consultation</h5>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Motif consultation</th>
                                                <th>Remarque</th>
                                            </tr>
                                            <tr v-bind:key="interog._id" v-for="interog in interogatoires">
                                                <td v-if="interog.patient == patient2._id">{{interog.motif}}</td>
                                                <td v-if="interog.patient == patient2._id">{{interog.rmqMotif}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="examengeneral && consultationTabs && cons" class="enregistrementBilan mt-2 row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Examen général</h5>
                                </div>
                                <div class="card-body">
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
                                            </tr>
                                            <tr v-bind:key="examGenr._id" v-for="examGenr in examensGenirals">
                                                <td v-if="examGenr.patient == patient2._id">{{examGenr.ta}}</td>
                                                <td v-if="examGenr.patient == patient2._id">{{examGenr.poids}}</td>
                                                <td v-if="examGenr.patient == patient2._id">{{examGenr.gpp}}</td>
                                                <td v-if="examGenr.patient == patient2._id">{{examGenr.hu}}</td>
                                                <td v-if="examGenr.patient == patient2._id">{{examGenr.fc}}</td>
                                                <td v-if="examGenr.patient == patient2._id">{{examGenr.gaj}}</td>
                                                <td v-if="examGenr.patient == patient2._id">{{examGenr.temperature}}</td>
                                                <td v-if="examGenr.patient == patient2._id">{{examGenr.omi}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="radiologique && normalEcho && consultationTabs && cons" class="enregistrementRad mt-2 row">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Foie </h5>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Taille</th>
                                                <th>Structure</th>
                                                <th>Contours</th>
                                                <th>Autres anomalies</th>
                                            </tr>
                                            <tr v-bind:key="foi._id" v-for="foi in foies">
                                                <td >{{foi.tailleFoi}}</td>
                                                <td >{{foi.structureFoi}}</td>
                                                <td >{{foi.contoursFoi}}</td>
                                                <td >{{foi.autresAnomalies}}</td>
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Taille</th>
                                                <th>Parois</th>
                                                <th>Forme</th>
                                                <th>Autres</th>
                                            </tr>
                                            <tr v-bind:key="vesic._id" v-for="vesic in vesicules">
                                                <td> {{ vesic.tailleVsB }} </td>
                                                <td>{{ vesic.paroisVsB }}</td>
                                                <td> {{ vesic.formeVsB }} </td>
                                                <td>{{ vesic.autresVsB }}</td>
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Intrahépatique </th>
                                                <th>Extrahépatique </th>
                                            </tr>
                                            <tr v-bind:key="voi._id" v-for="voi in voies">
                                                <td>{{ voi.intrahEpatique }}</td>
                                                <td>{{ voi.extrahepatique }}</td>
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Les éléments</th>
                                                <th>Remarque</th>
                                            </tr>
                                            <tr v-bind:key="rat._id" v-for="rat in rates">
                                                <td>{{rat.tailleRat}}</td>
                                                <td>{{rat.structureRat}}</td>
                                                <td>{{rat.contoursRat}}</td>
                                                <td>{{rat.autresAnomaliesRat}}</td>
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
                                    
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Dimensions</th>
                                                <th>Différenciation</th>
                                                <th>Dilatation pyélo-calicielle</th>
                                            </tr>
                                            <tr v-bind:key="reinDr._id" v-for="reinDr in reinsDroit">
                                                <td>{{reinDr.dimensions}}</td>
                                                <td>{{reinDr.differenciation}}</td>
                                                <td>{{reinDr.dilatation}}</td>
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Dimensions</th>
                                                <th>Différenciation</th>
                                                <th>Dilatation pyélo-calicielle</th>
                                            </tr>
                                            <tr v-bind:key="reinGch._id" v-for="reinGch in reinsGauche">
                                                <td>{{reinGch.dimensionsGch}}</td>
                                                <td>{{reinGch.differenciationGch}}</td>
                                                <td>{{reinGch.dilatationGch}}</td>
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
                                    
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Réplétion</th>
                                                <th>Contenu</th>
                                                <th>Parois</th>
                                                <th>Résidu post-mictionnel</th>
                                            </tr>
                                            <tr v-bind:key="ves._id" v-for="ves in vessies">
                                                <td>{{ves.repletion}}</td>
                                                <td>{{ves.contenu}}</td>
                                                <td>{{ves.parois}}</td>
                                                <td>{{ves.residuPostMictionnel}}</td>
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
                                    
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Dimensions</th>
                                                <th>Volume</th>
                                                <th>Échostructure</th>
                                                <th>Contours</th>
                                            </tr>
                                            <tr v-bind:key="pros._id" v-for="pros in prostates">
                                                <td>{{pros.dimensionsPrs}}</td>
                                                <td>{{pros.volumePrs}}</td>
                                                <td>{{pros.echostructurePrs}}</td>
                                                <td>{{pros.contoursPrs}}</td>
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>mm</th>
                                                <th>Contours </th>
                                                <th>L’échostructure</th>
                                                <th>Aspect de la vascularisation à l’écho-Doppler couleur</th>
                                            </tr>
                                            <tr v-bind:key="testicGch._id" v-for="testicGch in testiculesGch">
                                                <td>{{testicGch.mmGch}}</td>
                                                <td>{{testicGch.contoursGch}}</td>
                                                <td>{{testicGch.echostructureGch}}</td>
                                                <td>{{testicGch.AvEcDpCGch}}</td>
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>mm</th>
                                                <th>Contours</th>
                                                <th>L’échostructure</th>
                                                <th>Aspect de la vascularisation à l’écho-Doppler couleur</th>
                                            </tr>
                                            <tr v-bind:key="testicDr._id" v-for="testicDr in testiculesDr">
                                                <td>{{testicDr.mmDr}}</td>
                                                <td>{{testicDr.contoursDr}}</td>
                                                <td>{{testicDr.echostructureDr}}</td>
                                                <td>{{testicDr.AvEcDpCDr}}</td>
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Droit</th>
                                                <th>Gauche</th>
                                            </tr>
                                            <tr v-bind:key="epid._id" v-for="epid in epididymes">
                                                <td>{{epid.epidDr}}</td>
                                                <td>{{epid.epidGch}}</td>
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Droit</th>
                                                <th>Gauche</th>
                                            </tr>
                                            <tr v-bind:key="hydr._id" v-for="hydr in hydroceles">
                                                <td>{{hydr.hydrDr}}</td>
                                                <td>{{hydr.hydrGch}}</td>
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Droit</th>
                                                <th>Gauche</th>
                                            </tr>
                                            <tr v-bind:key="varic._id" v-for="varic in varicoceles">
                                                <td>{{varic.varicDr}}</td>
                                                <td>{{varic.varicGch}}</td>
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>pancréas</th>
                                                <th>Remarque</th>
                                            </tr>
                                            <tr v-bind:key="panc._id" v-for="panc in pancreases">
                                                <td>{{panc.pancreas}}</td>
                                                <td>{{panc.rmqPancreas}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="radiologique && echoFemme && consultationTabs && cons" class="enregistrementRad mt-2 row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-title">
                                    <h5>SAC GESTATIONNEL</h5>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Position</th>
                                                <th>Forme</th>
                                                <th>Diamètre</th>
                                            </tr>
                                            <tr v-bind:key="sac._id" v-for="sac in sacGests">
                                                <td>{{sac.nombre}}</td>
                                                <td>{{sac.position}}</td>
                                                <td>{{sac.forme}}</td>
                                                <td>{{sac.diametre}}</td>
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
                                <div class="card-body">
                                    <div class="col-md-12">
                                        <h3>Mensurations : </h3>
                                        <div class="table-responsive">
                                            <table class="main-table text-center table table-bordered">
                                                <tr>
                                                    <th>LCC</th>
                                                    <th>BIP</th>
                                                    <th>FL</th>
                                                    <th>DAT</th>
                                                    <th>HC</th>
                                                    <th>Autres</th>
                                                </tr>
                                                <tr v-bind:key="mens._id" v-for="mens in mensurations">
                                                    <td>{{mens.lcc}}</td>
                                                    <td>{{mens.bip}}</td>
                                                    <td>{{mens.fl}}</td>
                                                    <td>{{mens.dat}}</td>
                                                    <td>{{mens.hc}}</td>
                                                    <td>{{mens.autresMens}}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
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
                                            </tr>
                                            <tr v-bind:key="embr._id" v-for="embr in embryons">
                                                <td>{{ embr.positionEmb }}</td>
                                                <td>
                                                    <tr>
                                                        <td>{{embr.activiteCardiaque}}</td>
                                                        <td>{{embr.fcActiv}}</td>
                                                    </tr>
                                                </td>
                                                <td>{{embr.mouvementFoetus}}</td>
                                                <td>{{embr.liquideAmniotique}}</td>
                                                <td>
                                                    <tr>
                                                        <td>{{embr.placenta1}}</td>
                                                        <td>{{embr.placenta2}}</td>
                                                        <td>{{embr.placenta3}}</td>
                                                    </tr>
                                                </td>
                                                <td>{{embr.ageGestationnel}}</td>
                                                <td>{{embr.datePresume}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="radiologique && autresRadio && consultationTabs && cons" class="enregistrementRad mt-2 row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Autres</h5>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>ECG</th>
                                                <th>ADIOGRAPHIE THORACIQUE</th>
                                                <th>SCANNER</th>
                                                <th>IRM</th>
                                            </tr>
                                            <tr v-bind:key="autreRad._id" v-for="autreRad in autresRadio2">
                                                <td>{{autreRad.ecg}}</td>
                                                <td>{{autreRad.radioThoracique}}</td>
                                                <td>{{autreRad.scanner}}</td>
                                                <td>{{autreRad.irm}}</td>
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
    </div>
</template>

<script>

import $ from 'jquery';
import { mapState } from 'vuex';
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios';

var url ='localhost:5000';
//var url ='backend.storeino.info'

export default {
    data:function(){
        return{
            familias : [],
            foies: [],
            consulations:[],
            ordonnances:[],
            vesicules :[],
            voies : [],
            rates:[],
            reinsDroit : [],
            reinsGauche : [],
            vessies: [],
            prostates : [],
            testiculesGch: [],
            testiculesDr : [],
            epididymes : [],
            hydroceles : [],
            varicoceles : [],
            sacGests : [],
            embryons : [],
            mensurations : [],
            autresRadio2 : [],
            biologies : [],
            appareils:[],
            pancreases : [],
            examen: true,
            consultationTabs : true,
            ordonnance : false,
            radiologique : false,
            bilan : false,
            famil : false,
            personnels : false,
            parAppr : false,
            normal : true,
            normalEcho : true,
            echoFemme : false,
            autresRadio : false,
            cons : true,
            antecedent : false,
            interrogatoire : false,
            examengeneral : false,
            medicals:[],
            chirurgics:[],
            obstetrics:[],
            interogatoires : [],
            examensGenirals :[],
            fams : [],
            dateNow : new Date(),

        }
    },
    computed : {
        
        patient2(){
            return this.patients.find(pat => pat._id == this.$route.params._id) 
        }, 
        consultations(){
            return this.$store.state.consultations
        },
        consultation(){
            return this.consultations.filter(cons => cons.patient._id == this.patient2._id) || {}
        },
        /*filterfoies(){
            return this.foies.filter(foi => foi.consultations.patient == this.consultation._id) || {}
        },*/
        ...mapState(['patients']),
        
        ...mapGetters(['user']),
    },
    mounted(){
        this.$store.dispatch('loadPatients');
        this.$store.dispatch('loadConsultations');
        /*Api2().get('/consultations').then((response)=>{
            this.consultations = response.data;
        })*/
    },
    methods:{
        /*getPatients(){
            

                axios.get('http://' + url + '/patients/')
                .then(res => this.patients = res.data)
                .catch(err => console.log(err));

        }, */

        printContent3 : function(el){
            var restorepage = document.body.innerHTML;
            var printcontent = document.getElementById(el).innerHTML;
            //printcontent.print();
            document.body.innerHTML = printcontent;
            window.print();
            document.body.innerHTML = restorepage;
        },

        getFamilias(){
                axios.get('http://'+url+'/antecedents/famil')
                .then(res => this.familias = res.data)
                .catch(err => console.log(err));
        }, 

        getFams(){
                axios.get(`http://`+url+`/antecedents/famil/${this.patient2._id}`)
                .then(res => this.fams = res.data)
                .catch(err => console.log(err));
        },

        getMedicaux(){
                axios.get('http://'+url+'/antecedents/medic')
                .then(res => this.medicals = res.data)
                .catch(err => console.log(err));
        },

        getChirurgicaux(){
                axios.get('http://'+url+'/antecedents/chirg')
                .then(res => this.chirurgics = res.data)
                .catch(err => console.log(err));
        },

        getObstetricaux(){
                axios.get('http://'+url+'/antecedents/obst')
                .then(res => this.obstetrics = res.data)
                .catch(err => console.log(err));
        },

        getInterogatoires(){
                axios.get('http://'+url+'/interogatoires')
                .then(res => this.interogatoires = res.data)
                .catch(err => console.log(err));
        },

        getExamenGeniral(){
                axios.get('http://'+url+'/examensClinique/genirals')
                .then(res => this.examensGenirals = res.data)
                .catch(err => console.log(err));
        },

        getAppareils(){
            
                axios.get(`http://`+url+`/examensClinique/FilterAppareil/${this.patient2._id}`)
                .then(res => this.appareils = res.data)
                .catch(err => console.log(err));
        },

        getBiologies(){
                axios.get(`http://`+url+`/examensParaClin/FilterBio/${this.patient2._id}`)
                .then(res => this.biologies = res.data)
                .catch(err => console.log(err));
        },


        getOrdonnance(){
                axios.get(`http://`+url+`/ordonnances/FilterOrdns/${this.patient2._id}`)
                .then(res => this.ordonnances = res.data)
                .catch(err => console.log(err));
        },
        

        getFoie(){
                axios.get(`http://`+url+`/foie/FilterFoie/${this.patient2._id}`)
                .then(res => this.foies = res.data)
                .catch(err => console.log(err));
        },


        getVesicules(){
                axios.get(`http://`+url+`/vesiculeBiliaire/FilterVscBil/${this.patient2._id}`)
                .then(res => this.vesicules = res.data)
                .catch(err => console.log(err));
        },

        getVoies(){
                axios.get(`http://`+url+`/voiesBiliaires/FilterVoiBil/${this.patient2._id}`)
                .then(res => this.voies = res.data)
                .catch(err => console.log(err));
        },

        getRates(){
                axios.get(`http://`+url+`/rates/FilterRat/${this.patient2._id}`)
                .then(res => this.rates = res.data)
                .catch(err => console.log(err));
        },

        getReinsDroit(){
                axios.get(`http://`+url+`/reinsDroit/FilterReinDr/${this.patient2._id}`)
                .then(res => this.reinsDroit = res.data)
                .catch(err => console.log(err));
        },


        getReinsGauche(){
                axios.get(`http://`+url+`/reinsGauche/FilterReinGch/${this.patient2._id}`)
                .then(res => this.reinsGauche = res.data)
                .catch(err => console.log(err));
        },

        getVessies(){
                axios.get(`http://`+url+`/vessies/FilterVess/${this.patient2._id}`)
                .then(res => this.vessies = res.data)
                .catch(err => console.log(err));
        },

        getProstates(){
                axios.get(`http://`+url+`/prostates/FilterProst/${this.patient2._id}`)
                .then(res => this.prostates = res.data)
                .catch(err => console.log(err));
        },

        getTesticulesGch(){
                axios.get(`http://`+url+`/testiculesGch/FilterTesticGch/${this.patient2._id}`)
                .then(res => this.testiculesGch = res.data)
                .catch(err => console.log(err));
        },
        
        getTesticulesDr(){
                axios.get(`http://`+url+`/testiculesDroit/FilterTesticDr/${this.patient2._id}`)
                .then(res => this.testiculesDr = res.data)
                .catch(err => console.log(err));
        },

        getEpididymes(){
                axios.get(`http://`+url+`/epididymes/FilterEpid/${this.patient2._id}`)
                .then(res => this.epididymes = res.data)
                .catch(err => console.log(err));
        },


        getHydroceles(){
                axios.get(`http://`+url+`/hydroceles/FilterHydr/${this.patient2._id}`)
                .then(res => this.hydroceles = res.data)
                .catch(err => console.log(err));
        },

        getVaricoceles(){
                axios.get(`http://`+url+`/varicoceles/FilterVaric/${this.patient2._id}`)
                .then(res => this.varicoceles = res.data)
                .catch(err => console.log(err));
        },


        getSacGests(){
                axios.get(`http://`+url+`/sacGests/FilterSacGest/${this.patient2._id}`)
                .then(res => this.sacGests = res.data)
                .catch(err => console.log(err));
        },

        

        getEmbryons(){
                axios.get(`http://`+url+`/embryons/FilterEmbr/${this.patient2._id}`)
                .then(res => this.embryons = res.data)
                .catch(err => console.log(err));
        },


        getMensurations(){
                axios.get(`http://`+url+`/mensurations/FilterMens/${this.patient2._id}`)
                .then(res => this.mensurations = res.data)
                .catch(err => console.log(err));
        },

        getAutresRadio(){
                axios.get(`http://`+url+`/autresRadio/FilterAtrRad/${this.patient2._id}`)
                .then(res => this.autresRadio2 = res.data)
                .catch(err => console.log(err));
        },

        getPancreases(){
                axios.get(`http://`+url+`/pancrease/FilterPanc/${this.patient2._id}`)
                .then(res => this.pancreases = res.data)
                .catch(err => console.log(err));
        },

        ...mapActions(['getProfile']),

        consultationBtn: function(){
            $('#consultationBtn').addClass('active')
            //$('#ordonnanceBtn').removeClass('active')
            $('#certificatsBtn').removeClass('active')
            $('#remarquesBtn').removeClass('active')
            $('#examenBtn').addClass('active')
            this.consultationTabs = true;
            //this.ordonnance = false;
            this.certificats = false;
            this.remarques = false;

            this.radiologique = false;
        },

        ordonnanceBtn: function(){
            $('#ordonnanceBtn').addClass('active')
            $('#examenBtn').removeClass('active')
            $('#bilanBtn').removeClass('active')
            this.examen = false;
            this.bilan = false;
            this.ordonnance = true;
            this.antecedent = false;
            this.interrogatoire = false;
            this.examengeneral = false;
            this.parAppr = false;

            this.radiologique = false;


        },

        examenBtn: function(){
            $('#examenBtn').addClass('active')
            $('#bilanBtn').removeClass('active')
            $('#ordonnanceBtn').removeClass('active')

            $('#antecedentBtn').removeClass('active')
            $('#interrogatoireBtn').addClass('active')
            $('#examenGenBtn').removeClass('active')
            $('#parApprBtn').removeClass('active')
            this.examen = true;
            this.bilan = false;
            this.ordonnance = false;
            this.antecedent = false;
            this.interrogatoire = true;
            this.examengeneral = false;
            this.parAppr = false;

            this.radiologique = false;
        },

        bilanBtn: function(){
            $('#examenBtn').removeClass('active')
            $('#bilanBtn').addClass('active')
            $('#ordonnanceBtn').removeClass('active')
            this.examen = false;
            this.bilan = true;
            this.ordonnance = false;
            this.antecedent = false;
            this.interrogatoire = false;
            this.examengeneral = false;
            this.parAppr = false;

            this.radiologique = false;
        },

        antecedentBtn : function(){
            $('#examenBtn').addClass('active')
            $('#bilanBtn').removeClass('active')
            $('#antecedentBtn').addClass('active')
            $('#interrogatoireBtn').removeClass('active')
            $('#examenGenBtn').removeClass('active')
            $('#parApprBtn').removeClass('active')
            $("#familBtn").addClass('active')

            this.examen = true;
            this.bilan = false;
            this.antecedent = true;
            this.interrogatoire = false;
            this.examengeneral = false;
            this.parAppr = false;
            this.famil = true;

            this.radiologique = false;
        },

        interrogatoireBtn : function(){
            $('#examenBtn').addClass('active')
            $('#bilanBtn').removeClass('active')
            $('#antecedentBtn').removeClass('active')
            $('#interrogatoireBtn').addClass('active')
            $('#examenGenBtn').removeClass('active')
            $('#parApprBtn').removeClass('active')
            this.examen = true;
            this.bilan = false;
            this.antecedent = false;
            this.interrogatoire = true;
            this.examengeneral = false;
            this.parAppr = false;

            this.radiologique = false;
        },

        examenGenBtn : function(){
            $('#examenBtn').addClass('active')
            $('#bilanBtn').removeClass('active')
            $('#antecedentBtn').removeClass('active')
            $('#interrogatoireBtn').removeClass('active')
            $('#examenGenBtn').addClass('active')
            $('#parApprBtn').removeClass('active')
            this.examen = true;
            this.bilan = false;
            this.antecedent = false;
            this.interrogatoire = false;
            this.examengeneral = true;
            this.parAppr = false;

            this.radiologique = false;
        },

        parApprBtn : function(){
            $('#examenBtn').addClass('active')
            $('#bilanBtn').removeClass('active')
            $('#antecedentBtn').removeClass('active')
            $('#interrogatoireBtn').removeClass('active')
            $('#examenGenBtn').removeClass('active')
            $('#parApprBtn').addClass('active')

            this.examen = true;
            this.bilan = false;
            this.antecedent = false;
            this.interrogatoire = false;
            this.examengeneral = false;
            this.parAppr = true;

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

        familBtn: function(){
            $("#familBtn").addClass('active')
            $("#persBtn").removeClass('active')
            this.famil = true;
            this.personnels = false;
        },

        persBtn : function(){
            $("#familBtn").removeClass('active')
            $("#persBtn").addClass('active')
            this.famil = false;
            this.personnels = true;
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

    },
    created(){
        //this.getPatients();
        this.getFamilias();
        this.getFams();
        this.getMedicaux();
        this.getChirurgicaux();
        this.getObstetricaux();
        this.getInterogatoires();
        this.getExamenGeniral();
        this.consultationBtn();
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
    }
}
</script> 

<style>

</style>