<template>
    <div class="my-info-layout">
        <el-form :model="form">
            <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="身份">
                <el-input v-model="form.role"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="form.nickName"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSave()">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// api
import { putUserInfo } from '@/api/users';

export default {
    name: 'MyInfo',
    props: {
        userInfo: Object,
    },
    data() {
        return {
            form: {
                email: '',
                nickName: '',
                role: '',
                gender: '男',
                _id: '',
            },
        };
    },
    created() {
        console.log(this.userInfo);
        this.form = {
            ...this.userInfo,
        };
    },
    mounted() { },
    methods: {
        // 保存
        handleSave() {
            const { _id, nickName, gender } = this.form;
            // api
            putUserInfo({ id: _id, nickName, gender }).then(() => {
                this.$message.success('保存成功');
            }).catch(() => {
                this.$message.error('保存失败');
            });
        },
    },
    computed: {},
    watch: {
        userInfo(newValue) {
            this.form = {
                ...newValue,
            };
        },
    },
    components: { },
};
</script>
<style lang='scss' scoped>
.my-info-layout{
    width:300px;
    padding:20px;
}
</style>
