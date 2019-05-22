import Vue from 'vue';

import Vuex from 'vuex';

import getters from './getters';

import userInfo from './modules/userInfo';

import mutations from './mutations';

import actions from './actions';

Vue.use(Vuex);

const state = {
    selectedBookType: '全部类别',
    bookInfoList: [],
    totalCount: 0,
    userInfo: {},
};

export default new Vuex.Store({
    modules: {
        userInfo,
    },
    actions,
    state,
    mutations,
    getters,
});
