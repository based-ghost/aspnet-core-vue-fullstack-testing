import Vue from 'vue';
import App from '@/App.vue';
import '@/registerServiceWorker';
import '@/assets/style/main.scss';
import store from '@/store';
import router from '@/router';
import VModal from 'vue-js-modal';
import Snotify from 'vue-snotify';
import { vClickOutside }  from '@/plugins';
import { snotifyDefaults } from '@/config';

Vue.config.productionTip = false;

Vue.use(VModal);
Vue.use(vClickOutside);
Vue.use(Snotify, snotifyDefaults);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
