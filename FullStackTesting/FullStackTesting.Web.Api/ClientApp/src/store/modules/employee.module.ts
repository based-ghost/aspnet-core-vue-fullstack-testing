import store from "@/store";
import { IEmployee, IDropdownOption } from "@/types";
import { EmployeeApi } from "@/api/employees.service";
import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  getModule,
  Action
} from "vuex-module-decorators";
import {
  getEmployeesDefault,
  getDepartmentObjDefault,
  getActiveEmployeeDefault
} from "@/utils/vuex-module";

export interface IEmployeeState {
  employees: IEmployee[];
  activeEmployee: {
    Id?: number;
    FirstName?: string;
    LastName?: string;
    Department?: string;
    FullTime?: boolean;
  };
  departmentObj: IDropdownOption;
}

@Module({ dynamic: true, store, name: "employee" })
class Employee extends VuexModule implements IEmployeeState {
  public employees: IEmployee[] = getEmployeesDefault();
  public activeEmployee: IEmployee = getActiveEmployeeDefault();
  public departmentObj: IDropdownOption = getDepartmentObjDefault();

  @Action
  public async DeleteEmployee(employee: IEmployee): Promise<any> {
    await EmployeeApi.deleteEmployeeAsync(employee);
  }

  @Action
  public async AddEmployee(employee: IEmployee): Promise<any> {
    await EmployeeApi.addEmployeeAsync(employee);
  }

  @MutationAction({ mutate: ["activeEmployee", "departmentObj"] })
  public async ResetActiveEmployeeFields(): Promise<any> {
    return {
      activeEmployee: getActiveEmployeeDefault(),
      departmentObj: getDepartmentObjDefault()
    };
  }

  @MutationAction({ mutate: ["employees"] })
  public async GetAllEmployees(): Promise<any> {
    try {
      const employees = await EmployeeApi.getAllEmployeesAsync();
      return {
        employees: employees
      };
    } catch (e) {
      return {
        employees: getEmployeesDefault()
      };
    }
  }

  @MutationAction({ mutate: ["employees"] })
  public async GetEmployeeById(id: number | null = null): Promise<any> {
    try {
      const employee = await EmployeeApi.getEmployeeByIdAsync(id);
      return {
        employees: this.employees.splice(
          0,
          this.employees.length,
          employee || {}
        )
      };
    } catch (e) {
      return {
        employees: getEmployeesDefault()
      };
    }
  }

  @Mutation
  public UPDATE_ACTIVE_EMPLOYEE(value: IEmployee): void {
    this.activeEmployee = value;
  }

  @Mutation
  public UPDATE_FIRST_NAME(value: string): void {
    Object.assign(this.activeEmployee, { FirstName: value });
  }

  @Mutation
  public UPDATE_LAST_NAME(value: string): void {
    Object.assign(this.activeEmployee, { LastName: value });
  }

  @Mutation
  public UPDATE_DEPARTMENT_NAME(value: IDropdownOption): void {
    Object.assign(this.departmentObj, value);
    Object.assign(this.activeEmployee, { Department: value.label });
  }

  @Mutation
  public UPDATE_FULL_TIME_EMPLOYEE(value: boolean): void {
    Object.assign(this.activeEmployee, { FullTime: value });
  }
}

export const EmployeeModule = getModule(Employee);
