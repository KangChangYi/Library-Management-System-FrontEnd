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
                <el-button type="primary" @click="clickLogin()">登录</el-button>
            </div>
            <div class="cell">
                <el-checkbox v-model="isAutoLogin">下次自动登录</el-checkbox>
                <span class="go-register" @click="clickGoRegister()">去注册</span>
            </div>
        </div>
        <div class="foot">
            <img class="footer-icon" src="@/assets/icon-smail32.png" />
        </div>
    </div>
</template>

<script>
import inputWidthIcon from '@/components/inputWithIcon/index.vue';
import { login } from '@/api/login';
import { setToken } from '@/utils/auth';

export default {
    name: 'Login',
    data() {
        return {
            formInfo: {
                email: '',
                password: '',
            },
            // 自动登陆
            isAutoLogin: false,
        };
    },
    created() { },
    methods: {
        async clickLogin() {
            const { email, password } = this.formInfo;
            // 验证完整性
            const result = this.validate();
            if (!result) { return false; }
            // 登录 api
            const token = await login({ email, password })
                .then(res => res.data)
                .catch(err => err);
            // 判断
            console.log(token);
            if (token.status === 400) {
                this.$message.warning('请输入正确的用户名或密码');
            } else {
                setToken(token);
                this.$router.push({
                    path: '/Backstage',
                });
            }
            return false;
            // this.isAutoLogin
        },
        clickGoRegister() {
            this.$router.push({
                path: '/Register',
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
        // 验证表单完整性
        validate() {
            const { email, password } = this.formInfo;
            if (email && password) { return true; }
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
        height:460px;
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
