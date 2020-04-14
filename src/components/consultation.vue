<template>
    <div class="globalConsultation">
        <div class="container consPrs">
            <div class="card-title titleCons">
                <i class="fas fa-comment-medical"></i>&nbsp;
                <span><h5>Consultation</h5></span>
            </div>
            <div class="card">
                <div class="card-title cardtitleCons">
                    <i class="fas fa-comment-medical"></i>
                    Consultation
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
                            <h2>Consultation de ...</h2>
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
                                    <input type="date" class="form-control" v-model="date" required >
                                </div>
                            </div>

                            <span id="idPatient"  v-text="selectedPatient ? selectedPatient._id : ''"></span>

                            <table id="lastConsTable">
                                <tr v-bind:key="lsCons._id" v-for="lsCons in lastCons">
                                    <td id="tdLastIDCons">{{lsCons._id}}</td>
                                </tr>
                            </table>
                            
                            <div class="form-group">
                                <button @click.prevent="addnewCons" type="button" class="btn btn-info">Continue</button>
                            </div>
                            

                        </div>
                    </div>
                    <div></div>
                    <div v-if="cons" class="card card-body">
                        <ul class="nav nav-tabs">
                            <li class="nav-item"><span class="nav-link active" id="consultationBtn" @click="consultationBtn">Consultation</span></li>
                            <li class="nav-item"><span class="nav-link" id="ordonnanceBtn" @click="ordonnanceBtn">Ordonnance</span></li>
                            <li class="nav-item"><span class="nav-link" id="certificatsBtn" @click="certificatsBtn">Certificats</span></li>
                            <li class="nav-item"><span class="nav-link" id="remarquesBtn" @click="remarquesBtn">Remarques</span></li>
                        </ul>
                        <div v-if="consultation" class="mt-2 mtField">
                            <ul class="nav nav-tabs">
                                <li class="nav-item"><span class="nav-link active" id="antecedentBtn" @click="antecedentBtn">Antécédents</span></li>
                                <li class="nav-item"><span class="nav-link" id="interrogatoireBtn" @click="interrogatoireBtn">Interrogatoire</span></li>
                                <li class="nav-item"><span class="nav-link" id="examenBtn" @click="examenBtn">Examen clinique</span></li>
                                <li class="nav-item"><span class="nav-link" id="bilanBtn" @click="bilanBtn">Bilan paraclinique</span></li>
                            </ul>
                        </div>
                        <div v-if="ordonnance" class="mt-2 mtField main-ord">
                            <div class="card">
                                <div class="card-title">
                                    <i class="fas fa-table"></i><span> List des ordonnance</span> 
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
                                                <td v-if="adding == false && ordns.consultation == idCons && activerTd">{{ordns.medicament}}</td>
                                                <td v-if="adding == false && ordns.consultation == idCons && activerTd">{{ordns.quantite}}</td>
                                                <td v-if="adding == false && ordns.consultation == idCons && activerTd">{{ordns.prise}}</td>
                                                <td v-if="adding == false && ordns.consultation == idCons && activerTd">{{ordns.periode}}</td>
                                                <td v-if="adding == false && ordns.consultation == idCons && activerTd">{{ordns.nbrParJour}}</td>
                                                <td v-if="adding == false && ordns.consultation == idCons && activerTd">{{ordns.quand}}</td>
                                                <td v-if="adding == false && ordns.consultation == idCons && activerTd">{{ordns.remarque}}</td>
                                                <td v-if="adding == false && ordns.consultation == idCons && activerTd">
                                                    <i class="fas fa-edit"><a href="#"></a></i>&nbsp;
                                                    <i class="fas fa-trash-alt"><a href="#"></a></i>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="certificats" class="mt-2 mtField">
                            <ul class="nav nav-tabs">
                                <li class="nav-item"><span class="nav-link active" @click="certificatMedicalBtn" id="certificatMedicalBtn" >Certificat médical</span></li>
                                <li class="nav-item"><span class="nav-link" id="medicalMariageBtn">Un certificat médical aux fins du mariage</span></li>
                                <li class="nav-item"><span class="nav-link" id="puberteMariageBtn">Certificat de puberté aux fins du mariage</span></li>
                            </ul>
                        </div>
                        <div v-if="remarques" class="mt-2 mtField">
                            <p>This is a content of remarques</p>
                        </div>
                    </div>
                    <div v-if="antecedent && consultation && cons" class="enregistrementAntec mt-2 row">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Familiaux</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row">
                                            <div class="divInput">
                                            <input type="text" class="form-control" placeholder="familiaux" v-model="familiaux">
                                            </div>
                                            <div class="divInput">
                                            <input type="text" class="form-control" placeholder="remarque" v-model="rmqFam">
                                            </div>
                                            <button v-if="myFamiliaux" @click.prevent="updateFamiliaux()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                            <button v-else @click.prevent="addNewFamiliaux" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
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
                                                <td v-if="fam.consultation == idCons && activerTd == true">{{fam.familiaux }}</td>
                                                <td v-if="fam.consultation == idCons && activerTd == true">{{fam.rmqFam }}</td>
                                                <td v-if="fam.consultation == idCons && activerTd == true">
                                                    <a href="#" @click.prevent="editFamiliaux(fam)"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a href="#" @click.prevent="deleteFamiliaux(fam._id)"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>Medicaux</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row">
                                            <div class="divInput">
                                            <input v-model="midicaux" type="text" class="form-control" placeholder="medicaux">
                                            </div>
                                            <div class="divInput">
                                            <input v-model="rmqMdc" type="text" class="form-control" placeholder="remarque">
                                            </div>
                                            <button v-if="myMedicaux" @click.prevent="updateMedicaux()" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                            <button v-else @click.prevent="addNewMedicaux" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                        </div>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>Medicaux</th>
                                                <th>Remarque</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="medic._id" v-for="medic in medicals">
                                                <td v-if="medic.consultation == idCons && activerTd">{{medic.midicaux}}</td>
                                                <td v-if="medic.consultation == idCons && activerTd">{{medic.rmqMdc}}</td>
                                                <td v-if="medic.consultation == idCons && activerTd">
                                                    <a href="#" @click.prevent="editMedicaux(medic)"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a href="#" @click.prevent="deleteMedicaux(medic._id)"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>Chirurgicaux </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row">
                                            <div class="divInput">
                                            <input v-model="chirurgicaux" type="text" class="form-control" placeholder="chirurgicaux">
                                            </div>
                                            <div class="divInput">
                                            <input v-model="rmqChirg" type="text" class="form-control" placeholder="remarque">
                                            </div>
                                            <button v-if="myChirurgicaux" @click.prevent="" class="btn btn-warning addTas"><i class="fas fa-pen"></i></button>
                                            <button v-else @click.prevent="AddNewChirurgicaux" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
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
                                                <td v-if="chirg.consultation == idCons && activerTd">{{chirg.chirurgicaux}}</td>
                                                <td v-if="chirg.consultation == idCons && activerTd">{{chirg.rmqChirg}}</td>
                                                <td v-if="chirg.consultation == idCons && activerTd">
                                                    <a href="#" @click.prevent="editChirurgicaux(chirg)"><i class="fas fa-edit"></i></a>&nbsp;
                                                    <a href="#" @click.prevent="deleteChirurgicaux(chirg._id)"><i class="fas fa-trash-alt"></i></a>
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
                                    <h5>Obstétricaux </h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row">
                                            <div class="divInput">
                                            <input v-model="Obstetricaux" type="text" class="form-control" placeholder="Obstétricaux">
                                            </div>
                                            <div class="divInput">
                                            <input v-model="rmqObst" type="text" class="form-control" placeholder="remarque">
                                            </div>
                                            <button @click.prevent="AddNewObstetricaux" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
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
                                                <td v-if="obst.consultation == idCons && activerTd">{{obst.Obstetricaux}}</td>
                                                <td v-if="obst.consultation == idCons && activerTd">{{obst.rmqObst}}</td>
                                                <td v-if="obst.consultation == idCons && activerTd">
                                                    <i class="fas fa-edit"><a href="#"></a></i>&nbsp;
                                                    <i class="fas fa-trash-alt"><a href="#"></a></i>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="interrogatoire && consultation && cons" class="enregistrementInterog mt-2 row">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Motif consultation</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row">
                                            <div class="divInput">
                                            <input v-model="motif" type="text" class="form-control" placeholder="motif consultation">
                                            </div>
                                            <div class="divInput">
                                            <input v-model="rmqMotif" type="text" class="form-control" placeholder="remarque">
                                            </div>
                                            <button @click.prevent="addnewInterogatoire" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
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
                                                <td v-if="interog.motif !== '' && interog.consultation == idCons && activerTd" >{{interog.motif}}</td>
                                                <td v-if="interog.motif !== '' && interog.consultation == idCons && activerTd">{{interog.rmqMotif}}</td>
                                                <td v-if="interog.motif !== '' && interog.consultation == idCons && activerTd">
                                                    <i class="fas fa-edit"><a href="#"></a></i>&nbsp;
                                                    <i class="fas fa-trash-alt"><a href="#"></a></i>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="examen && consultation && cons" class="enregistrementExamen mt-2 row">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Général</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row">
                                            <div class="divInput">
                                            <input v-model="geniral" type="text" class="form-control" placeholder="examen">
                                            </div>
                                            <div class="divInput">
                                            <input v-model="rmqGeneral" type="text" class="form-control" placeholder="remarque">
                                            </div>
                                            <button @click.prevent="addnewExamenGeniral" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                        </div>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>examen</th>
                                                <th>Remarque</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="examGenr._id" v-for="examGenr in examensGenirals">
                                                <td v-if="adding == false && examGenr.consultation == idCons && activerTd">{{examGenr.geniral}}</td>
                                                <td v-if="adding == false && examGenr.consultation == idCons && activerTd">{{examGenr.rmqGeneral}}</td>
                                                <td v-if="adding == false && examGenr.consultation == idCons && activerTd">
                                                    <i class="fas fa-edit"><a href="#"></a></i>&nbsp;
                                                    <i class="fas fa-trash-alt"><a href="#"></a></i>
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
                                    <h5>Par appareil</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row">
                                            <div class="divInput">
                                            <input v-model="appareil" type="text" class="form-control" placeholder="examen">
                                            </div>
                                            <div class="divInput">
                                            <input v-model="rmqAppr" type="text" class="form-control" placeholder="remarque">
                                            </div>
                                            <button @click.prevent="addnewExamenAppareil" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                        </div>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>examen</th>
                                                <th>Remarque</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="examAppr._id" v-for="examAppr in examensAppareils">
                                                <td v-if="adding == false && examAppr.consultation == idCons && activerTd">{{examAppr.appareil}}</td>
                                                <td v-if="adding == false && examAppr.consultation == idCons && activerTd">{{examAppr.rmqAppr}}</td>
                                                <td v-if="adding == false && examAppr.consultation == idCons && activerTd">
                                                    <i class="fas fa-edit"><a href="#"></a></i>&nbsp;
                                                    <i class="fas fa-trash-alt"><a href="#"></a></i>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="bilan && consultation && cons" class="enregistrementBilan mt-2 row">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Biologie</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row">
                                            <div class="divInput">
                                            <input v-model="biologie" type="text" class="form-control" placeholder="bilan">
                                            </div>
                                            <div class="divInput">
                                            <input v-model="rmqBiologie" type="text" class="form-control" placeholder="remarque">
                                            </div>
                                            <button @click.prevent="addnewExamenBiologie" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                        </div>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>bilan</th>
                                                <th>Remarque</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="examBio._id" v-for="examBio in examensBiologies">
                                                <td v-if="adding == false && examBio.consultation == idCons && activerTd">{{examBio.biologie }}</td>
                                                <td v-if="adding == false && examBio.consultation == idCons && activerTd">{{examBio.rmqBiologie}}</td>
                                                <td v-if="adding == false && examBio.consultation == idCons && activerTd">
                                                    <i class="fas fa-edit"><a href="#"></a></i>&nbsp;
                                                    <i class="fas fa-trash-alt"><a href="#"></a></i>
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
                                    <h5>Radiologie</h5>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row">
                                            <div class="divInput">
                                            <input v-model="radiologie" type="text" class="form-control" placeholder="bilan">
                                            </div>
                                            <div class="divInput">
                                            <input v-model="rmqRadio" type="text" class="form-control" placeholder="remarque">
                                            </div>
                                            <button @click.prevent="addnewExamenRadiologie" class="btn btn-primary addTas"><i class="fas fa-plus"></i></button>
                                        </div>
                                    </form>
                                    <div class="table-responsive">
                                        <table class="main-table text-center table table-bordered">
                                            <tr>
                                                <th>bilan</th>
                                                <th>Remarque</th>
                                                <th>Control</th>
                                            </tr>
                                            <tr v-bind:key="examRadio._id" v-for="examRadio in examensRadiologies">
                                                <td v-if=" adding == false && examRadio.consultation == idCons && activerTd">{{examRadio.radiologie}}</td>
                                                <td v-if="adding == false && examRadio.consultation == idCons && activerTd">{{examRadio.rmqRadio}}</td>
                                                <td v-if="adding == false && examRadio.consultation == idCons && activerTd">
                                                    <i class="fas fa-edit"><a href="#"></a></i>&nbsp;
                                                    <i class="fas fa-trash-alt"><a href="#"></a></i>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="certificats && certificatMedical && cons" class="enregistrementCertifMedc mt-2 row">
                        <form>
                            <div class="form-group row">
                                <label for="du" class="col-sm-2 col-form-label">Du :</label>
                                <div class="col-sm-10">
                                    <input v-model="dateDebut" type="date" class="form-control" id="du" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="au" class="col-sm-2 col-form-label">Au :</label>
                                <div class="col-sm-10">
                                    <input v-model="dateFin" type="date" class="form-control" id="au" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="duree" class="col-sm-2 col-form-label">Durée (Jours):</label>
                                <div class="col-sm-10">
                                    <input v-model="duree" type="text" class="form-control" id="duree" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <button @click.prevent="addnewCertificatMedical" type="button" class="btn btn-primary">Valider</button>
                                    <button v-if="imprimerCertMdc" type="button" class="btn btn-info">Imprimer certificat médical</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addNewLabel">Nouveau ordonnance</h5>
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
                        <input type="submit" @click.prevent="addnewOrdonnance" class="btn btn-success" value="Enregistrer">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
