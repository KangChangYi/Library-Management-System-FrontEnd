
<template>
    <el-input :placeholder="placeholder" :type="inputType"
    v-model="loginForm" @change="changeInputText">
        <div class="prefix-icon" slot="prefix">
            <svg-icon :icon-class="iconFile" class-name="icon"></svg-icon>
        </div>
    </el-input>
</template>

<script>
const iconFile = new Map()
    .set('密码', 'password')
    .set('确认密码', 'password')
    .set('邮箱', 'user');

const inputType = new Map()
    .set('密码', 'password')
    .set('确认密码', 'password')
    .set('邮箱', 'text');

export default {
    name: 'inputWithIcon',
    props: {
        placeholder: String,
    },
    data() {
        return {
            loginForm: '',
        };
    },
    created() {},
    methods: {
        changeInputText(val) {
            this.$emit('changeInputText', val);
        },
    },
    computed: {
        iconFile() {
            return iconFile.get(this.placeholder);
        },
        inputType() {
            return inputType.get(this.placeholder);
        },
    },
    watch: {},
    components: {},
};
</script>

<style lang='scss' scoped>
.prefix-icon {
    padding:11px 0 0 5px;
}
.icon{
    font-size:16px;
}
</style>
