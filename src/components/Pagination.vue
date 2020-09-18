<template>
    <nav class="pagination">
        <span class="page-stats">{{pagination.from}} - {{pagination.to}} of {{pagination.total}}></span>
        <a v-if="pagination.prevPageUrl" class="button is-small pagination-previous" @click="$emit('prev');">
            Prev
        </a>
        <a class="button is-small pagination-previous" v-else :disabled="true">
            Prev
        </a>


        <a v-if="pagination.nextPageUrl" class="button is-small pagination-next" @click="$emit('next');">
            Next
        </a>
        <a class="button is-small pagination-next" v-else :disabled="true">
            Next
        </a>
    </nav>
</template>

<script>

////var url ='backend.storeino.info'
var url ='localhost:5000'

export default {
    name: 'Pagination',
    props: ['pagination']

}
</script>

<style>
    .pagination {
        justify-content: fix-end !important;
    }
    .pagination .page-stats{
        align-items: center;
        margin-right: 5px;
    }

    .pagination i{
        color: #3273dc !important;
    }

</style>