import Vue from 'vue';

import Element from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/styles/theme/element-variables.scss';


import './icons';

import './styles/index.scss';

import Mixin from './mixins';

Vue.mixin(Mixin);
Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
