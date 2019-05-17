<template>
    <header class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: name }">
                {{name==="Classification" ? "图书分类" : "图书借阅情况"}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </header>
</template>

<script>

export default {
    name: 'bread',
    props: {
        name: String,
    },
    data() {
        return {};
    },
    created() {},
    methods: {},
    computed: {},
    watch: {},
    components: {
    },
};
</script>
<style lang='scss' scoped>
    .bread{
        padding:25px 10px;
    }
</style>
