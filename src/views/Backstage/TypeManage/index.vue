<template>
    <div>
        <div class="tool-box">
            <el-button type="primary" @click="handleAddType()">增加类别</el-button>
            <div style="width:250px">
                <el-input placeholder="搜索类别" prefix-icon="el-icon-search"
                 @change="searchType()" v-model="searchName">
                </el-input>
            </div>
        </div>
        <main class="type-manage-layout">
            <el-table :data="typeList">
                <el-table-column prop="_id" min-width="150" label="ID"
                    show-overflow-tooltip></el-table-column>
                <el-table-column prop="typeName"  min-width="150" label="类别名"
                    show-overflow-tooltip></el-table-column>
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
                <!-- 组件 -->
                <Paging @changePage="changePage" :totalCount="totalCount" :pageSize="8"></Paging>
            </div>
        </main>
    </div>
</template>

<script>
// 组件
import Paging from '@/components/paging/index.vue';
// api
import {
    getBookType, postBookType, putBookType, deleteBookType,
} from '@/api/bookType';

export default {
    name: 'TypeManage',
    data() {
        return {
            typeList: [],
            totalCount: 0,
            searchName: '',
            dialogFormVisible: false,
        };
    },
    created() {
        this.getType(1);
    },
    methods: {
        // 增加
        handleAddType() {
            this.$prompt('请输入类别名', '增加类别', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                // api
                postBookType({ typeName: value }).then((res) => {
                    this.typeList.unshift({ ...res.data });
                    this.$message.success('新增成功');
                }).catch(() => {
                    this.$message.error('失败');
                });
            }).catch(() => {
                this.$message.info('取消输入');
            });
        },
        // 修改
        handleModify(index, row) {
            this.$prompt('请输入类别名', '修改类别', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                // api
                putBookType({ id: row._id, typeName: value }).then(() => {
                    this.typeList[index].typeName = value;
                    this.$message.success('修改成功');
                }).catch(() => {
                    this.$message.error('失败');
                });
            }).catch(() => {
                this.$message.info('取消输入');
            });
        },
        // 删除
        handleDelete(index, row) {
            this.$confirm('确定删除该类别吗？').then(() => {
                // 删除类别
                deleteBookType({ id: row._id }).then(() => {
                    this.typeList.splice(index, 1);
                    this.$message.success('删除成功');
                }).catch(() => {
                    this.$message.error('删除失败');
                });
            });
        },
        // 搜索
        searchType() {
            this.getType();
        },
        // 切换页码 用户信息列表
        changePage(pageNumber) {
            this.getType(pageNumber);
        },
        getType(page = 1) {
            const result = {};
            if (this.searchName) {
                result.name = this.searchName;
            }
            getBookType({ page, ...result }).then((res) => {
                this.typeList = res.data;
            });
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
.type-manage-layout {
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
</style>
