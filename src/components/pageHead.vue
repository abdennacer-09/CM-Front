<template>
    <div class="page-head">
        <h3>{{title}}</h3>
        <p class="page-description lead">This is description pf Home Page</p>
    </div>
</template>

<script>

////var url ='backend.storeino.info'
var url ='localhost:5000'

export default {
    name: 'pageHead',
    data:function(){
    return{
            title:'page',
            
        }
    },
}
</script>

<style>

</style>