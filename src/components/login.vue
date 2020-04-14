<template>
    <section class="container-fluid bg">
        <section class="row justify-content-center">
            <section class="col-12 col-sm-6 col-md-3">
                <form  @submit.prevent="loginUser"  class="form-container login-form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" name="email" v-model="email" aria-describedby="emailHelp">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" name="passwoed" v-model="password">
                    </div>
                    <input type="submit" class="btn btn-primary btn-block" value="Login" >
                </form>
            </section>
        </section>
    </section>
</template>

<script>
//import axios from 'axios';
import { mapActions } from 'vuex';
export default {
    name: 'login',
    data(){
        return{
            email: "",
            password: ""
        };
    },
    methods:{
        ...mapActions(['login']),
        loginUser(){
            let user = {
                email: this.email,
                passwoed: this.password
            }
            this.login(user)
            .then(res => {
                if(res.data.success){
                    this.$router.push('/patient');
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style>

</style>