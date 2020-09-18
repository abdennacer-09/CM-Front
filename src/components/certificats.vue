<template>
    <div class="main-cons certificats">
        <div class="container cons">
            <div class="card-title titleListCons">
                <i class="fas fa-tasks"></i>&nbsp;
                <span><h5>Les certificats</h5></span>
            </div>
            <div class="card card-body">
                <div class="card-title">
                    <i class="fas fa-table"></i><span style="font-weight: bold;"> Les certificats </span> 
                </div>
                <div  class="mt-2 mtField">
                    <ul class="nav nav-tabs">
                        <li class="nav-item"><span class="nav-link active" id="certificatMedicalBtn" @click="certificatMedicalBtn" >Certificat médical de repos</span></li>
                        <li class="nav-item"><span class="nav-link" id="certificatMedicalLegalBtn" @click="certificatMedicalLegalBtn">Certificat médico légal</span></li>
                        <li class="nav-item"><span class="nav-link" id="medicalMariageBtn" @click="medicalMariageBtn">Un certificat médical aux fins du mariage</span></li>
                        <li class="nav-item"><span class="nav-link" id="puberteMariageBtn" @click="puberteMariageBtn">Certificat de puberté aux fins du mariage</span></li>
                        <li class="nav-item"><span class="nav-link" id="certificatPhysiqueBtn" @click="certificatPhysiqueBtn">Certificat médical d'aptitude physique</span></li>
                        <li class="nav-item"><span class="nav-link" id="certificatPermisBtn" @click="certificatPermisBtn">PERMIS</span></li>
                    </ul>
                </div>
                <div v-if="certMedical" class="enregistrementRad mt-2 row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-title">
                                <span>Certificat medical</span>
                            </div>
                            <div class="card-body">
                                <div id="imprmerCetfMdc" class="cert" style="margin-top :20px;">
                                    <div class="topCert row">
                                        <div class="col-md-4">
                                            
                                        </div>
                                        <div class="solid col-md-4 text-center">
                                            
                                        </div>
                                        <div class="col-md-4">
                                            <h2  class="text-center titleCertMdc1">
                                                CETRTiFICAT
                                                MEDICAL
                                            </h2>
                                            <span>Le : .......................................................................................</span>
                                        </div>
                                        
                                    </div>
                                    <div class="paragCertMed col-md-12">
                                        <div class="col-md-12">
                                            <p>
                                                Je soussigné, Docteur ...................................................... certifie que, l'état de santé de...............................................................................................................................................................................................................................................................................................................................................................................................................................................................
                                            </p>
                                            <p>
                                                1* Nécessite une traitement avec arrêt de travail de ...................................................................................... jours, sauf complications , du ......................................................... au .........................................................
                                            </p>
                                            <p>
                                                2* Nécessite une prolongation d'arrêt de travail de ...................................................................................... jours, sauf complications , du ......................................................... au .........................................................
                                            </p>
                                            <p>
                                                3* Lui permet de rependre son travail à dater du .........................................................
                                            </p>
                                            <p>
                                                Nécessite L'admission  d'urgence ...................................................................................... ou nécessite le transport d'urgence en embulance à l'hôpital
                                            </p>
                                            <p>
                                                .................................................................................................................................................................................................
                                            </p>
                                            <h2 class="signature text-center">
                                                Signature
                                            </h2>
                                        </div>
                                    </div>    
                                </div>
                                <button @click.prevent="printContent('imprmerCetfMdc')" class="btn btn-primary addTas">Imprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="certLegal" class="enregistrementRad mt-2 row">
                    <div class="col-md-12">
                            <div class="card">
                                <div class="card-title">
                                    <span>Certaficat médico légal</span>
                                </div>
                                <div class="card-body">
                                    <div id="imprmerCetfMdcLeg" class="cert" style="margin-top :20px;">
                                        <h2  class="text-center titleCert">Certificat médico légal</h2>
                                        <div class="firstPar">Je soussigne <span>.........................................................................................</span>, Docteur en Médecine , certifie avoir examiné ce jour , Mr/ Mme /Mlle <span v-if="this.MrMmeMlle == ''">......................................................................</span> <span v-if="this.MrMmeMlle != ''" class="modelsCert"> {{ MrMmeMlle }} </span> victime le  <span v-if="this.victimeDate == ''">...../......./................</span>  <span class="modelsCert" v-if="this.victimeDate != ''"> {{ victimeDate }} </span>    à   <span v-if="this.heur == ''">.....h</span><span v-if="this.heur == ''">.......</span> <span class="modelsCert" v-if="this.heur != ''"> {{ heur }} </span> suite à un <span v-if="this.suite == ''">...................................</span> <span class="modelsCert" v-if="this.suite != ''"> {{ suite }} </span>d'une violence , occasionnant  chez  le victime des traumatismes multiples au niveau de son  corps.
                                        A l'examen le victime est anxieux (se) ,   TA =  <span v-if="this.ta == ''">.......</span>   <span class="modelsCert" v-if="this.ta != ''"> {{ ta }} </span>       ;   Fc = <span v-if="this.fc == ''">.......</span>   <span class="modelsCert" v-if="this.fc != ''"> {{ fc }} </span>     ;   P =  <span v-if="this.p == ''">.......</span> <span class="modelsCert" v-if="this.p != ''"> {{ p }} </span>  ;  GAJ =  <span v-if="this.caj == ''">.......</span> <span class="modelsCert" v-if="this.caj != ''"> {{ caj }} </span>                  

                                        présence de <span v-if="this.presence == ''">..............................................................................................................................................

                                        ...................................................................................................................................................................</span> <span class="modelsCert" v-if="this.presence != ''"> {{presence}} </span>
                                        </div>

                                        <p class="secondPar">Vue ces données  cliniques le victime nécessite des soins avec un repos de<span v-if="this.reposJours == ''">.......................................</span> <span class="modelsCert" v-if="this.reposJours != ''"> {{ reposJours }} </span> jours</p>
                                        
                                        <p class="TertthPar">Ce certificat est délivré a l'intéressé pour servir ce que de droit .</p>
                                    </div>
                                    <button @click.prevent="printContent('imprmerCetfMdcLeg')" class="btn btn-primary addTas">Imprimer</button>
                                </div>
                            </div>
                        </div>
                </div>
                <div v-if="mariage" class="enregistrementRad mt-2 row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-title">
                                <span>شهادة طبية بغرض الزواج</span>
                            </div>
                            <div class="card-body">
                                <div id="imprmerCetfMariage" class="certMarg2 cert" style="margin-top :20px;">
                                    <h2  class="text-center titleCert">شهادة طبية بغرض الزواج</h2>
                                        <p class="text-center parMarg">اشهد أنا الدكتور محمد الحجام أنني فحصت السيد(ة) الآنسة  ................................الحامل(ة)للبطاقة الوطنية رقم............................... وقد اتبتت نتائج الفحص الطبي عن خلو المعني(ة) بالأمر من أي مرض خطير أو معد وقد سلمت له(ا) هذه الشهادة بغرض الزواج</p>
                                </div>
                                <button @click.prevent="printContent('imprmerCetfMariage')" class="btn btn-primary addTas">Imprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="puberte" class="enregistrementRad mt-2 row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-title">
                                <span>شهادة طبية بغرض البلوغ</span>
                            </div>
                            <div class="card-body">
                                <div id="imprmerCetfPubrete" class="certMarg2 cert" style="margin-top :20px;">
                                    <h2  class="text-center titleCert">شهادة طبية بغرض البلوغ</h2>
                                        <p class="text-center parMarg">أشهد أنا الدكتور محمد الحجام أنني فحصت الآنسة .................. ..............................من والدها ................................ووالدتها................................وقد أثبتت نتائج الفحص الطبي عن تمتع المعنية بالأمر بكامل علامات البلوغ الخارجية و أنها قادرة على الزواج .وقد سلمت لها هذه الشهادة بغرض الزواج.</p>
                                </div>
                                <button @click.prevent="printContent('imprmerCetfPubrete')" class="btn btn-primary addTas">Imprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="certPhysique" class="enregistrementRad mt-2 row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-title">
                                <span>Certificat médical d'aptitude physique</span>
                            </div>
                            <div class="card-body">
                                <div id="imprmerCetfMdcPhys" class="cert" style="margin-top :20px;">
                                    <h2  class="text-center titleCert">Certificat médical d'aptitude physique</h2>
                                        <span class="debutParPhys">Je</span> soussigné   ...................................................... ,Docteur en Médecine , certifie  avoir examiné  ce jour , Mr/ Mme /Mlle...........................................................est atteste qu'il (elle)apte physiquement .
