<template>
    <div class="globalConsultation">
        <!--<h1>Fiche de consultation</h1>
        <h3>{{ this.$route.params._id }}</h3>
        {{consultation2.patient.nom}}-->

        <div class="container consPrs">
            <div class="card-title titleCons">
                <i class="fas fa-comment-medical"></i>&nbsp;
                <span><h5>Fiche de consultation</h5></span>
            </div>
            <div class="card">
                <div class="card-title cardtitleCons"> 
                    <i class="fas fa-comment-medical"></i>
                    Fiche de consultation
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
                    
                    <div>
                        <div class="card card-body">
                            <h1>La fiche de consultation pour {{consultation2.patient.nom}}</h1>
                        </div>
                    </div>
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
                                                <td v-if="ordns.consultation == consultation2._id ">{{ordns.medicament}}</td>
                                                <td v-if="ordns.consultation == consultation2._id ">{{ordns.quantite}}</td>
                                                <td v-if=" ordns.consultation == consultation2._id ">{{ordns.prise}}</td>
                                                <td v-if="ordns.consultation == consultation2._id">{{ordns.periode}}</td>
                                                <td v-if=" ordns.consultation == consultation2._id ">{{ordns.nbrParJour}}</td>
                                                <td v-if="ordns.consultation == consultation2._id ">{{ordns.quand}}</td>
                                                <td v-if="ordns.consultation == consultation2._id ">{{ordns.remarque}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div id="imprmerOrdns" class="fichOrdns">
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
                                    <button @click.prevent="printContent('imprmerOrdns')" class="btn btn-primary addTas">Imprimer</button>

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
                                                <td v-if=" Appr.consultation == consultation2._id">{{Appr.abdominal}}</td>
                                                <td v-if=" Appr.consultation == consultation2._id ">{{Appr.pleuropulmonaire}}</td>
                                                <td v-if=" Appr.consultation == consultation2._id">{{Appr.cardiovasculaire}}</td>
                                                <td v-if=" Appr.consultation == consultation2._id">{{Appr.gynecologique}}</td>
                                                <td v-if=" Appr.consultation == consultation2._id">{{Appr.osteoarticulaire}}</td>
                                                <td v-if=" Appr.consultation == consultation2._id">{{Appr.reste}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="bilan && consultation && cons && normal" class="enregistrementBilan mt-2 row">
                        
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Taille</th>
                                                <th>Structure</th>
                                                <th>Contours</th>
                                                <th>Autres anomalies</th>
                                            </tr>
                                            <tr v-bind:key="foi._id" v-for="foi in foies">
                                                <td v-if="  foi.consultation == consultation2._id ">{{foi.tailleFoi}}</td>
                                                <td v-if="  foi.consultation == consultation2._id ">{{foi.structureFoi}}</td>
                                                <td v-if="  foi.consultation == consultation2._id ">{{foi.contoursFoi}}</td>
                                                <td v-if="  foi.consultation == consultation2._id ">{{foi.autresAnomalies}}</td>
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
                                                <td v-if="  vesic.consultation == consultation2._id "> {{ vesic.tailleVsB }} </td>
                                                <td v-if="  vesic.consultation == consultation2._id ">{{ vesic.paroisVsB }}</td>
                                                <td v-if="  vesic.consultation == consultation2._id "> {{ vesic.formeVsB }} </td>
                                                <td v-if="  vesic.consultation == consultation2._id ">{{ vesic.autresVsB }}</td>
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
                                                <td v-if="  voi.consultation == consultation2._id ">{{ voi.intrahEpatique }}</td>
                                                <td v-if="  voi.consultation == consultation2._id ">{{ voi.extrahepatique }}</td>
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
                                                <td v-if="  rat.consultation == consultation2._id ">{{rat.tailleRat}}</td>
                                                <td v-if="  rat.consultation == consultation2._id ">{{rat.structureRat}}</td>
                                                <td v-if="  rat.consultation == consultation2._id ">{{rat.contoursRat}}</td>
                                                <td v-if="  rat.consultation == consultation2._id ">{{rat.autresAnomaliesRat}}</td>
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
                                                <td v-if="  reinDr.consultation == consultation2._id ">{{reinDr.dimensions}}</td>
                                                <td v-if="  reinDr.consultation == consultation2._id ">{{reinDr.differenciation}}</td>
                                                <td v-if="  reinDr.consultation == consultation2._id ">{{reinDr.dilatation}}</td>
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
                                                <td v-if="  reinGch.consultation == consultation2._id ">{{reinGch.dimensionsGch}}</td>
                                                <td v-if="  reinGch.consultation == consultation2._id ">{{reinGch.differenciationGch}}</td>
                                                <td v-if="  reinGch.consultation == consultation2._id ">{{reinGch.dilatationGch}}</td>
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
                                                <td v-if="  ves.consultation == consultation2._id ">{{ves.repletion}}</td>
                                                <td v-if="  ves.consultation == consultation2._id ">{{ves.contenu}}</td>
                                                <td v-if="  ves.consultation == consultation2._id ">{{ves.parois}}</td>
                                                <td v-if="  ves.consultation == consultation2._id ">{{ves.residuPostMictionnel}}</td>
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
                                                <td v-if="  pros.consultation == consultation2._id ">{{pros.dimensionsPrs}}</td>
                                                <td v-if="  pros.consultation == consultation2._id ">{{pros.volumePrs}}</td>
                                                <td v-if="  pros.consultation == consultation2._id ">{{pros.echostructurePrs}}</td>
                                                <td v-if="  pros.consultation == consultation2._id ">{{pros.contoursPrs}}</td>
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
                                                <td v-if="  testicGch.consultation == consultation2._id ">{{testicGch.mmGch}}</td>
                                                <td v-if="  testicGch.consultation == consultation2._id ">{{testicGch.contoursGch}}</td>
                                                <td v-if="  testicGch.consultation == consultation2._id ">{{testicGch.echostructureGch}}</td>
                                                <td v-if="  testicGch.consultation == consultation2._id ">{{testicGch.AvEcDpCGch}}</td>
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
                                                <td v-if="  testicDr.consultation == consultation2._id ">{{testicDr.mmDr}}</td>
                                                <td v-if="  testicDr.consultation == consultation2._id ">{{testicDr.contoursDr}}</td>
                                                <td v-if="  testicDr.consultation == consultation2._id ">{{testicDr.echostructureDr}}</td>
                                                <td v-if="  testicDr.consultation == consultation2._id ">{{testicDr.AvEcDpCDr}}</td>
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
                                                <td v-if="  epid.consultation == consultation2._id ">{{epid.epidDr}}</td>
                                                <td v-if="  epid.consultation == consultation2._id ">{{epid.epidGch}}</td>
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
                                                <td v-if="  hydr.consultation == consultation2._id ">{{hydr.hydrDr}}</td>
                                                <td v-if="  hydr.consultation == consultation2._id ">{{hydr.hydrGch}}</td>
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
                                                <td v-if="  varic.consultation == consultation2._id ">{{varic.varicDr}}</td>
                                                <td v-if="  varic.consultation == consultation2._id ">{{varic.varicGch}}</td>
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
                                                <td v-if="  panc.consultation == consultation2._id ">{{panc.pancreas}}</td>
                                                <td v-if="  panc.consultation == consultation2._id ">{{panc.rmqPancreas}}</td>
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Position</th>
                                                <th>Forme</th>
                                                <th>Diamètre</th>
                                            </tr>
                                            <tr v-bind:key="sac._id" v-for="sac in sacGests">
                                                <td v-if="  sac.consultation == consultation2._id ">{{sac.nombre}}</td>
                                                <td v-if="  sac.consultation == consultation2._id ">{{sac.position}}</td>
                                                <td v-if="  sac.consultation == consultation2._id ">{{sac.forme}}</td>
                                                <td v-if="  sac.consultation == consultation2._id ">{{sac.diametre}}</td>
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
                                                    <td v-if="  mens.consultation == consultation2._id ">{{mens.lcc}}</td>
                                                    <td v-if="  mens.consultation == consultation2._id ">{{mens.bip}}</td>
                                                    <td v-if="  mens.consultation == consultation2._id ">{{mens.fl}}</td>
                                                    <td v-if="  mens.consultation == consultation2._id ">{{mens.dat}}</td>
                                                    <td v-if="  mens.consultation == consultation2._id ">{{mens.hc}}</td>
                                                    <td v-if="  mens.consultation == consultation2._id ">{{mens.autresMens}}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                <div class="card-body">
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
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>ECG</th>
                                                <th>ADIOGRAPHIE THORACIQUE</th>
                                                <th>SCANNER</th>
                                                <th>IRM</th>
                                            </tr>
                                            <tr v-bind:key="autreRad._id" v-for="autreRad in autresRadio2">
                                                <td v-if="  autreRad.consultation == consultation2._id ">{{autreRad.ecg}}</td>
                                                <td v-if="  autreRad.consultation == consultation2._id ">{{autreRad.radioThoracique}}</td>
                                                <td v-if="  autreRad.consultation == consultation2._id ">{{autreRad.scanner}}</td>
                                                <td v-if="  autreRad.consultation == consultation2._id ">{{autreRad.irm}}</td>
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

import { mapState } from 'vuex'; 
import $ from 'jquery';
import axios from 'axios';

import { mapActions, mapGetters } from 'vuex'


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
    
    computed: {
        consultation2(){
            return this.consultations.find(cons => cons._id == this.$route.params._id) || {}
        },
        ...mapState(['consultations']),
        ...mapGetters(['user']),
    },

    methods: { 
    



        printContent : function(el){
            var restorepage = document.body.innerHTML;
            var printcontent = document.getElementById(el).innerHTML;
            //printcontent.print();
            document.body.innerHTML = printcontent;
            window.print();
            document.body.innerHTML = restorepage;
        },




        getAppareils(){
                axios.get('http://'+url+'/examensClinique/appareil')
                .then(res => this.appareils = res.data)
                .catch(err => console.log(err));
        },

        getBiologies(){
                axios.get('http://'+url+'/examensParaClin/Bio')
                .then(res => this.biologies = res.data)
                .catch(err => console.log(err));
        },


        getOrdonnance(){
                axios.get('http://'+url+'/ordonnances')
                .then(res => this.ordonnances = res.data)
                .catch(err => console.log(err));
        },
        

        getFoie(){
                axios.get('http://'+url+'/foie')
                .then(res => this.foies = res.data)
                .catch(err => console.log(err));
        },

        getVesicules(){
                axios.get('http://'+url+'/vesiculeBiliaire')
                .then(res => this.vesicules = res.data)
                .catch(err => console.log(err));
        },

        getVoies(){
                axios.get('http://'+url+'/voiesBiliaires')
                .then(res => this.voies = res.data)
                .catch(err => console.log(err));
        },

        getRates(){
                axios.get('http://'+url+'/rates')
                .then(res => this.rates = res.data)
                .catch(err => console.log(err));
        },

        getReinsDroit(){
                axios.get('http://'+url+'/reinsDroit')
                .then(res => this.reinsDroit = res.data)
                .catch(err => console.log(err));
        },


        getReinsGauche(){
                axios.get('http://'+url+'/reinsGauche')
                .then(res => this.reinsGauche = res.data)
                .catch(err => console.log(err));
        },

        getVessies(){
                axios.get('http://'+url+'/vessies')
                .then(res => this.vessies = res.data)
                .catch(err => console.log(err));
        },

        getProstates(){
                axios.get('http://'+url+'/prostates')
                .then(res => this.prostates = res.data)
                .catch(err => console.log(err));
        },

        getTesticulesGch(){
                axios.get('http://'+url+'/testiculesGch')
                .then(res => this.testiculesGch = res.data)
                .catch(err => console.log(err));
        },
        
        getTesticulesDr(){
                axios.get('http://'+url+'/testiculesDroit')
                .then(res => this.testiculesDr = res.data)
                .catch(err => console.log(err));
        },

        getEpididymes(){
                axios.get('http://'+url+'/epididymes')
                .then(res => this.epididymes = res.data)
                .catch(err => console.log(err));
        },


        getHydroceles(){
                axios.get('http://'+url+'/hydroceles')
                .then(res => this.hydroceles = res.data)
                .catch(err => console.log(err));
        },

        getVaricoceles(){
                axios.get('http://'+url+'/varicoceles')
                .then(res => this.varicoceles = res.data)
                .catch(err => console.log(err));
        },


        getSacGests(){
                axios.get('http://'+url+'/sacGests')
                .then(res => this.sacGests = res.data)
                .catch(err => console.log(err));
        },

        

        getEmbryons(){
                axios.get('http://'+url+'/embryons')
                .then(res => this.embryons = res.data)
                .catch(err => console.log(err));
        },


        getMensurations(){
                axios.get('http://'+url+'/mensurations')
                .then(res => this.mensurations = res.data)
                .catch(err => console.log(err));
        },

        getAutresRadio(){
                axios.get('http://'+url+'/autresRadio')
                .then(res => this.autresRadio2 = res.data)
                .catch(err => console.log(err));
        },

        getPancreases(){
                axios.get('http://'+url+'/pancrease')
                .then(res => this.pancreases = res.data)
                .catch(err => console.log(err));
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

<style>
    .medicOrd{
        font-weight: bold;
    }

    .fichOrdns{
        border-style: ridge;
        border-radius: 10px;
        
    }

    .nomPatOrd{
        font-weight: bold;
        margin-bottom: 20px;
    }

    .dateOrdns{
        margin-bottom: 10px;
    }

</style>