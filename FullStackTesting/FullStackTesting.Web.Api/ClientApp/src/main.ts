import Vue from 'vue';
import '@/assets/style/main.scss';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import VModal from 'vue-js-modal';
import Snotify from 'vue-snotify';
import vClickOutside from '@/plugins/vue-click-outside';
import { snotifyDefaults } from '@/config/vue-snotify.config';
import '@/registerServiceWorker';

Vue.use(VModal);
Vue.use(vClickOutside);
Vue.use(Snotify, snotifyDefaults);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
