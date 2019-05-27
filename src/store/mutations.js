export default {
    changeBookInfoList(state, bookInfoList) {
        state.bookInfoList = bookInfoList;
    },
    changeBookTypeSelected(state, type) {
        state.selectedBookType = type;
    },
    changeBookInfoListTotalCount(state, number) {
        state.totalCount = number;
    },
    changeUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },
    changeLoginStatus(state, isLogin) {
        state.IS_LOGIN = isLogin;
    },
    changePermission(state, Permission) {
        state.hasPermission = Permission;
    },
};
