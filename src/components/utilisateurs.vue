<template>
    <div v-if="user.isAdmin == 1" class="main-patient">
        
        <div class="container pat">
            <div class="card-title titleListPatient">
                <i class="fas fa-tasks"></i>&nbsp;
                <span><h5>Gestion des utilisateurs</h5></span>
            </div>
            <div class="card">
                <div class="card-title">
                    <i class="fas fa-table"></i><span> Liste des utilisateurs</span> 
                    <div class="card-tools">
                        <button class="btn btn-primary" data-toggle="modal" @click.prevent="btnAjouterUser()" data-target="#addNew"><i class="fas fa-plus"></i>  Ajouter utilisateur</button>
                    </div>
                </div>
                
                <div class="card-body row">
                    <!--<Datatable/>--> 
                    <div class="divSearch col-md-12">
                        <input v-model="search" class="form-control" type="text" placeholder="Search" aria-label="Search">
                    </div>
                    <div class="table-responsive">
                        <table class="main-table text-center table table-bordered">
                            <tr>
                                <th>CIN</th>
                                <th>Nom</th>
                                <th>Tel</th>
                                <th>Email</th>
                                <th>Adresse</th>
                                <th>Control</th>
                            </tr>
                            <tr v-bind:key="userOn._id" v-for="userOn in filteredUsers">
                                <td>{{ userOn.cin }}</td>
                                <td>{{ userOn.nom }}</td>
                                <td>{{ userOn.tel }}</td>
                                <td>{{ userOn.email }}</td>
                                <td>{{ userOn.adresse }}</td>
                                <td>
                                    <a href="#" data-toggle="modal" @click="editUser(userOn)"  data-target="#addNew"><i class="fas fa-edit"></i></a>
                                    &nbsp;
                                    <a href="/utilisateurs" @click="deleteUser(userOn._id)"> <i class="fas fa-trash-alt"></i></a>
                                </td>
                            </tr>
                            
                        </table>
                    </div>
                    <div class="btn-group col-md-2 offset-md-5">
                        <button 
                            v-if="page != 1"
                            type="button" 
                            @click="page--"
                            class="btn btn-sm btn-outline-secondary"> 
                                Précédent
                        </button>
                        <button 
                            type="button"
                            v-for="pageNumber in pages.slice(page-1, page+6)"
                            :key="pageNumber"
                            @click="page = pageNumber"
                            class="btn btn-sm btn-outline-secondary">
                                {{pageNumber}}
                        </button>

                        <button
                            v-if="page < pages.length"
                            type="button" 
                            @click="page++"
                            class="btn btn-sm btn-outline-secondary">
                                Suivant
                        </button>
                    </div>
                </div>
            </div>

            <!--    ******  Testing DataTable ******  -->

            <!-- <div class="projects">
                <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders"></datatable>
                <pagination></pagination>
            </div>-->
            
        </div>

        <!-- Modal New Record-->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-if="myUser" class="modal-title" id="addNewLabel">Modifier utilisateur</h5>
                        <h5 v-else class="modal-title" id="addNewLabel">Nouveau utilisateur</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <errors v-if="error" :msg="error"/>
                        <div class="errors-list">
                            <div v-bind:key="error2._id" class="error2" v-for="error2 in formErrors" >{{ error2 }}</div>
                        </div>
                        <form  method="post">
                            <div class="form-group row">
                                <label for="cin" class="col-sm-2 col-form-label">CIN:</label>
                                <div class="col-sm-10">
                                <input v-model="cin" type="text" class="form-control" id="cin">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="nom" class="col-sm-2 col-form-label">Nom:</label>
                                <div class="col-sm-10">
                                <input v-model="nom" type="text" class="form-control" id="nom">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-sm-2 col-form-label">Email:</label>
                                <div class="col-sm-10">
                                <input v-model="email"  required="required" type="email" class="form-control" id="email">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="tele" class="col-sm-2 col-form-label">Telephone:</label>
                                <div class="col-sm-10">
                                <input v-model="tel" type="text" class="form-control" id="tele" >
                                </div>
                            </div>

                            <div v-if="myUser == null" class="form-group row">
                                <label for="pass" class="col-sm-2 col-form-label">Mot de passe:</label>
                                <div class="col-sm-10">
                                <input v-model="password" required="required" type="password" class="form-control" id="pass" >
                                </div>
                            </div>

                            <div v-if="myUser == null" class="form-group row">
                                <label for="conf" class="col-sm-2 col-form-label">Confirm mot de passe:</label>
                                <div class="col-sm-10">
                                <input v-model="confirm_password" required="required" type="password" class="form-control" id="conf" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label" for="role">Role </label>
                                <div class="col-sm-10">
                                    <select v-model="isAdmin" class="form-control" id="role">
                                        <option  disabled selected>Sélectionnez le role...</option>
                                        <option value="1">Admin</option>
                                        <option value="0">Docteur</option>
                                        <option value="0">secrétaire</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="adresse" class="col-sm-2 col-form-label">Adresse:</label>
                                <div class="col-sm-10">
                                    <textarea v-model="adresse" class="form-control" id="adresse"  rows="3"></textarea>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                        <!--<button @click="addPatient()" type="button" class="btn btn-success">Enregistrer</button>-->
                        <input v-if="myUser" type="submit" @click.prevent="updateUser()"  class="btn btn-success" value="Modifier">
                        <input v-else type="submit"  @click.prevent="registerUser()" class="btn btn-success" value="Enregistrer">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import errors from '@/components/errors';
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import $ from 'jquery';

