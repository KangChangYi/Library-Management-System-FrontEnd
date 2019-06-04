<template>
    <div class="login-layout">
        <div class="bg"></div>
        <div class="form-layout">
            <!-- logo -->
            <div class="logo-box">
                <svg-icon icon-class="logo-big" class-name="icon"/>
            </div>
            <!-- 表单 -->
            <div class="form-cell">
                <inputWidthIcon placeholder="邮箱" @changeInputText="changeEmail"></inputWidthIcon>
            </div>
            <div class="form-cell">
                <inputWidthIcon placeholder="密码" @changeInputText="changePassword"></inputWidthIcon>
            </div>
            <div class="form-cell">
                <inputWidthIcon placeholder="确认密码" @changeInputText="changeConfirmPassword">
                </inputWidthIcon>
            </div>
            <div class="form-cell">
                <el-radio-group v-model="role">
                    <el-radio :label="2">学生</el-radio>
                    <el-radio :label="1">教师</el-radio>
                    <el-radio :label="0">管理员</el-radio>
                </el-radio-group>
            </div>
            <div class="form-cell">
                <el-button type="primary" @click="clickRegister()">注册</el-button>
            </div>
            <div class="cell">
                <span class="go-register" @click="clickGoLogin()">返回</span>
            </div>
        </div>
        <div class="foot">
            <img class="footer-icon" src="@/assets/icon-smail32.png" />
        </div>
    </div>
</template>

<script>
import inputWidthIcon from '@/components/inputWithIcon/index.vue';
import { register } from '@/api/users';
import { getRoleList } from '@/api/role';

export default {
    name: 'Register',
    data() {
        return {
            formInfo: {
                email: '',
                password: '',
                confirmPassword: '',
            },
            // 权限
            role: 1,
            roleId: [],
            // 是否自动登陆
            isAutoLogin: false,
        };
    },
    created() {
        // 获取 权限ID 列表
        getRoleList().then((res) => {
            this.roleId = res.data;
        });
    },
    methods: {
        // 注册
        async clickRegister() {
            const role = this.roleId[this.role]._id;
            const { email, password } = this.formInfo;
            // 验证完整性
            const result = this.validate();
            if (!result) { return; }
            // 注册api
            const userInfo = await register({ role, email, password })
                .then(res => res.data)
                .catch(() => false);
            // 提交到 vuex
            this.$store.commit('changeUserInfo', userInfo);
            //  判断
            if (!userInfo) {
                this.$message.error('邮箱已被注册');
            } else {
                this.$message.success('已注册，请等待审核');
                console.log(userInfo);
                // this.$router.push({
                //     name: 'Backstage',
                // });
            }
        },
        // 跳转到登录
        clickGoLogin() {
            this.$router.push({
                path: '/Login',
            });
        },
        // 邮箱输入框变化
        changeEmail(email) {
            this.formInfo.email = email;
        },
        // 密码输入框变化
        changePassword(password) {
            this.formInfo.password = password;
        },
        // 确认密码输入框变化
        changeConfirmPassword(password) {
            if (password !== this.formInfo.password) {
                this.$message.error('密码和确认密码不一致');
            }
            this.formInfo.confirmPassword = password;
        },
        // 验证表单完整性
        validate() {
            const { email, password, confirmPassword } = this.formInfo;
            // 判断
            if (email && password && confirmPassword) {
                return true;
            }
            this.$message.warning('请将表单填写完整');
            return false;
        },
    },
    computed: { },
    watch: { },
    components: {
        inputWidthIcon,
    },
};
</script>

<style lang="scss" scoped>
.login-layout {
    min-height:100vh;
    padding-top:150px;
    .bg {
        width:100vw;
        height:100vh;
        background:url("../../assets/login-bg2.jpg");
        background-size: cover;
        background-position: center;
        opacity:0.2;
        position: fixed;
        top:0;
        left:0;
    }
    .form-layout {
        width:420px;
        height:550px;
        background:white;
        border:1px #DFDFDF solid;
        border-radius: 5px;
        margin:0 auto;
        position: relative;
        z-index: 1;
        .logo-box {
            width:fit-content;
            margin:0 auto;
            .icon {
                font-size:200px;
            }
        }
    }
}

.form-cell {
    width:80%;
    margin:auto;
    button {
        width:100%;
    }
}
.form-cell + .form-cell {
    margin-top:20px;
}
.cell {
    width:80%;
    margin:auto;
    margin-top:15px;
    @include displayCenter($justify-content:space-between);
    span {
        color:$text-color-secondary;
    }
    .go-register {
        cursor: pointer;
        &:hover {
            color:$base-color;
        }
    }
}

.foot {
    width:fit-content;
    margin:0 auto;
    padding-top:150px;
    position: relative;
    z-index: 1;
    .footer-icon {
        width:32px;
        height:32px;
        border-radius: 50%;
    }
}

</style>
