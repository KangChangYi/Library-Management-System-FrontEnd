<template>
    <div class="Reception-layout">
        <div class="navigate-bar">
            <div class="navigate-bar-content">
                <svg-icon icon-class="logo" class-name="icon"/>
                <nav class="bar-box">
                    <router-link class="bar" :to="{ path:'/Classification'}">首页</router-link>
                    <router-link class="bar" :to="{ path:'/Situation'}">图书借阅情况</router-link>
                </nav>
                <el-button type="primary" round @click="goLogin()">登录 / 注册</el-button>
            </div>
        </div>
        <!-- 子路由 -->
        <router-view/>
        <!-- 组件 -->
        <Footer></Footer>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth';
import Footer from '@/components/footer/index.vue';

export default {
    name: 'Reception',
    data() {
        return { };
    },
    created() { },
    methods: {
        // 有token则自动登陆
        goLogin() {
            if (getToken()) {
                this.$router.push({
                    path: '/Backstage',
                });
            } else {
                this.$router.push({
                    path: '/Login',
                });
            }
        },
    },
    computed: {
    },
    watch: {},
    components: {
        Footer,
    },
};
</script>

<style lang="scss" scoped>
.Reception-layout {
    height:100%;
    padding-top:70px;
    .navigate-bar {
        width: 100%;
        height: 70px;
        background: white;
        box-shadow: $box-shadow-base;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
    }
}
.navigate-bar-content{
    margin:auto;
    width:$layout-width;
    @include displayCenter($justify-content:space-between);
    .icon {
        height:0.7em !important;
        font-size:100px;
        margin-right:60px;
    }
}
.bar-box{
    // 导航栏按钮盒子
    width:745px;
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
