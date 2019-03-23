import '@/assets/style/main.scss';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vClickOutside from '@/plugins/vue-click-outside';
import VModal from 'vue-js-modal';
import './registerServiceWorker';

Vue.use(vClickOutside);
Vue.use(VModal);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
