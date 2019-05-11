<template>
    <div class="Reception-layout">
        <div class="navigate-bar">
            <div class="navigate-bar-content">
                <svg-icon icon-class="logo" class-name="icon"/>
                <nav class="bar-box">
                    <router-link class="bar" :to="{ name:'Classification'}">首页</router-link>
                    <router-link class="bar" :to="{ name:'Situation'}">图书借阅情况</router-link>
                </nav>
                <el-button type="primary" round @click="goLogin()">登录 / 注册</el-button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'login',
    data() {
        return { };
    },
    created() { },
    methods: {
        goLogin() {
            this.$router.push({
                name: 'Login',
            });
        },
    },
    computed: {
    },
    watch: {},
    components: {},
};
</script>

<style lang="scss" scoped>
.Reception-layout {
    height: 100vh;
    padding-top:70px;
    .navigate-bar {
        width: 100%;
        height: 70px;
        background: white;
        box-shadow: $box-shadow-base;
        position: fixed;
        top: 0;
        left: 0;
    }
}
.navigate-bar-content{
    margin:auto;
    width:1050px;
    @include displayCenter($justify-content:space-between);
    .icon {
        height:0.7em !important;
        font-size:100px;
        margin-right:60px;
    }
}
.bar-box{
    width:770px;
    @include displayCenter($justify-content:flex-start);
    .bar{
        font-size:$font-size-medium;
        padding:15px;
        border-radius: 10px;
        box-sizing: border-box;
        &:hover{
            color:$base-color;
            background:#f5f5f5;
        }
    }
    .bar + .bar {
        margin-left:60px;
    }
}


</style>
