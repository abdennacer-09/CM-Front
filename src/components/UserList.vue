<template>
    <table>
        <tr>
            <th>Nom User</th>
            <th>Control</th>
        </tr>
        <tr v-for="user in users" :key="user._id">
            <td>{{user.nom}}</td>
            <td><button @click="loginUser(user)">login</button></td>
        </tr>
    </table>
</template>

<script>

//var url ='localhost:5000';var url ='localhost:5000'

import { mapState } from 'vuex';

export default {
    name: 'UserList',
    data(){
        return{
            email: '',
            password: '',
            //error: null
        };
    },
    computed: {
        ...mapState(['users'])
    },
    mounted(){
        this.$store.dispatch("loadUser")
    },
    methodes: {
        loginUser(user){
            this.$store.dispatch('loginUser', user);
        }
    }

}
</script>

<style>

</style>