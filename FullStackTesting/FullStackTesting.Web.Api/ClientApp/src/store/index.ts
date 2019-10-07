import Vue from "vue";
import Vuex from "vuex";
import { IEmployeeState } from "./modules/employee.module";

Vue.use(Vuex);

export interface IRootState {
  employee: IEmployeeState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
