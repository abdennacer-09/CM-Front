<template>
    <div class="login">
        <h2>Connexion</h2>
        <div class="container">
            <errors v-if="error" :msg="error"/>
        </div>
        <div class="row">
            <div class="card mx-auto">
                <div class="card-header text-white bg-primary">
                    <h4>Connexion</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="loginUser">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" required="required" id="email" placeholder="Email" name="email" v-model="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password">Mot de passe</label>
                            <input type="password" id="password" placeholder="Mot de passe" name="password" v-model="password" class="form-control">
                        </div>
                        <input type="submit"  class="btn btn-primary text-center" value="Connexion">
                        <!--<button class="btn btn-primary text-center">Login</button>-->
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import errors from '@/components/errors';

////var url ='backend.storeino.info'
//var url ='localhost:5000'

//import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
//import AuthService from '@/services/AuthService';
//import store from '@/store/store';
export default {
    name: 'login',
    data(){
        return{
            email: '',
            password: '',
            //error: null
        };
    },
    methods:{
        ...mapActions(['login']),
        loginUser(){
            //console.log(this.email, this.password)
            let user = {
                email: this.email,
                password : this.password
            };
            this.login(user)
            .then(res => {
                if(res.data.success){
                    this.$router.push('/');
                }
            }).catch(err => {
                console.log(err);
            });
        }
    },
    computed:{
        ...mapGetters(['error']),
    },
    components:{
        errors
    //cont
    },
}
</script>

<style>

.login .card{
    width: 40%;
    border-radius: 0;
}

.login .btn {
    border-radius: 0;
}

.login .form-control{
    border-radius: 0;
}
</style>