<template>
        <div class="current-borrow-layout">
            <el-table :data="borrowInfoList" v-loading="isLoading">
                <el-table-column prop="bookInfo.bookName" min-width="110" label="书名"
                    show-overflow-tooltip></el-table-column>
                <el-table-column prop="bookId" label="所借图书ID"
                    show-overflow-tooltip></el-table-column>
                <el-table-column prop="borrowDate" align="center" :formatter="dateFormat"
                    label="借书日期"></el-table-column>
                <el-table-column prop="shouldDate" align="center" :formatter="dateFormat"
                    label="应还日期"></el-table-column>
                <el-table-column prop="returnDate" align="center" :formatter="dateFormat"
                  label="还书日期"></el-table-column>
                <el-table-column prop="amountFine" align="center" label="罚款金额">
                </el-table-column>
                <el-table-column prop="isPayment" label="缴费状态" :formatter="stateFormat">
                </el-table-column>
                <el-table-column label="操作" min-width="140" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="warning" size="small" :disabled="!scope.row.isLend"
                        @click="handleReturn(scope.$index, scope.row)">
                            还书
                        </el-button>
                        <el-button v-if="scope.row.isLend===false" type="danger"
                        size="small" :disabled="!scope.row.amountFine"
                        @click="handlePayment(scope.$index, scope.row)">
                            缴费
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paging-layout">
                <!-- 组件 -->
                <Paging @changePage="changePage" :totalCount="totalCount"></Paging>
            </div>
        </div>
</template>

<script>
// 组件
import Paging from '@/components/paging/index.vue';
// api
import { getBorrowInfo, returnBook } from '@/api/borrow';
import { setTimeout } from 'timers';

export default {
    name: 'BorrowInfo',
    data() {
        return {
            borrowInfoList: [],
            totalCount: 0,
            isLoading: false,
        };
    },
    created() {
        // 图书信息
        this.getBorrowData();
    },
    methods: {
        // 点击还书
        handleReturn(index, row) {
            const id = row._id;
            const bookInfoId = row.bookInfo._id;
            const { bookId } = row;
            this.isLoading = true;
            returnBook({ id, bookInfoId, bookId }).then((res) => {
                console.log(res);
                this.getBorrowData();
                setTimeout(() => {
                    this.isLoading = false;
                }, 200);
            });
        },
        // 点击缴费
        handlePayment() {

        },
        // 切换页码
        changePage(pageNumber) {
            this.getBorrowData(pageNumber);
        },
        // 获取图书信息
        getBorrowData(page = 1) {
            const userId = this.$store.state.userInfo._id;
            getBorrowInfo({ id: userId, page }).then((res) => {
                console.log(res.data);
                this.borrowInfoList = res.data;
            });
        },
        // 格式化是否缴费
        stateFormat(row, column, cellValue) {
            if (row.amountFine === 0) {
                return '无需缴费';
            }
            return cellValue === false ? '未缴' : '已缴';
        },
        // 格式化日期
        dateFormat(row, column, cellValue) {
            if (cellValue === '-') {
                return '暂无';
            }
            return new Date(cellValue).toLocaleDateString();
        },
    },
    computed: {},
    watch: {},
    components: {
        Paging,
    },
};
</script>
<style lang='scss' scoped>
.current-borrow-layout{
    height:85vh;
    padding:15px;
    margin-top:20px;
    background:white;
    box-shadow: $box-shadow-base;
}
.paging-layout{
    padding-top:25px;
    @include displayCenter();
}
</style>
