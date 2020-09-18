
<template>
<body>
    <!--<div class="sidebar" :class="{ 'nosidebar' : isSelected }" @AnimatedChanged='isSelected'>Sidebar</div>-->
    <div class="example">
        <div v-if="isLoggedIn" class="sidebar" :class="{ nosidebar: isToggle }">
            <div class="logo-area text-center" > LOGO </div>
            <ul class="links-area list-unstyled">
                <li><router-link class="act" to="/" active-class="active" exact>Accueille</router-link></li>
                <!--
                <li><a href="#" @click="toggle" class="toggle-submenu forms" >
                        Forms <i  class="fas fa-angle-right"></i>
                    </a>
                    <ul class="child-links list-unstyled">
                        <li><a href="#"> Input </a></li>
                        <li><a href="#"> Textarea </a></li>
                        <li><a href="#"> Checkbox </a></li>
                        <li><a href="#"> Radio </a></li>
                    </ul>
                </li>
                <li><a @click="toggle2" class="toggle-submenu2 misc" href="#"> 
                        Misc 
                        <i class="fas fa-angle-right"></i>
                    </a>
                    <ul class="child-links list-unstyled">
                        <li><a href="#"> Loading </a></li>
                        <li><a href="#"> Breadcrumbs </a></li>
                    </ul>
                </li>
                -->
                <li><router-link to="/patient" class="patient" active-class="active">Patients</router-link></li>
                <li><router-link to="/rendezVous" class="rdv" active-class="active">Rendez-vous</router-link></li>
                <li><router-link to="/certificats" class="certificat" active-class="active">Certificats</router-link></li>
                <li v-if="!isLoggedIn"><router-link to="/UserList" class="us" active-class="active">Users</router-link></li>
                <li><a @click="toggle2" class="toggle-submenu2 misc" href="#"> 
                        Consulations 
                        <i class="fas fa-angle-right"></i>
                    </a>
                    <ul class="child-links list-unstyled">
                        <li><router-link to="/listConsultation" class="Listconslt" active-class="active">Liste Consultations</router-link></li>
                        <li><router-link to="/consultation" class="conslt" active-class="active">Gestion Consultation</router-link></li>
            
                    </ul>
                </li>
                </ul>
        </div>

        <div class="content-area" :class="{ nosidebar: isToggle }">
            <header v-if="isLoggedIn" class="header">
                <i class="fas fa-exchange-alt fa-lg toggle-sidebar" @click="isToggle = !isToggle"></i>
                <!--<div class="dropdown notifications-container">
                    <i class="fa fa-bell header-icon fa-lg toggle-notif " id="notifications" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        
                    </i>
                    <div class="dropdown-menu" aria-labelledby="notifications">
                        <div class="noti-head">
                            Notifications
                            <span>10</span>
                        </div>
                        <div class="noti-content">
                            <ul class="list-unstyled">
                                <li>
                                    <i class="fa fa-envelope fa-lg"></i>
                                    You get Email from docteur
                                </li>
                                <li>
                                    <i class="far fa-money-bill-alt fa-lg"></i>
                                    You get Email from docteur
                                </li>
                                <li>
                                    <i class="far fa-thumbs-up fa-lg"></i>
                                    You get Email from docteur
                                </li>
                                <li>
                                    <i class="fa fa-envelope fa-lg"></i>
                                    You get Email from docteur
                                </li>
                                <li>
                                    <i class="fa fa-envelope fa-lg"></i>
                                    You get Email from docteur
                                </li>
                            </ul>
                        </div>
                        <div class="noti-foot text-center">
                            <a href="#">View All Notifications</a>
                        </div>
                    </div>
                </div>-->

                <!--<i class="fa fa-expand header-icon fa-lg toggle-fullscreen"></i>-->

                <div class="dropdown usermenu-container">
                    <div class="username" id="usermenu" data-toggle='dropdown' aria-haspopup="true" aria-expanded="false">
                        <!--<img class="avatar rounded-circle" src="../images/victor2.png" alt="user avatar">-->
                        <i class="fa fa-user fa-lg fa-fw"></i>
                        <span> {{ user.nom }} </span>
                        <i class="fa fa-angle-down fa-lg"></i>
                    </div>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="usermenu">
                        <ul class="activities-list list-unstyled">
                            <li v-if="user.isAdmin == 1">
                                <a href="/parametrages"  class="col">
                                    <div class="link-box">
                                        <i class="fas fa-cog fa-lg fa-fw"></i>
                                        <!--<span>Paramétrages</span>-->
                                        <span>Paramétrages</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="/profile" class="col">
                                    <div class="link-box">
                                        <i class="fa fa-user fa-lg fa-fw"></i>
                                        <!--<span>My Profile</span>-->
                                        <span>Profile</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a to="/logout" @click.prevent="logoutUser" class="col logout">    
                                    <div class="link-box">
                                        <i class="fa fa-power-off fa-lg fa-fw"></i>
                                        <span>Déconnecter</span>
                                    </div>
                                </a>
                            </li>
                        </ul> 
                    </div>
                </div>
                
            </header>
            <div class="dash">
                <router-view />
                <vue-progress-bar></vue-progress-bar>
            </div>
            
        </div>
    </div></body>
</template>

<style scoped>
    
</style>

<script>
import $ from 'jquery';
import { mapGetters, mapActions } from "vuex";
//import store from '@/store/store';
//import pageHead from '@/components/pageHead';
//import fullscreen from 'vue-fullscreen';
//import Vue from 'vue';
//Vue.use(fullscreen);

//var url ='localhost:5000'


//import { mapState } from 'vuex';

export default {
    name: 'sidebar',
    data:function(){
    return{
            isToggle: false,
            isAngle : false,
            isActive : false
        }
    },

    methods:{
        toggle : function(){
            $('.toggle-submenu').find(".fa-angle-right").toggleClass('down'); 
            $('.toggle-submenu').next('.child-links').slideToggle();
        },
        toggle2 : function(){
            $('.toggle-submenu2').find(".fa-angle-right").toggleClass('down'); 
            $('.toggle-submenu2').next('.child-links').slideToggle();
        },
        ...mapActions(['logout']),
        logoutUser(){
            this.logout();
        },
        ...mapActions(['getProfile'])
    },
    components:{
        //pageHead,
    },
    computed:{
        ...mapGetters(['isLoggedIn', 'user']),
       /* UserLog(){
            return this.$store.getUser.UserLog;
        }*/

        /*...mapGetters({
  exampleGetter: 'myModule1/exampleGetter',
  anotherGetter: 'myModule2/anotherGetter',
})*/
    } ,
    created(){
        this.getProfile();
    },

}

            

</script>
