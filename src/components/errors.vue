<template>
    <div class="alert alert-danger">{{ msg }}</div>
</template>

<script>

////var url ='backend.storeino.info'
//var url ='localhost:5000'

export default {
    name: 'errors',
    props: ["msg"]
}
</script>

<style scoped>
    .alert{
        border-radius: 0px;
    }

    .alert-danger{
        background: #d63031;
        color: #fff;
    }
</style>