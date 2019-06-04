<template>
    <div class="modify-password-layout">
        <el-form :model="ruleForm">
            <el-form-item label="旧密码" >
                <el-input type="password" v-model="ruleForm.oldPass"></el-input>
            </el-form-item>
            <el-form-item label="新密码" >
                <el-input type="password" v-model="ruleForm.newPass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input type="password" v-model="ruleForm.checkPass"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit()">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// api
import { modifyPassword } from '@/api/users';

export default {
    name: 'ModifyPassword',
    props: {
        id: String,
    },
    data() {
        return {
            ruleForm: {
                oldPass: '',
                newPass: '',
                checkPass: '',
            },
        };
    },
    created() {
        // this.getMyInfo();
    },
    methods: {
        // 点击提交
        handleSubmit() {
            const result = this.validator();
            if (result) {
                modifyPassword({ id: this.id, ...result }).then(() => {
                    this.$message.success('修改成功');
                    this.ruleForm = {
                        oldPass: '',
                        newPass: '',
                        checkPass: '',
                    };
                }).catch((err) => {
                    this.$message.warning(err.data);
                });
            }
        },
        // 验证
        validator() {
            const { oldPass, newPass, checkPass } = this.ruleForm;
            if (!oldPass || !newPass || !checkPass) {
                this.$message.warning('请将表单填写完整');
                return false;
            }
            if (newPass !== checkPass) {
                this.$message.warning('两次密码不一致');
                return false;
            }
            return {
                oldPassword: oldPass,
                newPassword: newPass,
            };
        },
        // getMyInfo() {
        //     getMe().then((res) => {
        //         this._id = res.data._id;
        //     });
        // },
    },
    computed: {},
    watch: {

    },
    components: {

    },
};
</script>
<style lang='scss' scoped>
.modify-password-layout{
    width:300px;
    padding:20px;
}
</style>
