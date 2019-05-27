/* eslint-disable import/no-cycle */
import Vue from 'vue';

import Vuex from 'vuex';

import getters from './getters';

// import userInfo from './modules/userInfo';

import mutations from './mutations';

import actions from './actions';

Vue.use(Vuex);

const state = {
    IS_LOGIN: false,
    hasPermission: false,
    // ROLE: '学生',
    userInfo: {},

    bookInfoList: [],
    selectedBookType: '全部类别',
    totalCount: 0,
};

export default new Vuex.Store({
    // modules: {
    //     userInfo,
    // },
    actions,
    state,
    mutations,
    getters,
});
