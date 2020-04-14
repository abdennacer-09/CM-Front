<template>
    <div class="RDV">
        <div class="container">
            <div class="card-title titleListRdvs">
                <i class="fas fa-tasks"></i>&nbsp;
                <span><h5>Gestion des rendez-vous</h5></span>
            </div>
            <div class="card">
                <div class="card-title">
                    <i class="fas fa-calendar-week"></i><span> Agenda</span>
                    <div class="card-tools float-right">
                        <button class="btn btn-primary" @click="btnAjouterRendezVous" data-toggle="modal" data-target="#addNew"><i class="fas fa-plus"></i>  Ajouter Rendez-vous</button>
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
                            <tr v-bind:key="event._id" v-for="event in events">
                                <td >{{event.patient.nom }} {{ event.patient.prenom }}</td>
                                <td>{{event.date  | myDateTime}}</td>
                                <td>
                                    <a href="#" data-toggle="modal" data-target="#addNew" @click="editRendezVous(event)"><i class="fas fa-edit"></i></a>
                                    &nbsp;
                                    <a href="/rendezVous" @click="deleteRendevous(event._id)"><i class="fas fa-trash-alt"></i></a>
                                    &nbsp;
                                </td>
                            </tr>
                            
                        </table>
                    </div>
                    <Fullcalendar 
                        locale="fr"
                        :plugins="calendarPlugins" 
                        :header="{
                            left: 'title',
                            center:'dayGridMonth, timeGridWeek, timeGridDay, listWeek ',
                            right:'prev today next'
                        }" 
                        :buttonText="{
                            today: 'Aujourd \'hui',
                            month: 'Mois',
                            week: 'Semaine',
                            day: 'Jour',
                            list: 'Liste'
                        }"
                        :selectable="true" 
                        :events="events" 
                    />
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">

                <!-- modal ajouter consultation -->
                <div v-if="myCons" class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addNewLabel">Crier un consultaion</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        
                    </div>

                </div>




                <div v-else class="modal-content">
                    <div class="modal-header">
                        <h5 v-if="myRendezVous" class="modal-title" id="addNewLabel">Modifier le rendez-vous</h5>
                        <h5 v-else class="modal-title" id="addNewLabel">Ajouter rendez-vous</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form method="post">
                            <div class="form-group row">
                                <label for="patient" class="col-sm-2 col-form-label">Patient:</label>
                                <div class="col-sm-10">
                                    <div class="autocomplete">
                                <div class="input" id="inputPatint" @click="toggleVisible"  v-text="selectedPatient ? selectedPatient.nom : ''"></div>
                                <span><i class="fas fa-times fa-lg" @click="viderPatient"></i></span>
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

                            <div class="form-group row">
                                <label for="dateTime" class="col-sm-2 col-form-label">Date :</label>
                                <div class="col-sm-10 rdvDate">
                                    <datetime type="datetime" v-model="date"></datetime>
                                    <span><i class="fas fa-times fa-lg" @click="viderDate"></i></span>
                                    
                                    
                                <!--<input type="date" class="form-control" id="inputPassword3" >-->
                                </div>
                            </div>

                            <span id="idPatient"  v-text="selectedPatient ? selectedPatient._id : ''"></span>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                        <input v-if="myRendezVous" type="submit" @click.prevent="updateRendezVous()" class="btn btn-success" value="Modifier">
                        <input v-else  type="submit" @click.prevent="addnewEvent" class="btn btn-success" value="Enregistrer">
                    </div>
                </div>
            </div>
        </div>

        <!-- popup ajouter consultation  -->
        <div class="popCons">

        </div>
    </div>
</template>

<script>

require('@fullcalendar/core/main.min.css')
require('@fullcalendar/daygrid/main.min.css')
require('@fullcalendar/timegrid/main.min.css')

import Fullcalendar from '@fullcalendar/vue'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'

//import DatePicker from 'vue2-datepicker';
import { Datetime } from 'vue-datetime';

import axios from 'axios';
import $ from 'jquery';
//import {mapGetters} from 'vuex';

