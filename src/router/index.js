/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import store from '@/store/index';
import { getToken } from '@/utils/auth';

Vue.use(Router);

const router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: '前台',
            component: () => import('@/views/Reception/index.vue'),
            redirect: '/Classification',
            children: [
                {
                    path: '/Classification',
                    name: '图书分类',
                    component: () => import('@/views/Reception/Classification/index.vue'),
                },
                {
                    path: '/Situation',
                    name: '图书借阅情况',
                    component: () => import('@/views/Reception/Situation/index.vue'),
                },
            ],
        },
        {
            path: '/Login',
            name: '登录',
            component: () => import('@/views/Login/index.vue'),
        },
        {
            path: '/Register',
            name: '注册',
            component: () => import('@/views/Register/index.vue'),
        },
    ],
});

/**
 * 顶部进度条样式
 */
NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 初始化时的最小百分比
});

/**
 * 路由前置检查
 */

const baseRouter = {
    图书分类: true,
    图书借阅情况: true,
    登录: true,
    注册: true,
};

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    // 动态路由
    if (!getToken()) {
        if (!baseRouter[to.name]) {
            next({ path: '/Login' });
        } else {
            next();
        }
    } else if (!store.state.hasPermission) {
        store.dispatch('FETCH_PERMISSION')
            .then(() => {
                next({ path: to.path });
            });
    } else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done(); // 在即将进入新的页面组件前，关闭掉进度条
});

export default router;