Ce certificat est délivré a  l'intéressé pour servir  et valoir ce que de droit .
                                        <p class="lastMarg">.</p>
                                </div>
                                <button @click.prevent="printContent('imprmerCetfMdcPhys')" class="btn btn-primary addTas">Imprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="permis" class="enregistrementRad mt-2 row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-title">
                                <span>PERMIS</span>
                            </div>
                            <div class="card-body" >
                                <div id="imprmerCetfMdcPermis" class="cert" style="margin-top :20px;">
                                    <div class="row">
                                        <div class="col-md-1">

                                        </div>
                                        <div class="col-md-7 text-center secondAndTit">
                                            <h4 >CERTIFICAT MEDICAL D’APTITUDE A LA CONDUITE DES VEHICULES  A MOTEUR ETABLI PAR DR HAJJAM MOHAMMED MEDECIN AGREE PAR L’ETAT</h4>
                                        </div>
                                        <div class="col-md-3 solid2">

                                        </div>
                                    </div>
                                    <div class="contCert">
                                        <p>
                                            Préfecture/Province de :……………….<br>
                                            N°ordre……….. /………….
                                        </p>
                                        <h4 class="text-center">Partie réservée au candidat</h4>
                                        <p>Mlle,Mme ,Mr :…………………………………………………………………………………………………………………………………………………………..</p>
