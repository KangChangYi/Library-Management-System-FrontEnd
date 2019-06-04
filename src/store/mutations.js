export default {
    changeBookInfoList(state, bookInfoList) {
        console.log(bookInfoList);
        state.bookInfoList = bookInfoList;
    },
    changeUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },
    // 登录状态
    changeLoginStatus(state, isLogin) {
        state.IS_LOGIN = isLogin;
    },
    // 是否已有路由
    changePermission(state, Permission) {
        state.hasPermission = Permission;
    },
};
