import Vue from 'vue';
import Vuex from 'vuex';
import { IEmployeeState } from './modules/employee.module';

Vue.use(Vuex);

export interface IRootState {
    employee: IEmployeeState
}

export default new Vuex.Store<IRootState>({});