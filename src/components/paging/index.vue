<template>
    <el-pagination layout="prev, pager, next" :total="totalCount"
    :page-size="8" @current-change="handlePaging">
    </el-pagination>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'paging',
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
        ...mapState([
            'totalCount',
        ]),
    },
    watch: {},
    components: {},
};
</script>

<style lang='scss' scoped>
</style>
