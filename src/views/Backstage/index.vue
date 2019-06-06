<template>
    <div class="app">
        <!-- 侧边导航栏组件 -->
        <naviMenu :isCollapse="isCollapse"></naviMenu>
        <!-- 内容 -->
        <div class="layout">
            <!-- header -->
            <div class="header-layout">
                <div class="header-left-indent-box"
                :class="[isCollapse ? header_css_width_large : '']" @click="clickLeftIndent()" >
                    <img v-if="!isCollapse" src="@/assets/icon-left-indent.png" >
                    <img v-else src="@/assets/icon-right-indent.png" >
                </div>
                <div class="header-right-box">
                    <!-- 头像下拉菜单 -->
                    <el-dropdown @command="clickDropDown" trigger="click">
                        <div class="user-avatar-box">
                            <img src="@/assets/icon-avatar.png">
                            <i class="el-icon-caret-bottom"></i>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="设置">设置</el-dropdown-item>
                            <el-dropdown-item command="登出" divided>
                                <span style="color:#F56C6C">退出登录</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <!-- content -->
            <div class="content-layout">
                <div id="page-title">{{pageTitle}}</div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
// 组件
import naviMenu from './components/naviMenu/index.vue';

import { removeToken } from '@/utils/auth';

export default {
    name: 'Backstage',
    data() {
        return {
            // header动态样式
            header_css_width_large: 'header-width-large',
            // 导航栏是否收缩
            isCollapse: false,
            pageTitle: '当前借阅',
        };
    },
    created() {
        this.pageTitle = this.$route.name;
    },
    methods: {
        // 展开收缩侧边导航栏
        clickLeftIndent() {
            this.isCollapse = !this.isCollapse;
        },
        // 点击头像下拉菜单
        clickDropDown(command) {
            if (command === '登出') {
                this.$confirm('即将退出登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    // 登出 并清除token和动态路由信息
                    removeToken();
                    this.$store.commit('changePermission', false);
                    this.$router.push({ path: '/Login' });
                }).catch(() => {
                    this.$message('取消登出!');
                });
            } else if (command === '设置') {
                this.$router.push({
                    path: '/SetUp',
                });
            }
        },
    },
    computed: {},
    watch: {
        $route(newVal) {
            this.pageTitle = newVal.name;
        },
    },
    components: { naviMenu },
};
</script>

<style lang='scss' scoped>
.app {
    display: flex;
    .layout {
        width: 100%;
        height: 100vh;
        overflow-y: scroll;
        .header-layout {
            width: calc(100% - 17px);
            min-width: 1200px;
            height: 55px;
            background: white;
            position: fixed;
            z-index: 20;
            left: 0;
            box-shadow: $shadow-border;
            @include displayCenter($justify-content:space-between);
            .header-left-indent-box {
                width: 55px;
                height: 55px;
                // margin-left跟随收缩导航栏变化 导航栏宽度为：200/64
                margin-left: 200px;
                cursor: pointer;
                transition: margin-left 0.3s ease-in-out;
                @include displayCenter();
                &:hover {
                    background: #f1f1f1;
                }
            }
            .header-right-box {
                width: fit-content;
                height: 55px;
                padding-right: 20px;
                @include displayCenter($justify-content:space-around);
                .user-avatar-box {
                    cursor: pointer;
                    transition: all 0.2s;
                    width: 60px;
                    height: 55px;
                    @include displayCenter($justify-content:space-between);
                    &:hover {
                        background: #f5f5f5;
                    }
                    img {
                        margin-left: 5px;
                    }
                }
            }
        }
        .content-layout {
            margin-top: 55px;
            padding: 20px;
            #page-title {
                font-size: $font-size-extra-large;
                font-weight: bold;
                color: #464c5b;
            }
        }
    }
}
.header-width-large {
    margin-left: 64px !important;
}
</style>
