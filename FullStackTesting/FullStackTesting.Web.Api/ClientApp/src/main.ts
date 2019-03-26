import '@/assets/style/main.scss';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import VModal from 'vue-js-modal';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import vClickOutside from '@/plugins/vue-click-outside';
import './registerServiceWorker';

const snotifyOptions = {
  global: {
    newOnTop: true,
    maxAtPosition: 4,
    maxOnScreen: 4,
    oneAtTime: false,
    preventDuplicates: false
  },
  toast: {
    position: SnotifyPosition.rightTop,
    timeout: 2000,
    showProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true
  }
};

Vue.use(VModal);
Vue.use(vClickOutside);
Vue.use(Snotify, snotifyOptions);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
