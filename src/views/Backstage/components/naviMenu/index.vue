<template>
    <div>
        <el-menu class="el-menu-vertical-demo" background-color="#3c3c3b"
            text-color="#bfcbd9" :collapse="isCollapse" router default-active="当前借阅">

            <el-menu-item v-for="item in route" :key="item.name" :item="item.name"
            :route="item.path" :index="item.name">
                <i :class="item.icon"></i>
                <span slot="title">
                    {{item.name}}
                </span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
const iconMap = new Map()
    .set('注册审核', 'el-icon-s-claim')
    .set('图书管理', 'el-icon-s-management')
    .set('类别管理', 'el-icon-paperclip')
    .set('当前借阅', 'el-icon-reading');

export default {
    name: 'naviMenu',
    data() {
        return {
            route: [],
        };
    },
    props: {
        isCollapse: Boolean,
    },
    created() {
        // 获取当前用户可访问权限列表  生成菜单
        const routerList = JSON.parse(JSON.stringify(this.$router.options.routes));
        let temp = [];
        // 从路由列表中找到 后台路由
        routerList.forEach((val) => {
            if (val.name === '后台') {
                console.log(val);
                temp = val.children;
            }
        });
        // 加入 icon
        temp.forEach((val, idx) => {
            temp[idx].icon = iconMap.get(val.name);
        });
        // 过滤 不需要显示路由
        this.route = temp.filter(val => typeof val.icon !== 'undefined');
    },
    methods: {},
    computed: {},
    watch: {},
    components: {},
};
</script>

<style lang='scss' scoped>
.el-menu-vertical-demo {
    min-height: 100vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    border: none;
    position: relative;
    z-index: 21;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
.menu-icon {
    width: 18px;
    height: 18px;
    // padding-right: 5px;
}

// menu hover
.el-submenu {
    .el-menu-item {
        background-color: $navigate-dark-color !important;
        &:hover {
            color: white !important;
            background-color: $navigate-hover-color !important;
        }
    }
}
</style>
