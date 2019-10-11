import { IDropdownOption } from "@/types";
import { SnotifyPosition, SnotifyDefaults } from "vue-snotify";

// vue-snotify configuration object (typeof SnotifyDefaults) - optional overload to pass when installing package
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

// dropdown control options
export const dropdownTestData: IDropdownOption[] = [
  { value: 1, label: "Claims" },
  { value: 2, label: "Accounting" },
  { value: 3, label: "Human Resources" },
  { value: 4, label: "Information Technology" }
];

// object that holds all the different id's used to interact with modals from vue-js-modal package
export const modalIDs: { [key: string]: string } = {
  ADD_EMPLOYEE: "add-employee"
};

// object that holds link information
export const npmLinksConfig: { [key: string]: string } = {
  VUE_CLI: "https://cli.vuejs.org",
  X_UNIT: "https://xunit.github.io/",
  UNIT_JEST: "https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest",
  NIGHTWATCH: "https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch"
};
