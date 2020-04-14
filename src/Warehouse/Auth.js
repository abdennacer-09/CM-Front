import axios from 'axios';
//import index from '../router/index';

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status:''
};

const getters = {
    /*isLoggedIn: function(state){
        if(state.token != ''){
            return true
        }else{
            return false
        }
    }*/
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user
};

const actions = {
    // Login Actions
    async login({
        commit
    }, user){
        commit('auth_request');
        let res = await axios.post('http://localhost:5000/posts/login', user);
        if(res.data.success){
            const token = res.data.token;
            const user = res.data.user;
            // Store the token into the localstorage
            localStorage.setItem('token', token);
            // Set the axios defaults
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', token, user);
        }
        return res;
    }
};

const mutations = {
    auth_request(state){
        state.status = 'loading'
    },
    auth_success(state, token, user){
        state.token = token
        state.user = user
        state.status = 'success'
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};