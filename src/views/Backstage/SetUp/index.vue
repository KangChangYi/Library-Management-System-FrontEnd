<template>
  <div class="personal-center-layout">
    <el-radio-group v-model="component">
      <el-radio-button label="个人资料"></el-radio-button>
      <el-radio-button label="修改密码"></el-radio-button>
    </el-radio-group>
    <main>
        <!-- 组件 -->
       <MyInfo v-if="component==='个人资料'" :userInfo="userInfo"></MyInfo>
       <ModifyPassword v-else :id="userInfo._id"></ModifyPassword>
    </main>
  </div>
</template>

<script>
// 组件
import MyInfo from './components/MyInfo.vue';
import ModifyPassword from './components/ModifyPassword.vue';
// api
import { getMe } from '@/api/users';

export default {
    name: 'SetUp',
    data() {
        return {
            component: '个人资料',
            userInfo: {},
        };
    },
    created() {
        this.getMyInfo();
    },
    methods: {
        getMyInfo() {
            getMe().then((res) => {
                this.userInfo = {
                    ...res.data,
                    role: res.data.role.roleName,
                };
            });
        },
    },
    computed: {},
    watch: {},
    components: {
        MyInfo,
        ModifyPassword,
    },
};
</script>
<style lang='scss' scoped>
.personal-center-layout {
    height:85vh;
    padding:15px;
    margin-top:20px;
    background:white;
    box-shadow: $box-shadow-base;
}
</style>
