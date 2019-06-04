
<template>
    <div class="book-situation-layout">
      <!-- 组件 -->
      <page-header name="图书借阅情况"></page-header>
      <div class="content-layout">
            <!-- 组件 -->
            <cTable></cTable>
            <div class="paging-layout">
                <!-- 组件 -->
                <Paging @changePage="changePage" :totalCount="totalCount"></Paging>
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
import { getBookInfo } from '@/api/bookInfo';

export default {
    name: 'Situation',
    data() {
        return {
            totalCount: 0,
        };
    },
    created() {
        // 图书信息
        this.getBookData();
    },
    methods: {
        // 切换页码
        changePage(pageNumber) {
            this.getBookData(pageNumber);
        },
        // 获取图片信息
        getBookData(page = 1) {
            getBookInfo({ page }).then((res) => {
                this.$store.commit('changeBookInfoList', res.data.bookInfo);
                this.totalCount = res.data.totalCount;
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