export default {
    name:'consultation',
    data:function(){
    return{
            consultation: true,
            ordonnance: false,
            certificats: false,
            remarques: false,
            antecedent: true,
            interrogatoire : false,
            examen: false,
            bilan: false,
            certificatMedical : false,
            medicalMariage : false,
            puberteMariage : false,
            imprimerCertMdc : false,
            itemHeight: 39,
            selectedPatient : null,
            selected: 0,
            query:'',
            visible: false,
            shouldReset: true,
            patients:[],
            consulations:[],
            antecedents:[],
            date : '',
            idCons:'',
            cons: false,
            midicaux : '',
            rmqMdc : '',
            familiaux : '',
            rmqFam : '',
            chirurgicaux : '',
            rmqChirg : '',
            Obstetricaux : '',
            rmqObst : '',
            examensClinique:[],
            geniral : '',
            rmqGeneral:'',
            appareil: '',
            rmqAppr: '',
            adding: false,
            ordonnances:[],
            quantite : '',
            prise : '',
            periode : '',
            nbrParJour : '',
            quand : '',
            remarque : '',
            medicament : '',
            examensParaClin:[],
            biologie : '',
            rmqBiologie : '',
            radiologie : '',
            rmqRadio : '',
            certificatsMedicaux:[],
            dateDebut : '',
            dateFin : '',
            duree : '',
            interogatoires:[],
            motif : '',
            rmqMotif : '',
            familias:[],
            medicals:[],
            chirurgics:[],
            obstetrics:[],
            examensGenirals:[],
            examensAppareils:[],
            examensBiologies:[],
            examensRadiologies:[],
            lastCons:'',
            activerTd : false,
            myFamiliaux : null,
            myMedicaux : null,
            myChirurgicaux : null,
        }
    },
    created: function(){
        this.consultationBtn();
        this.getPatients();
        this.getConsultaions();
        //this.getAntecedents();
        //console.log(this.idCons);
    },
    computed:{
        matches(){
                console.log(this.query);
            if(this.query == ''){
                return [];
            }
            return this.patients.filter((patient) => patient.nom.toLowerCase().includes(this.query.toLowerCase()))
        },
    },
    methods:{
        toggleVisible(){
            var idPat = document.getElementById('idPatient').textContent;
            console.log(idPat);
            this.visible = !this.visible;
            setTimeout(() => {
                this.$refs.input.focus();
            }, 50);  
        },
        patientClicked(index){
            this.cons = false;
            this.selected = index;
            this.selectPatient();   
            
            //console.log(this.matches[index]);
            //this.visible = false;
            //document.getElementById('inputPatient').innerHTML = this.matches[index.nom];
        },
        selectPatient(){
            this.cons = false;
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
        getPatients(){
                axios.get('http://localhost:5000/patients/5e7ea5dc77d5da3de8d5a9f5')
                .then(res => this.patients = res.data)
                .catch(err => console.log(err));
        },
        getConsultaions(){
                axios.get('http://localhost:5000/consultations')
                .then(res => this.consulations = res.data)
                .catch(err => console.log(err));
        },
        
        addnewCons(){
            this.adding = true;
            this.activerTd = false;
            
            if(this.date !== '' && document.getElementById('inputPatint').textContent !== '' ){

                var idPat = document.getElementById('idPatient').textContent;
                console.log(idPat);

                let newCons = {
                    date: this.date,
                    patient: idPat
                }

                axios.post('http://localhost:5000/consultations/5e7ea5dc77d5da3de8d5a9f5/addCons', newCons)
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
        getAntecedents(){
                axios.get('http://localhost:5000/antecedents')
                .then(res => this.antecedents = res.data)
                .catch(err => console.log(err));
        },
        getFamilias(){
                axios.get('http://localhost:5000/antecedents/famil')
                .then(res => this.familias = res.data)
                .catch(err => console.log(err));
        },

        FamiliauxFilter(){
            var lsCons = document.getElementById('tdLastIDCons').textContent;
            return this.familias.filter((fam)=> fam.consultation = lsCons)
        },

        addNewFamiliaux(){
            this.activerTd = true;
            //this.idCons = this.consulations.slice(-1)[0];
            //console.log(this.idCons);
            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.familiaux !=='' ){
                let newFam = {
                    familiaux : this.familiaux,
                    rmqFam : this.rmqFam,
                    consultation : lsIDcons
                };

                axios.post('http://localhost:5000/antecedents/addFamiliaux', newFam)
                .then(res => {
                    this.familias = [res.data, ...this.familias];
                    this.familiaux = '';
                    this.rmqFam = ''; 
                });
                this.cons = true;
            }
        },

        deleteFamiliaux(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://localhost:5000/antecedents/deleteFam/${_id}`)             
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
                axios.put('http://localhost:5000/antecedents/updateFam/'+Fam._id, Fam)
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
                axios.get('http://localhost:5000/antecedents/medic')
                .then(res => this.medicals = res.data)
                .catch(err => console.log(err));
        },
        addNewMedicaux(){
            this.activerTd = true;
            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.midicaux !=='' ){
                let newMdc = {
                    midicaux : this.midicaux,
                    rmqMdc : this.rmqMdc,
                    consultation : lsIDcons
                };

                axios.post('http://localhost:5000/antecedents/addMidicaux', newMdc)
                .then(res => {
                    this.medicals = [res.data, ...this.medicals];
                    this.midicaux = '';
                    this.rmqMdc = ''; 
                });
                this.cons = true;
            }
        },

        deleteMedicaux(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://localhost:5000/antecedents/deleteMdc/${_id}`)             
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
            }
        },

        editMedicaux(medic){
            this.myMedicaux = medic;
            this.midicaux = medic.midicaux;
            this.rmqMdc = medic.rmqMdc;
        },

        updateMedicaux(){
            let Mdc = {
                ...this.myMedicaux,
                midicaux: this.midicaux,
                rmqMdc: this.rmqMdc,
            }
            var CaractersLength = "HH",
                i= 0;
            if(this.medicaux !=='' || this.rmqMdc !==''){
                axios.put('http://localhost:5000/antecedents/updateMedic/'+Mdc._id, Mdc)
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
                this.midicaux = '';
                this.rmqMdc = '';
            }
        },

        getChirurgicaux(){
                axios.get('http://localhost:5000/antecedents/chirg')
                .then(res => this.chirurgics = res.data)
                .catch(err => console.log(err));
        },

        AddNewChirurgicaux(){
            this.activerTd = true;
            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.chirurgicaux !==''){
                let newChrg = {
                    chirurgicaux : this.chirurgicaux,
                    rmqChirg : this.rmqChirg,
                    consultation : lsIDcons
                };

                axios.post('http://localhost:5000/antecedents/addChirurgicaux', newChrg)
                .then(res => {
                    this.chirurgics = [res.data, ...this.chirurgics];
                    this.chirurgicaux = '';
                    this.rmqChirg = ''; 
                });
                this.cons = true;
            }
        },


        deleteChirurgicaux(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){  
                    axios.delete(`http://localhost:5000/antecedents/deleteChirg/${_id}`)             
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
            }
        },

        editChirurgicaux(chirg){
            this.myChirurgicaux = chirg;
            this.chirurgicaux = chirg.chirurgicaux;
            this.rmqChirg = chirg.rmqChirg;
        },

        AddNewObstetricaux(){
            this.activerTd = true;
            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.obstetricaux !==''){
                let newObst = {
                    Obstetricaux : this.Obstetricaux,
                    rmqObst : this.rmqObst,
                    consultation : lsIDcons
                };

                axios.post('http://localhost:5000/antecedents/addObstetricaux', newObst)
                .then(res => {
                    this.obstetrics = [res.data, ...this.obstetrics];
                    this.Obstetricaux = '';
                    this.rmqObst = ''; 
                });
                this.cons = true;
            }
        },

        /*addnewAntecedent(){

            //var lastPosition = this.consulations.length - 1;
            

                   // this.idCons = this.consulations[lastPosition]._id;
            
            
            if(this.midicaux !== '' || this.familiaux !== ''   
            || this.chirurgicaux !== '' || this.Obstétricaux!=='' ||   
            this.idCons !== '' ){
                //this.idCons = this.consulations.slice(-1)[0];
                var lastPosition = this.consulations.length -1;
                    this.idCons = this.consulations[lastPosition]._id;
                console.log(this.idCons);

                let newAntec = {
                    midicaux : this.midicaux,
                    rmqMdc : this.rmqMdc,
                    familiaux : this.familiaux,
                    rmqFam : this.rmqFam,
                    chirurgicaux : this.chirurgicaux,
                    rmqChirg : this.rmqChirg,
                    Obstétricaux : this.Obstétricaux,
                    rmqObst : this.rmqObst,
                    consultation : this.idCons
                };
                axios.post('http://localhost:5000/antecedents/addAntec', newAntec)
                .then(res => {
                    this.antecedents = [res.data, ...this.antecedents];
                    this.midicaux = ''; this.familiaux = ''; this.chirurgicaux = ''; this.Obstétricaux = '';
                    this.rmqMdc = ''; this.rmqFam = ''; this.rmqChirg = ''; this.rmqObst = '';
                });
                this.cons = true;
            }

        },*/
        getExamensClinique(){
                axios.get('http://localhost:5000/examensClinique')
                .then(res => this.examensClinique = res.data)
                .catch(err => console.log(err));
        },

        addnewExamenClinique(){
            this.adding = false;

            if(this.geniral !== '' || this.appareil !== ''  && this.idCons !== '' ){
                /*var lastPosition = this.consulations.length -1;
                    this.idCons = this.consulations[lastPosition]._id;*/

                    this.idCons = this.consulations.slice(-1)[0];
                    console.log(this.idCons);

                    let newExamenClinique = {
                        geniral : this.geniral,
                        rmqGeneral : this.rmqGeneral,
                        appareil : this.appareil,
                        rmqAppr : this.rmqAppr,
                        consultation : this.idCons
                    };

                axios.post('http://localhost:5000/examensClinique/addExamCln', newExamenClinique)
                .then(res => {
                    this.examensClinique = [res.data, ...this.examensClinique];
                    this.geniral = ''; this.rmqGeneral = ''; this.appareil = ''; this.rmqAppr = '';
                });
                this.cons = true;
            }

        },
        addnewExamenGeniral(){
            this.activerTd = true;
            this.adding = false;          

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.geniral !== ''){
                /*var lastPosition = this.consulations.length -1;
                    this.idCons = this.consulations[lastPosition]._id;*/

                    let newExamenGeniral = {
                        geniral : this.geniral,
                        rmqGeneral : this.rmqGeneral,
                        consultation : lsIDcons
                    };

                axios.post('http://localhost:5000/examensClinique/addExamGeniral', newExamenGeniral)
                .then(res => {
                    this.examensGenirals = [res.data, ...this.examensGenirals];
                    this.geniral = ''; this.rmqGeneral = '';
                });
                this.cons = true;
            }

        },
        addnewExamenAppareil(){
            this.activerTd = true;
            this.adding = false;

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.appareil !== ''){
                /*var lastPosition = this.consulations.length -1;
                    this.idCons = this.consulations[lastPosition]._id;*/

                    let newExamenAppareil = {
                        appareil : this.appareil,
                        rmqAppr : this.rmqAppr,
                        consultation : lsIDcons
                    };

                axios.post('http://localhost:5000/examensClinique/addExamAppareil', newExamenAppareil)
                .then(res => {
                    this.examensAppareils = [res.data, ...this.examensAppareils];
                    this.appareil = ''; this.rmqAppr = '';
                });
                this.cons = true;
            }

        },
        addnewExamenBiologie(){
            this.activerTd = true;
            this.adding = false;

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.biologie !== ''){
                /*var lastPosition = this.consulations.length -1;
                    this.idCons = this.consulations[lastPosition]._id;*/

                    let newExamenBiologie = {
                        biologie : this.biologie,
                        rmqBiologie : this.rmqBiologie,
                        consultation : lsIDcons
                    };

                axios.post('http://localhost:5000/examensParaClin/addExamBiologie', newExamenBiologie)
                .then(res => {
                    this.examensBiologies = [res.data, ...this.examensBiologies];
                    this.biologie = ''; this.rmqBiologie = '';
                });
                this.cons = true;
            }

        },
        addnewExamenRadiologie(){
            this.activerTd = true;
            this.adding = false;

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.radiologie !== ''){
                /*var lastPosition = this.consulations.length -1;
                    this.idCons = this.consulations[lastPosition]._id;*/

                    let newExamenRadiologie = {
                        radiologie : this.radiologie,
                        rmqRadio : this.rmqRadio,
                        consultation : lsIDcons
                    };

                axios.post('http://localhost:5000/examensParaClin/addExamRadiologie', newExamenRadiologie)
                .then(res => {
                    this.examensRadiologies = [res.data, ...this.examensRadiologies];
                    this.radiologie = ''; this.rmqRadio = '';
                });
                this.cons = true;
            }

        },
        addnewExamenParaClinique(){
            this.adding = false;

            if(this.radiologie !== '' || this.biologie !== ''  && this.idCons !== '' ){
                /*var lastPosition = this.consulations.length -1;
                    this.idCons = this.consulations[lastPosition]._id;*/

                    this.idCons = this.consulations.slice(-1)[0];
                    console.log(this.idCons);

                    let newExamenParaClinique = {
                        radiologie : this.radiologie,
                        rmqRadio : this.rmqRadio,
                        biologie : this.biologie,
                        rmqBiologie : this.rmqBiologie,
                        consultation : this.idCons
                    };

                axios.post('http://localhost:5000/examensParaClin/addExamParaCln', newExamenParaClinique)
                .then(res => {
                    this.examensParaClin = [res.data, ...this.examensParaClin];
                    this.radiologie = ''; this.rmqRadio = ''; this.biologie = ''; this.rmqBiologie = '';
                });
                this.cons = true;
            }

        },
        getOrdonnance(){
                axios.get('http://localhost:5000/ordonnances')
                .then(res => this.ordonnances = res.data)
                .catch(err => console.log(err));
        },
        btnAjouterOrdonnance(){
            //this.myPatient = null;
            this.quantite = ''; this.prise = ''; this.periode = ''; this.nbrParJour = '';
                this.quand = ''; this.remarque=''; this.medicament = ''; 
        },
        addnewOrdonnance(){
            this.activerTd = true;
            this.adding = false;
            
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

                axios.post('http://localhost:5000/ordonnances/addOrdns', newOrdonnance)
                .then(res => {
                    this.ordonnances = [res.data, ...this.ordonnances];
                    this.quantite = ''; this.prise = ''; this.periode = ''; this.nbrParJour = '';
                    this.quand = ''; this.remarque = ''; this.medicament = ''; 

                    $('#addNew').modal('hide');
                });
                this.cons = true;
            }

        },
        getExamensParaClinique(){
                axios.get('http://localhost:5000/examensParaClin')
                .then(res => this.examensParaClin = res.data)
                .catch(err => console.log(err));
        },
        getCertificatsMedicaux(){
            axios.get('http://localhost:5000/certificatsMedicaux')
                .then( res => this.certificatsMedicaux = res.data)
                .catch(err => console.log(err)); 
        },
        addnewCertificatMedical(){
            this.activerTd = true;
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


                axios.post('http://localhost:5000/certificatsMedicaux/5e7ea5dc77d5da3de8d5a9f5/addCertMdc', newCertMedc)
                .then(res => {
                    this.certificatsMedicaux = [res.data, ...this.certificatsMedicaux];
                });

                this.imprimerCertMdc = true;
            }

        },
        getInterogatoires(){
                axios.get('http://localhost:5000/interogatoires')
                .then(res => this.interogatoires = res.data)
                .catch(err => console.log(err));
        },

        addnewInterogatoire(){
            this.activerTd = true;
            this.adding = false;

            var lsIDcons = document.getElementById('tdLastIDCons').textContent;
            console.log(lsIDcons);
            this.idCons = lsIDcons;

            if(this.motif !== '' ){

                let newInterogatoire = {
                    motif : this.motif,
                    rmqMotif : this.rmqMotif,
                    consultation : lsIDcons
                };

                axios.post('http://localhost:5000/interogatoires/addInterog', newInterogatoire)
                .then(res => {
                    this.interogatoires = [res.data, ...this.interogatoires];
                    this.motif = ''; this.rmqMotif = '';
                });

                this.cons = true;
            }

        },

        consultationBtn: function(){
            $('#consultationBtn').addClass('active')
            $('#ordonnanceBtn').removeClass('active')
            $('#certificatsBtn').removeClass('active')
            $('#remarquesBtn').removeClass('active')
            this.consultation = true;
            this.ordonnance = false;
            this.certificats = false;
            this.remarques = false;
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
        },

        certificatsBtn: function(){
            $('#consultationBtn').removeClass('active')
            $('#ordonnanceBtn').removeClass('active')
            $('#certificatsBtn').addClass('active')
            $('#remarquesBtn').removeClass('active')
            this.consultation = false;
            this.ordonnance = false;
            this.certificats = true;
            this.remarques = false;
        },
        certificatMedicalBtn : function(){
            $('#medicalMariageBtn').removeClass('active')
            $('#puberteMariageBtn').removeClass('active')
            $('#certificatMedicalBtn').addClass('active')
            this.certificatMedical = true;
            this.medicalMariage = false;
            this.puberteMariage = false;
        },

        remarquesBtn: function(){
            $('#consultationBtn').removeClass('active')
            $('#ordonnanceBtn').removeClass('active')
            $('#certificatsBtn').removeClass('active')
            $('#remarquesBtn').addClass('active')
            this.consultation = false;
            this.ordonnance = false;
            this.certificats = false;
            this.remarques = true;
        },

        antecedentBtn: function(){

            $('#antecedentBtn').addClass('active')
            $('#interrogatoireBtn').removeClass('active')
            $('#examenBtn').removeClass('active')
            $('#bilanBtn').removeClass('active')
            this.antecedent = true;
            this.interrogatoire = false;
            this.examen = false;
            this.bilan = false;

        },

        interrogatoireBtn: function(){
            $('#antecedentBtn').removeClass('active')
            $('#interrogatoireBtn').addClass('active')
            $('#examenBtn').removeClass('active')
            $('#bilanBtn').removeClass('active')
            this.antecedent = false;
            this.interrogatoire = true;
            this.examen = false;
            this.bilan = false;
        },

        examenBtn: function(){
            $('#antecedentBtn').removeClass('active')
            $('#interrogatoireBtn').removeClass('active')
            $('#examenBtn').addClass('active')
            $('#bilanBtn').removeClass('active')
            this.antecedent = false;
            this.interrogatoire = false;
            this.examen = true;
            this.bilan = false;
        },

        bilanBtn: function(){
            $('#antecedentBtn').removeClass('active')
            $('#interrogatoireBtn').removeClass('active')
            $('#examenBtn').removeClass('active')
            $('#bilanBtn').addClass('active')
            this.antecedent = false;
            this.interrogatoire = false;
            this.examen = false;
            this.bilan = true;
        }

    }
}
</script>

<style>
    #lastConsTable{
        display: none;
    }
</style>