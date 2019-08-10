<template>
  <div>
        <div class="tool-box">
            <div style="width:250px">
                <el-input placeholder="搜索用户邮箱" prefix-icon="el-icon-search"
                 @change="searchUser()" v-model="searchEmail">
                </el-input>
            </div>
        </div>
        <div class="register-auth-layout">
            <el-table :data="userList">
                <el-table-column prop="email" min-width="110" label="邮箱" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="role.roleName" label="权限" >
                </el-table-column>
                <el-table-column prop="gender" label="性别">
                </el-table-column>
                <el-table-column prop="nickName" label="昵称" show-overflow-tooltip>
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
  </div>
</template>

<script>
// 组件
import Paging from '@/components/paging/index.vue';
// api
import { getUserList, passAuth } from '@/api/users';

export default {
    name: 'RegisterAuth',
    data() {
        return {
            userList: [],
            totalCount: 0,
            searchEmail: '',
        };
    },
    created() {
        this.getUserListData();
    },
    methods: {
        handlePass(index, row) {
            this.$confirm('确认通过审核吗？').then(() => {
                // 通过验证 api
                passAuth({ id: row._id }).then((res) => {
                    if (res.status === 200) {
                        row.auditPass = true;
                    }
                });
            });
        },
        searchUser() {
            this.getUserListData();
        },
        // 切换页码 用户信息列表
        changePage(pageNumber) {
            this.getUserListData(pageNumber);
        },
        // 获取用户列表
        getUserListData(page = 1) {
            const result = {};
            if (this.searchEmail) {
                result.name = this.searchEmail;
            }
            getUserList({ page, ...result }).then((res) => {
                this.totalCount = res.data.totalCount;
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
