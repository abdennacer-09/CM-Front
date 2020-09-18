
import axios from 'axios'
import router from '../router';
//import router from '../router';


const state = {
    token : localStorage.getItem('token') ||'',
    user: {},
    status: '',
    error: null,
    msg:''
};

const getters = {
    isLoggedIn: function(state){
        if(state.token != ''){
            return true
        } else{
            return false
        }
    },

    //isLoggedIn: state => !!state.token,
    authState: state  => state.status,
    user: state => state.user,
    error: state => state.error

};

const getUser = {
    UserLog(state){
        return state.user.nom
    }
};

const actions = {

    async login({commit}, user){
        commit('auth_request');
        try{
            let res = await axios.post('http://backend.storeino.info/posts/login', user)
            if(res.data.success){
                const token = res.data.token;
                const user = res.data.user;

                localStorage.setItem('token', token);

                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
            } /*else{
                state.msg = res.data.msg
                alert(state.msg)
            }*/
            return res;
        } catch(err){
            commit('auth_error', err)
        }
    },

    async register({commit}, userData){
        try{
            commit('register_request');
            let res = await axios.post('http://backend.storeino.info/posts/signup', userData);
            if(res.data.success !== undefined){
                commit('register_success');
            }
            return res;
        } catch(err){
            commit('register_error', err)
        }
    },

    async getProfile({commit}){
        commit('profile_request');
        let res = await axios.get('http://backend.storeino.info/posts/profile')
        commit('user_profile', res.data.user)
        return res;
    },

    async logout({commit}){
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return
    },

};

const mutations = {
    auth_request(state){
        state.error = null
        state.status ='loading'
    },
    auth_success(state, token, user){
        state.token = token
        state.user = user
        state.status = 'success'
        state.error = null
    },
    auth_error(state, err){
        state.error = err.response.data.msg
    },
    register_success(state){
        state.error = null
        state.status = 'loading'
    },
    register_error(state, err){
        state.error = err.response.data.msg
    },
    register_request(state){
        state.error = null
        state.status = 'success'
    },
    logout(state){
        state.error = null
        state.status = ''
        state.token = ''
        state.user = ''
    },
    profile_request(state){
        state.status = 'loading'
    },  
    user_profile(state, user){
        state.user = user;
    },
};

export default {
    state,
    actions,
    mutations,
    getters,
    getUser
}
