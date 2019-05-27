<template>
    <div class="table-layout">
        <el-table :data="bookInfoList">
                <el-table-column prop="bookName" min-width="110" label="书名"
                    show-overflow-tooltip></el-table-column>
                <el-table-column prop="author" label="作者"
                    show-overflow-tooltip></el-table-column>
                <el-table-column prop="press" label="出版社"> </el-table-column>
                <el-table-column prop="publicationDate" align="center" :formatter="dateFormat"
                    label="出版日期"> </el-table-column>
                <el-table-column prop="books" align="center" :formatter="totalFormat" label="馆藏总数">
                </el-table-column>
                <el-table-column prop="books" align="center" :formatter="isLendFormat" label="可借数">
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
    name: 'Table',
    data() {
        return { };
    },
    created() {},
    methods: {
        // 格式化馆藏总数
        totalFormat(row, column, cellValue) {
            return `${cellValue.length}本`;
        },
        // 格式化可借数
        isLendFormat(row, column, cellValue) {
            let number = 0;
            cellValue.forEach((val) => {
                if (!val.isLend) { number += 1; }
            });
            return `${number}本`;
        },
        // 格式化日期
        dateFormat(row, column, cellValue) {
            return new Date(cellValue).toLocaleDateString();
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