var url ='localhost:5000';
//var url ='backend.storeino.info'

export default {
    name: 'utilisateurs',
    data(){
        return{
            cin:'',
            nom:'',
            tel:'',
            password:'',
            confirm_password:'',
            email:'',
            adresse:'',
            isAdmin:'',
            users:[],
            myUser: null,
            search: '',
            formErrors: [],
            regx : /^([a-z 0-9-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/,
            minChars: 3,
            page:1,
            perPage:10,
            pages:[]
        }
    },
    components:{
        errors
    },
    created(){
        this.getUsers();
        //setInterval( () => this.getPatients(), 2000);
    },
    computed:{
        filteredUsers: function(){
            //var moment = require('moment');
            return  this.paginate(this.users).filter((userOn) => {
                return userOn.nom.toLowerCase().includes(this.search.toLowerCase()) || 
                userOn.cin.toLowerCase().includes(this.search.toLowerCase()) || 
                userOn.email.toLowerCase().includes(this.search.toLowerCase()) ||    
                userOn.adresse.toLowerCase().includes(this.search.toLowerCase()) || 
                userOn.tel.match(this.search); 
            });
        },
        ...mapGetters(['error' , 'user']),
    },
    watch:{
        users(){
            this.setUsers();
        }
    },
    methods:{
        paginate(users){
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return users.slice(from, to)
        },
        setUsers(){
            let numberOfPages = Math.ceil(this.users.length / this.perPage);
            for(let i = 1; i <= numberOfPages; i++){
                this.pages.push(i);
            }
        },

        ...mapActions(["register"]),
        btnAjouterUser(){
            this.myUser = null;
            this.cin = ''; this.nom = ''; this.tel = ''; this.password = '';
                this.confirm_password = ''; this.email = '';
                this.adresse = ''; this.isAdmin=''; this.formErrors = [];
        },
        registerUser(){
            let user = {
                cin : this.cin,
                nom: this.nom,
                tel: this.tel,
                password: this.password,
                confirm_password: this.confirm_password,
                email: this.email,
                adresse: this.adresse,
                isAdmin: this.isAdmin
            }

            
            var emailText = document.getElementById('email').value;
            
            if(this.email !='' && this.password!='' && this.confirm_password !='' && this.regx.test(emailText) && this.password.length >= this.minChars){
                this.register(user).then(res => {
                    if(res.data.success){
                        //this.$router.push("utilisateurs")
                        this.cin = ''; this.nom = ''; this.tel = ''; this.password = '';
                        this.confirm_password = '';
                        this.adresse = ''; this.isAdmin=''; 
                        //Fire.$emit('AfterCreate');
                        $('#addNew').modal('hide');
                        this.$swal({title:'Ajouter' , text:'utilisateur ajouter avec Succès', icon:'success', buttons: true}).then((willRef) => {
                            if(willRef){
                                window.location = '/utilisateurs'
                            }
                            
                        });
                    }
                });
            }

            this.formErrors = [];

            if(!this.regx.test(emailText)){
                this.formErrors.push("invalide email");
            }

            if(!this.email){
                this.formErrors.push("L'adresse email ne peut pas être vide");
            }
            
            if(!this.password){
                this.formErrors.push("Le mot de passe ne peut pas être vide");
            }

            if(!this.confirm_password){
                this.formErrors.push("confirmation mot de passe ne peut pas être vide");
            }

            if(this.password.length < this.minChars){
                this.formErrors.push("Le mot de passe ne peut pas contenir moins de "+ this.minChars +" caractères ");
            }
            
        },
        getUsers(){
                axios.get('http://' + url + '/posts/users')
                .then(res => this.users = res.data)
                .catch(err => console.log(err));
        },

        deleteUser(_id){
            if(confirm('êtes-vous sûr de supprimer cet élément ?')){
                axios.delete(`http://`+url+`/posts/deleteUser/${_id}`)
                .then( () =>{
                    this.users = this.users.filter(userOn => userOn._id !== _id);
                })
            }
        },

        editUser(userOn){
            this.myUser = userOn;
            this.cin = userOn.cin;
            this.nom = userOn.nom;
            this.tel = userOn.tel;
            this.email = userOn.email;
            this.adresse = userOn.adresse;
            this.isAdmin = userOn.isAdmin;
            this.formErrors = [];
        },

        updateUser(){
            let User = {
                ...this.myUser,
                cin: this.cin,
                nom: this.nom,
                tel: this.tel,
                email: this.email,
                adresse : this.adresse,
                isAdmin : this.isAdmin,
            }
            /*var dupEmail = this.users.indexOf(this.myUser.email);
            console.log(dupEmail);
            console.log(this.myUser.email);
            console.log(this.email);*/
            /*if(dupEmail){
                this.formErrors.push("L'adresse e-mail est déjà utilisée.");
            }*/
            
                var CaractersLength = "HH",
                i= 0;
            axios.put('http://' + url + '/posts/updateUser/'+User._id, User)
                .then(res => {
                    this.users = this.users.map(u => {
                        if(res.data._id === u._id){
                            return res.data
                        }
                        return u;
                    });
                    
                });
                $('#addNew').modal('hide');
                this.$swal('Modifier' , 'utilisateur modifier avec Succès', 'warning');
               // this.$swal({title:'Modifier' , text:'utilisateur modifier avec Succès', icon:'warning', buttons: true}).then((willRef) => {
                 //       if(willRef){
                            //window.location = '/utilisateurs'
                   //     }
                        
                    //});
            var typeInter = setInterval( () => {
                    this.getUsers();
                    i = i + 1;
                    if(i > CaractersLength.length - 1){
                        clearInterval(typeInter);
                    }
                } , 400);
            
        },

    }
}
</script>

<style scoped>
    .errors-list .error2{
    padding: 15px;
    background-color: rgba(244, 87, 54, 0.14);
    color: #f44336;
    margin-bottom: 15px;
}
.page .main-patient .modal-dialog {
     max-width: 700px; 
    margin: 1.75rem auto;
}
</style>