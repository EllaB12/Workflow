import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './filters/filter.js';
import './style/main.scss';
import VCalendar from 'v-calendar';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTasks, faPlus, faTimes, faSearch, faUsers, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTasks, faPlus, faTimes, faSearch, faUsers, faCheck)
library.add(faTrello)

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VCalendar);
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')