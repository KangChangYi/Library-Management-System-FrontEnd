/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import { getMe } from '@/api/users';
import router from '@/router/index';

export default {
    // 动态增加路由
    async FETCH_PERMISSION({ commit }) {
        const role = await getMe().then(res => res.data.role.roleName);
        console.log(`这个账号是${role}`);
        dynamicRoute(role);
        commit('changePermission', true);
    },
};

// 管理员路由权限
const manegeRoutes = [{
    path: '/Backstage',
    name: '后台',
    component: () => import('@/views/Backstage/index.vue'),
    redirect: 'RegisterAuth',
    children: [{
        path: '/RegisterAuth',
        name: '注册审核',
        component: () => import('@/views/Backstage/RegisterAuth/index.vue'),
    },
    {
        path: '/BookManage',
        name: '图书管理',
        component: () => import('@/views/Backstage/BookManage/index.vue'),
    },
    {
        path: '/BookManage/BookInfoAddModify',
        name: '图书信息操作',
        component: () => import('@/views/Backstage/BookManage/BookInfoAddModify/index.vue'),
    },
    {
        path: '/TypeManage',
        name: '类别管理',
        component: () => import('@/views/Backstage/TypeManage/index.vue'),
    },
    {
        path: '/SetUp',
        name: '设置',
        component: () => import('@/views/Backstage/SetUp/index.vue'),
    }],
}];

// 教师路由权限
const teacherRoutes = [{
    path: '/Backstage',
    name: '后台',
    component: () => import('@/views/Backstage/index.vue'),
    redirect: 'BorrowInfo',
    children: [{
        path: '/BorrowInfo',
        name: '当前借阅',
        component: () => import('@/views/Backstage/BorrowInfo/index.vue'),
    },
    {
        path: '/BookManage',
        name: '图书管理',
        component: () => import('@/views/Backstage/BookManage/index.vue'),
    }],
}];

// 学生路由权限
const studentRoutes = [{
    path: '/Backstage',
    name: '后台',
    component: () => import('@/views/Backstage/index.vue'),
    redirect: 'BorrowInfo',
    children: [{
        path: '/BorrowInfo',
        name: '当前借阅',
        component: () => import('@/views/Backstage/BorrowInfo/index.vue'),
    },
    {
        path: '/BookManage',
        name: '图书管理',
        component: () => import('@/views/Backstage/BookManage/index.vue'),
    }],
}];

const routerMap = new Map()
    .set('管理员', manegeRoutes)
    .set('教师', teacherRoutes)
    .set('学生', studentRoutes);

function dynamicRoute(role) {
    const ROUTERS = routerMap.get(role);
    router.options.routes = router.options.routes.concat(ROUTERS);
    router.addRoutes(ROUTERS);
}
