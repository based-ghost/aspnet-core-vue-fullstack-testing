import { SnotifyPosition, SnotifyDefaults } from "vue-snotify";

export const snotifyDefaults: SnotifyDefaults = {
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