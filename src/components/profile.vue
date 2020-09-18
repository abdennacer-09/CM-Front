<template>
    <div class="main-cons">
        <div class="container cons">
            <div class="card-title titleListCons">
                <i class="fas fa-tasks"></i>&nbsp;
                <span><h5>Profile</h5></span>
            </div>
            <div class="card">
                <div class="card-title">
                    <i class="fas fa-table"></i><span> Profile</span> 
                    <div class="card-tools">
                        
                    </div>
                </div>
                
                <div class="card-body">
                <!--<ul class="list-group">
                        <li class="list-group-item">Email: {{ user.email }}</li>
                        <li class="list-group-item">Nom: {{ user.nom }}</li>
                        <li class="list-group-item">Tel: {{ user.tel }}</li>
                        <li class="list-group-item">Id: {{ user._id }}</li>
                        <li class="list-group-item">Mot de passe:</li>
                    </ul>-->
                    <div v-if="user" class="editProfile">
                        <div class="errors-list">
                            <div v-bind:key="error3._id" class="error2" v-for="error3 in formErrorsProfil" >{{ error3 }}</div>
                        </div>
                        <form>
                            <div class="form-group">
                                <label for="nom">Nom</label>
                                <input v-model="user.nom" type="text" class="form-control" id="nom" >
                            </div>
                            <div class="form-group">
                                <label for="cin">CIN</label>
                                <input v-model="user.cin" type="text" class="form-control" id="cin">
                            </div>
                            <div class="form-group">
                                <input v-model="user.email" type="email" class="form-control" id="email">
                            </div>
                            <div class="form-group">
                                <label for="tel">Telephone</label>
                                <input v-model="user.tel" type="text" class="form-control" id="tel" >
                            </div>
                            <div class="form-group">
                                <label for="adresse">Adresse</label>
                                <textarea v-model="user.adresse" class="form-control" id="adresse"  rows="3"></textarea>
                            </div>
                            <!--<input @  type="submit" class="btn btn-success" value="Modifier">-->
                            <button @click.prevent="UpdateUser()" class="btn btn-success">Modifier</button>
                        </form>
                    </div>
                    
                </div>
                <div class="card card-body">
                    <div class="enregistrementExamen mt-2 row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-title">
                                    <h5>Changer le mote de pass</h5>
                                </div>
                                <div class="card-body">
                                    <div class="errors-list">
                                        <div v-bind:key="error2._id" class="error2" v-for="error2 in formErrors" >{{ error2 }}</div>
                                    </div>
                                    <form>
                                        <div class="form-group row">
                                            <label for="intrahEpatique" class="col-sm-3 col-form-label">Nouveau mote de pass </label>
                                            <div class="col-sm-4">
                                                <input v-model="newPass" type="password"  class="form-control" id="intrahEpatique" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="extrahepatique" class="col-sm-3 col-form-label">Confirmation Nouveau mote de pass</label>
                                            <div class="col-sm-4">
                                                <input v-model="confirmNewPass" type="password" class="form-control" id="extrahepatique">
                                            </div>
                                        </div> 
                                        <button @click.prevent="updatePassword()" class="btn btn-primary addTas">Enregistrer</button>
                                    </form>
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

import axios from 'axios';
var url ='localhost:5000'
//var url ='backend.storeino.info'
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'profile',
    data(){
        return{
            /*users:[],
            nom : '',
            cin : '',
            email : '',
            isAdmin : '',
            tel : '',
            adresse : '',*/
            newPass : '',
            confirmNewPass : '',
            users : [],
            formErrors: [],
            formErrorsProfil:[],
            regx : /^([a-z 0-9-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/,
            minChars: 3,
        }
    },
    computed: mapGetters(['user']),
    methods:{
        ...mapActions(['getProfile']),
        getUsers(){
                axios.get('http://' + url + '/posts/users')
                .then(res => this.users = res.data)
                .catch(err => console.log(err));
        },
        async UpdateUser(){
            let User = {
                _id : this.user._id,
                nom : this.user.nom,
                cin : this.user.cin,
                email : this.user.email,
                isAdmin : this.user.isAdmin,
                adresse : this.user.adresse,
                tel : this.user.tel,
            }
            var emailText = document.getElementById('email').value;

            if(this.user.nom !==''  && this.user.email !=='' && this.isAdmin !=='' && this.regx.test(emailText)){
                axios.put('http://' + url + '/posts/updateUser/'+User._id, User)
                .then(res => {
                    this.users = this.users.map(u => {
                        if(res.data._id === u._id){
                            return res.data
                        }
                        return u;
                    });
                    
                }); 
                this.$swal('Modifier' , 'modifier avec Succès', 'warning');
            }
            this.formErrorsProfil = [];
            
            if(!this.regx.test(emailText)){
                this.formErrorsProfil.push("invalide email");
            }
            
            if(this.user.nom == ''){
                this.formErrorsProfil.push("Le nom ne peut pas être vide");
            }

            if(this.user.email == ''){
                this.formErrorsProfil.push("L'adresse email ne peut pas être vide");
            }
        },
        updatePassword(){
            let User = {
                _id : this.user._id,
                password: this.newPass,
            }
            if((this.newPass !=='') && (this.confirmNewPass!=='') &&
             (this.newPass == this.confirmNewPass) && (this.newPass.length >= this.minChars) && 
             (this.confirmNewPass.length >= this.minChars)){
                axios.put('http://' + url + '/posts/updatePass/'+User._id, User)
                .then(res => {
                    this.users = this.users.map(u => {
                        if(res.data._id === u._id){
                            return res.data
                        }
                        return u;
                    });
                    
                }); 
                this.$swal('Modifier' , 'Mot de passe modifier avec Succès', 'warning');
            }
            this.formErrors = [];
            
            if(this.newPass == ''){
                this.formErrors.push("Le mot de passe ne peut pas être vide");
            }

            if(this.confirmNewPass == ''){
                this.formErrors.push("confirmation mot de passe ne peut pas être vide");
            }

            if(this.newPass.length < this.minChars){
                this.formErrors.push("Le mot de passe ne peut pas contenir moins de "+ this.minChars +" caractères ");
            }
            if(this.confirmNewPass.length < this.minChars){
                this.formErrors.push("confirmation mot de passe ne peut pas contenir moins de "+ this.minChars +" caractères ");
            }

            if(this.newPass !== this.confirmNewPass){
                this.formErrors.push("Le mot de passe ne correspond pas");
            }
        },


    },
    created(){
        this.getProfile();
        this.getUsers();
    },
    
    

}
</script>

<style scoped>

.main-cons .titleListCons{
    background-color: #0984e3;
    color: #FFF;
    padding: 10px;
    margin-top: 15px;
    border-radius: 10px;
}

.page .main-cons .titleListCons span{
    display: inline-block;
}

.page .main-cons .editProfile{
    width: 50%;
}

.page .main-cons .editProfile label{
    font-size: 19px;
}

.errors-list .error2{
    padding: 15px;
    background-color: rgba(244, 87, 54, 0.14);
    color: #f44336;
    margin-bottom: 15px;
}


</style>