export default {
    name: 'rendezVous',
    data:() =>({
        calendarPlugins: [
            DayGridPlugin,
            TimeGridPlugin,
            InteractionPlugin,
            ListPlugin,
            
        ],
        shouldReset: true,
        itemHeight: 39,
        selectedPatient : null,
        selected: 0,
        query:'', 
        visible: false,
        events: [],
        patients:[],
        filterBy: '',
        indexTOUpdate:'',
        newEvents:'',
        datetime: '',
        date : '',
        patient:'',
        nom:'',
        _id:'',
        myCons : false,
        myRendezVous: null
    }),
    created(){
        this.getEvents();
        this.getPatients();
        //this.ChosePatients();
    },
    components:{
        Fullcalendar,
        //DatePicker
        Datetime
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
        btnAjouterRendezVous(){
            this.myCons = false;
            this.myRendezVous = null;
            this.date = ''; 
            document.getElementById('inputPatint').textContent = '';
            /*var typeInter = setInterval( () => {
                    var CaractersLength = "HH",
                    i= 0;
                    this.getPatients();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);*/
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
        viderDate: function(){
            this.date = '';
        },
        viderPatient: function(){
            document.getElementById('inputPatint').textContent = '';
            this.visible = false;
            
        },
        getEvents(){
            axios.get('http://localhost:5000/rdvs')
                .then( res => this.events = res.data)
                .catch(err => console.log(err)); 
        },
        addnewEvent(){
            var idPat = document.getElementById('idPatient').textContent;
            console.log(idPat);
            
            let newEvents = {
                date: this.date,
                patient: idPat
            }
            if(this.date !== '' && document.getElementById('inputPatint').textContent !== '' ){
                axios.post('http://localhost:5000/rdvs/5e7ea5dc77d5da3de8d5a9f5/addRdv', newEvents)
                .then(res => {
                    this.events = [res.data, ...this.events];
                });
                this.date = ''; 
                document.getElementById('inputPatint').textContent = '';
                $('#addNew').modal('hide');
                var CaractersLength = "HH",
                i= 0;
                var typeInter = setInterval( () => {
                    this.getEvents();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);
            }

        },
        getPatients(){
                axios.get('http://localhost:5000/patients/5e7ea5dc77d5da3de8d5a9f5')
                .then(res => this.patients = res.data)
                .catch(err => console.log(err));
        },
        showEvent(){
            $('#addNew').modal('show');    
        },
        deleteRendevous(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){
                axios.delete(`http://localhost:5000/rdvs/5e7ea5dc77d5da3de8d5a9f5/deleteRdv/${_id}`)
                .then( () =>{
                    this.events = this.events.filter(event => event._id !== _id);
                })
            }
        },
        editRendezVous(event){
            this.myCons = false;
            this.myRendezVous = event;
            this.date = event.date;
            //document.getElementById('patientId').innerHTML = event.patient;
        },
        updateRendezVous(){
            let Rdv = {
                ...this.myRendezVous,
                date: this.date
            }
            var CaractersLength = "HH",
                i= 0;
                if(this.date !== ''){
                    axios.put('http://localhost:5000/rdvs/5e7ea5dc77d5da3de8d5a9f5/updateRdv/'+Rdv._id, Rdv)
                    .then(res => {
                        this.events = this.events.map(r => {
                            if(res.data._id === r._id){
                                return res.data
                            }
                            return r;
                        });
                        
                    });
                }

                $('#addNew').modal('hide');
                var typeInter = setInterval( () => {
                    this.getEvents();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);
        },
        crierConsultation(){
            this.myCons = true;

        }
        

    }

}
</script>

<style>

.page .RDV  
.card .card-title{
    background-color: #EEE;
    padding: 10px;
}

.RDV .titleListRdvs{
    background-color: #0984e3;
    color: #FFF;
    padding: 10px;
    margin-top: 15px;
    border-radius: 10px;
}

.page .RDV .titleListRdvs span{
    display: inline-block;
}

.page .RDV .modal .vdatetime-input{
    width: 100%;
    display: block;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
}

.page .RDV .modal .vdatetime{
    width: 70%;
    margin-right: 5px,
}

.page .RDV .modal .rdvDate{
    display: flex;
}

.page .RDV .modal .rdvDate span{
    padding-top: 10px;
}

.page .RDV .modal .fa-times{
    top: 2px;
    padding-top: 5px;
    cursor: pointer;
}

.page .RDV .modal .autocomplete{
    width: 70%;
    position: relative;
    margin-bottom: 10px;
    display: flex;
}

.page .RDV .modal .autocomplete 
.input{
    height: 40px;
    border-radius: 3px;
    border: 2px solid lightgray;
    box-shadow: 0 0 10px #eceaea;
    font-size: 25px;
    padding-left: 10px;
    padding-top: 10px;
    cursor: text;
    line-height: 1;
    width: 100%;
}

.page .RDV .modal .popover{
    min-height: 40px;
    border: 2px solid lightgray;
    position: absolute;
    top: 46px;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 3px;
    width: 100%;
    margin-left: 25px;
}

.page .RDV .modal .popover input{
    width: 95%;
    margin-top: 5px;
    height: 40px;
    font-size: 16px;
    border-radius: 3px;
    border: 1px solid lightgray;
    padding-left: 8px;
    margin-left: 5px;
}

.page .RDV .modal .options{
    max-height: 150px;
    overflow-y: scroll;
    margin-top: 5px;
}

.page .RDV .modal .options ul{
    list-style-type: none;
    text-align: left;
    padding-left: 0;
}

.page .RDV .modal .options ul li{
    border-bottom: 1px solid lightgray;
    padding: 10px;
    cursor: pointer;
    background: #f1f1f1;
}
.page .RDV .modal 
.options ul li.selected{
    background: #58bd4c;
    color: #fff;
    font-weight: 600;
}

.page .RDV .main-table{
    background-color: #ffffff;
    -webkit-box-shadow: 0 3px 10px #CCC;
    -moz-box-shadow: 0 3px 10px #CCC;
    box-shadow: 0 3px 10px #CCC;
}

.page .RDV .main-table td{
    vertical-align: middle !important;
}

.page .RDV .main-table .fa-edit{
    color: #2ecc71;
}

.page .RDV .main-table .fa-trash-alt{
    color: #eb2f06;
}

#idPatient{
    display: none;
}


</style>