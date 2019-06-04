
<template>
    <div>
        <!-- 遮罩 -->
        <div class="mask" v-show="isShow" @click="clickMask()"></div>
        <!-- 图书数量操作面板 -->
        <div class="panle" :style="{right:(isShow ? '0' : '-500px')}">
            <el-table :data="bookList" height="700">
                <el-table-column  prop="_id" label="ID" >
                </el-table-column>
                <el-table-column  prop="isLend" label="是否借出" :formatter="formatIsLend">
                </el-table-column>
                <el-table-column label="操作"  fixed="right">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small" :disabled="scope.row.auditPass"
                        @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="add-button-box">
                <el-input v-model="addBookNumber" placeholder="数量"></el-input>
                <el-button type="success" @click="addBook()">增加</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { deleteBook, putBook } from '@/api/book';

export default {
    name: 'BookPanle',
    data() {
        return {
            isShow: false,
            // 列表
            bookList: [],
            // 当前操作的图书信息ID
            bookInfoId: '',
            addBookNumber: 1,
        };
    },
    created() {

    },
    methods: {
        // 增加图书
        addBook() {
            const id = this.bookInfoId;
            const number = this.addBookNumber;
            if (!number) {
                return this.$message.warning('数量不能为空');
            }
            // api
            putBook({ id, number }).then((res) => {
                const result = res.data;
                this.bookList.push(result.books.pop());
            });
            return true;
        },
        // 删除
        handleDelete(index, row) {
            if (row.isLend) {
                this.$message.warning('无法删除已借出的书');
            }
            const id = this.bookInfoId;
            const bid = row._id;
            // api
            deleteBook({ id, bid })
                .then(() => {
                    this.$message.success('删除图书成功');
                    this.bookList.splice(index, 1);
                })
                .catch(() => {
                    this.$message.error('删除失败');
                });
        },
        // 父组件点击按钮触发
        // params：（ id: _id    books: Array）
        changeBookList(id, books) {
            this.isShow = true;
            this.bookInfoId = id;
            // 这里不对 books 进行深拷贝，实现和表格同步增加删除数据
            this.bookList = books;
            // this.bookList = JSON.parse(JSON.stringify(books));
        },
        // 点击遮罩层关闭
        clickMask() {
            this.isShow = false;
        },
        formatIsLend(row) {
            const result = row.isLend ? '是' : '否';
            return result;
        },
    },
    computed: {
    },
    watch: {},
    components: {},
};
</script>

<style lang='scss' scoped>
.mask {
    width:100vw;
    height:100vh;
    opacity: 0.5;
    background:black;
    position:fixed;
    top:0;
    left:0;
    z-index: 20;
}
.panle {
    width:500px;
    height:100vh;
    padding:5px;
    background:white;
    box-shadow: $box-shadow-base;
    transition: right 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
    position: fixed;
    top:0;
    right:0;
    z-index: 21;
    overflow: auto;
}
.add-button-box {
    width:100%;
    padding:20px;
    @include displayCenter($justify-content:space-between);
    button {
        width:1000px;
        margin-left:20px;
    }
}
</style>
