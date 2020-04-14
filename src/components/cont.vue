
<template>
    <div class="content-area" :class="{ nosidebar: isToggle }">
        <header>
            <i class="fas fa-exchange-alt fa-lg toggle-sidebar"  @click="isToggle = !isToggle"></i>
        </header>
        <h3>Home Page</h3>
        <div class="content">

        </div>
    </div>
</template>

<style scoped>
        .page .content-area{
            width: calc(100% - 250px);
            min-height: 100%;
            transition: 0.3s;
            will-change: width;
            float: right;
        }
        .page .nosidebar{
            width: 100%;
        }
</style>

<script>
export default {
    
name: 'cont',
data:function(){
    return{
        isToggle: false
    }
},
methods:{


    }
}

</script>