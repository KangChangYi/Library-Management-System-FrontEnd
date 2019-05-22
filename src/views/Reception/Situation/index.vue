
<template>
    <div class="book-situation-layout">
      <!-- 组件 -->
      <page-header name="Situation"></page-header>
      <div class="content-layout">
            <!-- 组件 -->
            <cTable></cTable>
            <div class="paging-layout">
                <!-- 组件 -->
                <Paging @changePage="changePage"></Paging>
            </div>
      </div>
    </div>
</template>

<script>
// 组件
import pageHeader from '@/components/header/index.vue';
import Paging from '@/components/paging/index.vue';
import cTable from '@/components/table/index.vue';
// api
import { getAllBookInfo } from '@/api/bookInfo';

export default {
    name: 'Situation',
    data() {
        return {};
    },
    created() {
        // 图书信息
        getAllBookInfo(1).then((res) => {
            this.$store.commit('changeBookInfoList', res.data.bookInfo);
            this.$store.commit('changeBookInfoListTotalCount', res.data.totalCount);
        });
    },
    methods: {
        // 切换页码 图书信息
        changePage(pageNumber) {
            getAllBookInfo(pageNumber).then((res) => {
                this.$store.commit('changeBookInfoList', res.data.bookInfo);
            });
        },
    },
    computed: {},
    watch: {},
    components: {
        pageHeader,
        cTable,
        Paging,
    },
};
</script>

<style lang='scss' scoped>
.book-situation-layout{
    width:$layout-width + 20px;
    // border:1px red solid;
    margin:auto;
    .content-layout{
        height:90vh;
        padding:10px;
    }
}
.paging-layout{
    padding-top:25px;
    @include displayCenter();
}
</style>
