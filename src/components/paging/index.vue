<template>
    <el-pagination layout="prev, pager, next" :total="totalCount"
    :page-size="pageSize || 8" @current-change="handlePaging">
    </el-pagination>
</template>

<script>

export default {
    name: 'paging',
    props: {
        totalCount: Number,
        pageSize: Number,
    },
    data() {
        return {};
    },
    created() { },
    methods: {
        handlePaging(currentPage) {
            this.$emit('changePage', currentPage);
        },
    },
    computed: {
    },
    watch: {},
    components: {},
};
</script>

<style lang='scss' scoped>
</style>
