
import Vue from 'vue'
import Vuex from 'vuex'

import AuthService from '../services/AuthService'
import Api2 from '../services/Api2';
//import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({

    modules:{
        AuthService
    },

    state:{
        consultations : [],
        patients : [],
    },

    getters: {
        
    },

    mutations:{
        SET_CONSULTATIONS(state, consultations){
            state.consultations = consultations;
        },
        DELETE_CONSULTATION(state, consultationId){
            let consultations = state.consultations.filter(c => c._id != consultationId)
            state.consultations = consultations;

        },
        EDIT_CONSULTATION(state, consultation){
            state.consultations.forEach(c => {
                if(c._id == consultation._id){
                    c = consultation;
                }
            })
        },
        SET_PATIENTS(state, patients){
            state.patients = patients;
        },
    },

    actions: {
        async loadConsultations({commit}){
            let response = await Api2().get('/consultations');
            commit('SET_CONSULTATIONS', response.data) // response data for param vidoes
        },
        async deleteConsultation({commit}, consult){
            /*let response =*/ await Api2().delete(`/consultations/deleteConsultation/${consult._id}`);
            //console.log(response);
            //if(response.status == 200 || response.status == 204){
                commit('DELETE_CONSULTATION', consult._id);
            //}
            
        }, 
        async editConsultation({commit}, consultation){
            let response = await Api2().put(`/consultations/updateConsultation/${consultation._id}`, consultation);
            let newConsultation = response.data.data.attributes;
            commit('EDIT_CONSULTATION', newConsultation);
            return newConsultation;
        },
        async loadPatients({commit}){
            let response = await Api2().get('/patients');
            commit('SET_PATIENTS', response.data) // response data for param vidoes
        },
    }

})
