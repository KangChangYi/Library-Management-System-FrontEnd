
<template>
    <div class="book-situation-layout">
      <!-- 组件 -->
      <page-header name="Situation"></page-header>
      <div class="content-layout">
            <!-- 组件 -->
            <cTable></cTable>
            <div class="paging-layout">
                <!-- 组件 -->
                <Paging></Paging>
            </div>
      </div>
    </div>
</template>

<script>
import pageHeader from '@/components/header/index.vue';
import Paging from '@/components/paging/index.vue';
import cTable from '@/components/table/index.vue';

export default {
    name: 'Situation',
    data() {
        return {};
    },
    created() { },
    methods: {},
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
