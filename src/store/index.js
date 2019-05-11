import Vue from 'vue';

import Vuex from 'vuex';

import getters from './getters';

import userInfo from './modules/userInfo';

import mutations from './mutations';

Vue.use(Vuex);

const state = {
    count: 1,
};

export default new Vuex.Store({
    modules: {
        userInfo,
    },
    mutations,
    state,
    getters,
});
