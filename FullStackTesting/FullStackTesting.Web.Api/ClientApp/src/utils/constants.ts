import { IDropdownOption } from "@/types";
import { SnotifyPosition } from "vue-snotify";

export const modalIDs = {
  ADD_EMPLOYEE: "add-employee"
};

export const snotifyOptions = {
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

export const dropdownTestData: IDropdownOption[] = [
  { value: 1, label: "Claims" },
  { value: 2, label: "Accounting" },
  { value: 3, label: "Human Resources" },
  { value: 4, label: "Information Technology" }
];

export const npmLinksConfig = {
  VUE_CLI: "https://cli.vuejs.org",
  X_UNIT: "https://xunit.github.io/",
  UNIT_JEST: "https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest",
  NIGHTWATCH: "https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch"
};
