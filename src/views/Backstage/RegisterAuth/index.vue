<template>
  <div class="register-auth-layout">
         <el-table :data="userList">
            <el-table-column prop="email" min-width="110" label="邮箱" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="nickName" label="昵称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="gener" label="性别">
            </el-table-column>
            <el-table-column prop="role.roleName" label="权限" >
            </el-table-column>
            <el-table-column prop="auditPass" label="已审核通过" :formatter="formatAuth">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" :disabled="scope.row.auditPass"
                    @click="handlePass(scope.$index, scope.row)">
                        通过
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="paging-layout">
            <!-- 组件 -->
            <Paging @changePage="changePage" :totalCount="totalCount" :pageSize="10"></Paging>
        </div>
  </div>
</template>

<script>
import Paging from '@/components/paging/index.vue';
// api
import { getUserList, passAuth } from '@/api/users';

export default {
    name: 'RegisterAuth',
    data() {
        return {
            userList: [],
            totalCount: 0,
        };
    },
    created() {
        getUserList(1).then((res) => {
            console.log(res.data);
            this.totalCount = res.data.totalCount;
            this.userList = res.data.userList;
        });
    },
    methods: {
        handlePass(index, row) {
            this.$confirm('确认通过审核吗？')
                .then(() => {
                    passAuth(row._id).then((res) => {
                        if (res.status === 200) {
                            row.auditPass = true;
                        }
                    });
                });
        },
        // 切换页码 用户信息列表
        changePage(pageNumber) {
            getUserList(pageNumber).then((res) => {
                this.userList = res.data.userList;
            });
        },
        formatAuth(row, column, cellValue) {
            const gender = cellValue ? '是' : '否';
            return gender;
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
.register-auth-layout{
    height:85vh;
    margin-top:20px;
    padding:15px;
    background:white;
    box-shadow: $box-shadow-base;
}
.paging-layout{
    padding-top:25px;
    @include displayCenter();
}
</style>