<p>Né(e) le ……………………………………………………………………à………………………………………………………............................................</p>

<p>CNIE :…………………………………………………………………Permis de conduire :……………………………………………………………………………</p>
<p>Profession :……………………………………………………………………………………………………………………………………………………………</p>
<p>Demeurant à :…………………………………………………………………………………………………………………………......................................................</p>
                                        <p class="SignCand"> Signature du candidat </p><br>
                                        <h4 class="text-center">Partie réservée au médecin</h4>
                                        <p class="resvMedcP">
                                            Je soussigné, <span>HAJJAM MOHAMMED</span> , médecin agrée pour l’examen médical d’aptitude physique à la conduite de
                                             véhicule à moteur dans la ville de…………………………………………………… Province /Préfecture de INZEGANE ,déclare
                                              avoir examiné le candidat susnommé pour la conduite des véhicules à moteur de catégorie :
                                        </p>
                                        <div class="row">
                                            <div class=" col-md-12">
                                                <table class="table table-bordered">
                                                    <tr>
                                                        <th>Catégorie</th>
                                                        <th>Cocher</th>
                                                        <th>Catégorie</th>
                                                        <th>Cocher</th>
                                                    </tr>
                                                    <tr>
                                                        <td>A1/A</td>
                                                        <td></td>
                                                        <td>C</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>B à usage privé /E(B)</td>
                                                        <td></td>
                                                        <td>E(C)</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td rowspan="2">B à usage public</td>
                                                        <td rowspan="2"></td>
                                                        <td>D</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>E(D)</td>
                                                        <td></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <br>
                                        <p>Au terme de cet examen, je certifie avoir vérifié l’aptitude du candidat à la conduite et conclus que l’intéressé(e) est :</p>
                                        <p> <span class="apte">1/ APTE</span> sans restrictions à la conduite d’un véhicule à moteur de la ou les catégories demandées suivantes :………………………………………………………………………………………………………………………………………………………………...</p>
                                        <p><span class="apte">2/APTE</span> à la conduite d’un véhicule à moteur de la ou les catégories demandées suivantes : </p>
…………………………………………………………………………………………………………………………………………………………………………………
Avec les restrictions ou conditions suivantes (limitations de durée. appareillage ou aménagements) :<br>
<p>*  ………………………………………………………………………………………….</p>
<p>*  ………………………………………………………………………………………….</p>
<p>*  ………………………………………………………………………………………….</p>

                                        
                                        <p>
                                            <span class="apte">3/INAPTE</span>  à la conduite d’un véhicule  à moteur de la ou les catégories demandées suivantes :………………………………………………………………………………………………………………………………………………………………
                                        </p>
                                        <h5 class="faitA">Fait à LOKLEA , le………………………………………….</h5><br>
                                        <h5 class="SignCach">Signature et cachet</h5><br>
                                        <h5 class="D_R">DR………………………………………………</h5>
                                        <br> <br> <br> <br> <br>
                                    </div>
                                </div>
                                <button @click.prevent="printContent('imprmerCetfMdcPermis')" class="btn btn-primary addTas">Imprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>

//var url ='backend.storeino.info'
//var url ='localhost:5000'
import $ from 'jquery';

