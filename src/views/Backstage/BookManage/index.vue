<template>
    <div>
        <div class="tool-box">
            <el-button type="primary" @click="handleAddBookInfo()">增加图书信息</el-button>
            <div style="width:250px">
                <el-input placeholder="搜索图书" prefix-icon="el-icon-search"
                 @change="searchBook()" v-model="searchName">
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
                        <!-- 组件 -->
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
                <el-table-column label="操作" min-width="240" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="warning" size="small" :disabled="scope.row.auditPass"
                        @click="handleModify(scope.$index, scope.row)">
                            修改
                        </el-button>
                        <el-button type="danger" size="small" :disabled="scope.row.auditPass"
                        @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                        <el-button type="primary" size="small" :disabled="scope.row.auditPass"
                        @click="handleNumber(scope.$index, scope.row)">
                            图书数量
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paging-layout">
                <!-- 组件 -->
                <Paging @changePage="changePage" :totalCount="totalCount" :pageSize="8"></Paging>
            </div>
        </div>
        <!-- 组件 -->
        <BookPanle ref="bookPanle" ></BookPanle>
    </div>
</template>

<script>
// 组件
import Tag from '@/components/tag/index.vue';
import Paging from '@/components/paging/index.vue';
import BookPanle from '@/components/bookPanle/index.vue';
// api
import { getBookInfo, deleteBookInfo } from '@/api/bookInfo';

export default {
    name: 'BookManage',
    data() {
        return {
            bookInfoList: [],
            totalCount: 0,
            searchName: '',
        };
    },
    created() {
        this.getBookData();
    },
    methods: {
        // 增加
        handleAddBookInfo() {
            // 跳转到增加图书信息
            this.$router.push({
                path: '/BookManage/BookInfoAddModify',
            });
        },
        // 修改
        handleModify(index, row) {
            // 跳转到修改图书信息
            this.$router.push({
                path: '/BookManage/BookInfoAddModify',
                query: { id: row._id },
            });
        },
        // 删除
        handleDelete(index, row) {
            this.$confirm('确定删除该图书信息吗？').then(() => {
                console.log(row._id);
                // 删除图书信息
                deleteBookInfo({ id: row._id }).then(() => {
                    this.bookInfoList.splice(index, 1);
                    this.$message.success('删除成功');
                }).catch(() => {
                    this.$message.error('删除失败');
                });
            });
            console.log(index, row);
        },
        // 点击图书数量
        handleNumber(index, row) {
            this.$refs.bookPanle.changeBookList(row._id, row.books);
        },
        // 搜索
        searchBook() {
            this.getBookData();
        },
        // 切换页码 用户信息列表
        changePage(pageNumber) {
            this.getBookData(pageNumber);
        },
        // 全部图书信息
        getBookData(page = 1) {
            let reqBody = {};
            if (this.searchName) { reqBody = { name: this.searchName }; }
            // api
            getBookInfo({ page, ...reqBody }).then((res) => {
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
    components: {
        Paging,
        Tag,
        BookPanle,
    },
};
</script>

<style lang='scss' scoped>
.book-manage-layout {
    height:79vh;
    padding:15px;
    background:white;
    box-shadow: $box-shadow-base;
}
.tool-box {
    @include displayCenter($justify-content:space-between);
    padding:20px 0 15px 0;
}
.paging-layout {
    padding-top:25px;
    @include displayCenter();
}
.item {
      margin: 4px;
}

</style>
