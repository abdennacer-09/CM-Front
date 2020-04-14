<template>
    <div class="table-responsive">
        <table class="main-table text-center table table-bordered">
            <tr>
                <th>CIN</th>
                <th>Prenom</th>
                <th>Nom</th>
                <th>Afc</th>
                <th>Adresse</th>
                <th>Pro tession</th>
                <th>Situation familiale</th>
                <th>Mituelle</th>
                <th>Control</th>
            </tr>
            <tr v-bind:key="patient._id" v-for="patient in patients">
                <td>JM77212</td>
                <td>{{patient.nom}}</td>
                <td>Snow</td>
                <td>quer</td>
                <td>winterfell</td>
                <td>azer</td>
                <td>Single</td>
                <td>Non</td>
                <td>
                    <i class="fas fa-edit"><a href="#"></a></i>&nbsp;
                    <i class="fas fa-trash-alt"><a href="#"></a></i>
                </td>
            </tr>
            
        </table>
    </div>
</template>

<script>

export default {
    name: 'Datatable',
}
</script>

<style>
    
</style>