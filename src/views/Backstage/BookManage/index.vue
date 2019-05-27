<template>
    <div>
        <div class="tool-box">
            <el-button type="primary" @click="handleAddBookInfo()">增加图书信息</el-button>
            <div style="width:250px">
                <el-input placeholder="搜索图书" prefix-icon="el-icon-search"
                 @change="searchBook" v-model="searchText">
                </el-input>
            </div>
        </div>
        <div class="book-manage-layout">
            <el-table :data="bookInfoList">
                <el-table-column prop="bookName" min-width="150" label="书名"
                    show-overflow-tooltip></el-table-column>
                <el-table-column prop="author"  min-width="150" label="作者"
                    show-overflow-tooltip></el-table-column>
                <el-table-column prop="press"  min-width="150" label="出版社"> </el-table-column>
                <el-table-column prop="publicationDate" align="center" :formatter="dateFormat"
                min-width="100" label="出版日期"> </el-table-column>
                <el-table-column prop="books" align="center" :formatter="totalFormat" label="馆藏总数">
                </el-table-column>
                <el-table-column prop="books" align="center" :formatter="isLendFormat" label="可借数">
                </el-table-column>
                <el-table-column prop="type" label="类别">
                    <template slot-scope="scope">
                        <Tag :name="scope.row.bookType.typeName"></Tag>
                    </template>
                </el-table-column>
                <el-table-column min-width="90" label="查看图片">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" placement="left">
                            <img slot="content" style="width:186px;height:229.5px"
                            :src="scope.row.image" />
                            <el-link :underline="false" type="primary">查看图片</el-link>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="150" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="warning" size="small" :disabled="scope.row.auditPass"
                        @click="handleModify(scope.$index, scope.row)">
                            修改
                        </el-button>
                        <el-button type="danger" size="small" :disabled="scope.row.auditPass"
                        @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paging-layout">
                <Paging @changePage="changePage" :totalCount="totalCount" :pageSize="8"></Paging>
            </div>
        </div>
    </div>
</template>

<script>
// 组件
import Tag from '@/components/tag/index.vue';
import Paging from '@/components/paging/index.vue';
// api
import { getAllBookInfo, getBookInfoBySearch } from '@/api/bookInfo';

export default {
    name: 'BookManage',
    data() {
        return {
            bookInfoList: [],
            totalCount: 0,
            searchText: '',
        };
    },
    created() {
        this.getInitBookInfo();
    },
    methods: {
        // 增加
        handleAddBookInfo() {
            // 跳转到增加图书信息
        },
        // 修改
        handleModify(index, row) {
            // 跳转到修改图书信息
            console.log(index, row);
        },
        // 删除
        handleDelete(index, row) {
            this.$confirm('确定删除该图书信息吗？')
                .then(() => {
                    // 删除图书信息
                });
            console.log(index, row);
        },
        // 搜索
        searchBook(text) {
            if (text) {
                getBookInfoBySearch(text)
                    .then((res) => {
                        console.log(res.data);
                        this.totalCount = res.data.totalCount;
                        this.bookInfoList = res.data.bookInfo;
                    });
            } else {
                this.getInitBookInfo();
            }
        },
        // 切换页码 用户信息列表
        changePage(pageNumber) {
            getAllBookInfo(pageNumber).then((res) => {
                this.bookInfoList = res.data.bookInfo;
            });
        },
        // 全部图书信息
        getInitBookInfo() {
            getAllBookInfo(1).then((res) => {
                console.log(res.data);
                this.totalCount = res.data.totalCount;
                this.bookInfoList = res.data.bookInfo;
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
    computed: {},
    watch: {},
    components: { Paging, Tag },
};
</script>

<style lang='scss' scoped>
.book-manage-layout{
    height:79vh;
    padding:15px;
    background:white;
    box-shadow: $box-shadow-base;
}
.tool-box{
    @include displayCenter($justify-content:space-between);
    padding:20px 0 15px 0;
}
.paging-layout{
    padding-top:25px;
    @include displayCenter();
}
.item {
      margin: 4px;
}
</style>
