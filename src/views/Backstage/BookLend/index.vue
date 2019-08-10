<template>
    <div>
        <div class="tool-box">
            <div style="width:250px">
                <el-input placeholder="搜索图书" prefix-icon="el-icon-search"
                 @change="searchBook()" v-model="searchName">
                </el-input>
            </div>
        </div>
        <div class="borrow-info-layout">
            <el-table :data="bookInfoList" v-loading="isLoading">
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
                <el-table-column label="操作" min-width="70" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="warning" size="small" :disabled="scope.row.auditPass"
                        @click="handleLend(scope.$index, scope.row)">
                            借阅
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paging-layout">
                <!-- 组件 -->
                <Paging @changePage="changePage" :totalCount="totalCount"></Paging>
            </div>
        </div>
    </div>
</template>

<script>
// 组件
import Paging from '@/components/paging/index.vue';
import Tag from '@/components/tag/index.vue';
// api
import { getBookInfo } from '@/api/bookInfo';
import { borrowBook } from '@/api/borrow';
import { setTimeout } from 'timers';

export default {
    name: 'BorrowInfo',
    data() {
        return {
            bookInfoList: [],
            totalCount: 0,
            searchName: '',
            isLoading: false,
        };
    },
    created() {
        // 图书信息
        this.getBookData();
    },
    methods: {
        // 点击借阅
        handleLend(index, row) {
            this.isLoading = true;
            const userId = this.$store.state.userInfo._id;

            borrowBook({ id: row._id, userId }).then(() => {
                // 图书信息
                this.getBookData();
                setTimeout(() => {
                    this.isLoading = false;
                }, 200);
            }).catch(() => {
                this.$message.warning('借阅失败');
                this.isLoading = false;
            });
        },
        // 搜索
        searchBook() {
            this.getBookData();
        },
        // 切换页码
        changePage(pageNumber) {
            this.getBookData(pageNumber);
        },
        // 获取图书信息
        getBookData(page = 1) {
            const result = {};
            if (this.searchName) {
                result.name = this.searchName;
            }
            getBookInfo({ page, ...result }).then((res) => {
                this.bookInfoList = res.data.bookInfo;
                this.totalCount = res.data.totalCount;
            });
        },
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
    computed: { },
    watch: {},
    components: {
        Paging,
        Tag,
    },
};
</script>
<style lang='scss' scoped>
.borrow-info-layout{
    height:79vh;
    padding:15px;
    background:white;
    box-shadow: $box-shadow-base;
}
.tool-box {
    @include displayCenter($justify-content:space-between);
    padding:20px 0 15px 0;
}
.paging-layout{
    padding-top:25px;
    @include displayCenter();
}
</style>
