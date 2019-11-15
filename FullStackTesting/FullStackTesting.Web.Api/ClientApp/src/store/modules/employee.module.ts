import store from "@/store";
import { IEmployee, IDropdownOption } from "@/types";
import { EmployeeApi } from "@/api/employees.service";
import { Module, VuexModule, Mutation, MutationAction, getModule, Action } from "vuex-module-decorators";

export interface IEmployeeState {
  employees: IEmployee[];
  activeEmployee: IEmployee;
  departmentObj: IDropdownOption;
}

export const employeesInitialState: IEmployee[] = [];

export const activeEmployeeInitialState = Object.freeze<IEmployee>({
  firstName: '',
  lastName: '',
  fullTime: false,
  department: 'Claims',
});

export const departmentInitialState = Object.freeze<IDropdownOption>({
  value: 1,
  label: 'Claims',
});

@Module({ dynamic: true, store, name: "employee" })
class Employee extends VuexModule implements IEmployeeState {
  public employees: IEmployee[] =  { ...employeesInitialState };
  public activeEmployee: IEmployee = { ...activeEmployeeInitialState };
  public departmentObj: IDropdownOption = { ...departmentInitialState };

  @Action
  public async DeleteEmployee(employee: IEmployee): Promise<any> {
    await EmployeeApi.deleteEmployeeAsync(employee);
  }

  @Action
  public async AddEmployee(employee: IEmployee): Promise<any> {
    await EmployeeApi.addEmployeeAsync(employee);
  }

  @MutationAction<Partial<IEmployeeState>>({ mutate: ["activeEmployee", "departmentObj"] })
  public async ResetActiveEmployeeFields(): Promise<Partial<IEmployeeState>> {
    return {
      activeEmployee: {
        ...activeEmployeeInitialState,
      },
      departmentObj: {
        ...departmentInitialState,
      },
    };
  }

  @MutationAction<Partial<IEmployeeState>>({ mutate: ["employees"] })
  public async GetAllEmployees(): Promise<Partial<IEmployeeState>> {
    try {
      const employees = await EmployeeApi.getAllEmployeesAsync();
      return { 
        employees 
      };
    } catch (e) {
      return {
        employees: {
          ...employeesInitialState,
        },
      };
    }
  }

  @MutationAction<Partial<IEmployeeState>>({ mutate: ["employees"] })
  public async GetEmployeeById(id: number | null = null): Promise<Partial<IEmployeeState>> {
    try {
      const employee = await EmployeeApi.getEmployeeByIdAsync(id);
      const employees = this.employees.splice(0, this.employees.length, employee || {});
      return { 
        employees 
      };
    } catch (e) {
      return { 
        employees: {
          ...employeesInitialState,
        },
      };
    }
  }

  @Mutation
  public UPDATE_ACTIVE_EMPLOYEE(value: IEmployee): void {
    this.activeEmployee = value;
  }

  @Mutation
  public UPDATE_FIRST_NAME(firstName: string): void {
    Object.assign(this.activeEmployee, { firstName });
  }

  @Mutation
  public UPDATE_LAST_NAME(lastName: string): void {
    Object.assign(this.activeEmployee, { lastName });
  }

  @Mutation
  public UPDATE_DEPARTMENT_NAME(value: IDropdownOption): void {
    Object.assign(this.departmentObj, value);
    Object.assign(this.activeEmployee, { department: value.label });
  }

  @Mutation
  public UPDATE_FULL_TIME_EMPLOYEE(fullTime: boolean): void {
    Object.assign(this.activeEmployee, { fullTime });
  }
}

export const EmployeeModule = getModule(Employee);