export default {
    name: 'certificats',
    data(){
        return{
            MrMmeMlle: '',
            victimeDate : '',
            heur : '',
            suite : '',
            ta : '',
            fc : '',
            p :'',
            caj : '',
            presence : '',
            reposJours : '',
            certMedical : true,
            certLegal : false,
            mariage : false,
            puberte : false,
            certPhysique : false,
            permis : false,
            
        };
    },
    methods:{
        printContent : function(el){
            var restorepage = document.body.innerHTML;
            var printcontent = document.getElementById(el).innerHTML;
            //printcontent.print();
            document.body.innerHTML = printcontent;
            window.print();
            document.body.innerHTML = restorepage;
            window.location = '/certificats';
        },
        certificatMedicalBtn : function(){
            $('#certificatMedicalBtn').addClass('active')
            $('#certificatMedicalLegalBtn').removeClass('active')
            $('#certificatPhysiqueBtn').removeClass('active')
            $('#certificatPermisBtn').removeClass('active')
            $('#medicalMariageBtn').removeClass('active')
            $('#puberteMariageBtn').removeClass('active')
            this.puberte = false;
            this.mariage = false;
            this.certMedical = true;
            this.certLegal = false;
            this.certPhysique = false;
            this.permis = false;
        },

        certificatMedicalLegalBtn : function(){
            $('#certificatMedicalBtn').removeClass('active') 
            $('#certificatMedicalLegalBtn').addClass('active')
            $('#certificatPhysiqueBtn').removeClass('active')
            $('#certificatPermisBtn').removeClass('active')
            $('#medicalMariageBtn').removeClass('active')
            $('#puberteMariageBtn').removeClass('active')
            this.puberte = false;
            this.mariage = false;
            this.certMedical = false;
            this.certLegal = true;
            this.certPhysique = false
            this.permis = false;
        },

        medicalMariageBtn : function(){
            $('#certificatMedicalBtn').removeClass('active') 
            $('#certificatMedicalLegalBtn').removeClass('active')
            $('#certificatPhysiqueBtn').removeClass('active')
            $('#certificatPermisBtn').removeClass('active')
            $('#medicalMariageBtn').addClass('active')
            $('#puberteMariageBtn').removeClass('active')
            this.puberte = false;

            this.certMedical = false;
            this.certLegal = false;
            this.mariage = true;
            this.certPhysique = false
            this.permis = false;
        },

        puberteMariageBtn : function(){
            $('#certificatMedicalBtn').removeClass('active') 
            $('#certificatMedicalLegalBtn').removeClass('active')
            $('#certificatPhysiqueBtn').removeClass('active')
            $('#certificatPermisBtn').removeClass('active')
            $('#medicalMariageBtn').removeClass('active')
            $('#puberteMariageBtn').addClass('active')

            this.certMedical = false;
            this.certLegal = false;
            this.mariage = false;
            this.puberte = true;
            this.certPhysique = false
            this.permis = false;
        },

        certificatPhysiqueBtn : function(){
            $('#certificatMedicalBtn').removeClass('active') 
            $('#certificatMedicalLegalBtn').removeClass('active')
            $('#certificatPhysiqueBtn').addClass('active')
            $('#certificatPermisBtn').removeClass('active')
            $('#medicalMariageBtn').removeClass('active')
            $('#puberteMariageBtn').removeClass('active')
            this.puberte = false;
            this.certMedical = false;
            this.certLegal = false;
            this.mariage = false;
            this.certPhysique = true;
            this.permis = false;
        },

        certificatPermisBtn : function(){
            $('#certificatMedicalBtn').removeClass('active') 
            $('#certificatMedicalLegalBtn').removeClass('active')
            $('#certificatPhysiqueBtn').removeClass('active')
            $('#certificatPermisBtn').addClass('active')
            $('#medicalMariageBtn').removeClass('active')
            $('#puberteMariageBtn').removeClass('active')
            this.puberte = false;
            this.certMedical = false;
            this.certLegal = false;
            this.mariage = false;
            this.certPhysique = false;
            this.permis = true;
        }

        
    }
}
</script>

<style scoped>
    .page .certificats .modelsCert{
        font-weight: bold;
    }

    .page .certificats .titleCert{
        margin-bottom: 50px;
        margin-top: 90px;
    }

    .cert{
        line-height: 32px;
        border-style: ridge;
        padding: 5px; 
        margin-bottom: 10px;
    }

    .certificats .nav-tabs li{
        cursor: pointer;
    }

    .firstPar{
        margin-bottom: 50px;
    }
    .secondPar{
        margin-bottom: 50px;
    }
    .TertthPar{
        margin-bottom: 100px;
    }
    #content .modelsCert{
        font-weight: bold;
    }

    .titleCertMdc1{
        margin-bottom: 30px;
    }

    .solid {
        border-style: solid;
        border-radius: 10px;
        height: 150px;
    }
    .solid2{
        border-style: solid;
        height: 260px;
        border-width: 1px;
    }
    .topCert{
        margin-bottom: 75px;
        margin-top: 120px;
    }

    .signature{
        margin-bottom: 200px;
    }

    .debutParPhys{
        padding-left: 40px;
    }

    .lastMarg {
        margin-bottom: 100px;
    }

    .contCert {
        padding: 20px 80px 20px 80px;
    }

    .contCert h4{
        font-weight: bold;
        margin-bottom: 20px;
    }

    /*.certMarg2{
        padding-left: 120px;
        padding-right: 120px;
        text-align: center;
    }*/

    .parMarg{
        margin-left: 120px;
        margin-right: 120px;
    }

    .secondAndTit{
        margin-right: 40px;
        margin-top: 6%;
    }

    .SignCand{
        margin-left: 60%;
    }

    .resvMedcP span{
        font-weight: bold;
    }

    .apte{
        font-weight: bold;
    }

    .faitA{
        margin-left: 50%;
    }

    .SignCach{
        margin-left: 60%;
    }

    .D_R{
        margin-left: 70%;
    }
</style>