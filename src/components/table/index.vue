<template>
    <div class="table-layout">
        <el-table :data="bookInfoList">
                <el-table-column prop="bookName" min-width="110" label="书名"
                show-overflow-tooltip></el-table-column>
                <el-table-column prop="author" label="作者"
                show-overflow-tooltip></el-table-column>
                <el-table-column prop="press" label="出版社"> </el-table-column>
                <el-table-column prop="publicationDate" label="出版日期"> </el-table-column>
                <el-table-column prop="totalNumber" :formatter="formatter" label="馆藏总数">
                </el-table-column>
                <el-table-column prop="borrowNumber" :formatter="formatter" label="可借数">
                </el-table-column>
                <el-table-column prop="type" label="类别">
                    <template slot-scope="scope">
                        <Tag :name="scope.row.bookType.typeName"></Tag>
                    </template>
                </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// 组件
import Tag from '@/components/tag/index.vue';

export default {
    name: 'table',
    data() {
        return {
            bookSituation: [{
                bookName: '你不知道的 JavaScript 上',
                auth: '阮一峰',
                press: '清华出版社',
                date: new Date(),
                totalNumber: '12',
                borrowNumber: '5',
                type: '技术类',
            }, {
                bookName: '你不知道的 JavaScript 上',
                auth: '阮一峰',
                press: '清华出版社',
                date: new Date(),
                totalNumber: '12',
                borrowNumber: '5',
                type: '技术类',
            }],
        };
    },
    created() {},
    methods: {
        formatter(row, column, cellValue) {
            return `${cellValue}本`;
        },
    },
    computed: {
        ...mapState([
            'bookInfoList',
        ]),
    },
    watch: {},
    components: {
        Tag,
    },
};
</script>
<style lang='scss' scoped>
.table-layout{
    padding:10px;
    background:white;
    box-shadow:$box-shadow-base;
}
</style>
