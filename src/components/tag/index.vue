<template>
    <el-tag size="mini" disable-transitions >
        {{name}}
    </el-tag>
</template>

<script>
export default {
    name: 'tag',
    props: {
        name: String,
    },
    data() {
        return { };
    },
    created() { },
    methods: {},
    computed: {},
    watch: {},
    components: {},
};
</script>
<style lang='scss' scoped>
</style>
