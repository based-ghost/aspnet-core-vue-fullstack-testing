import { IEmployee } from "@/types";
import { AxiosRequestConfig } from "axios";
import { BaseService } from "@/api/base.service";

/**
 * API abstraction layer communication via Axios (typescript singleton pattern)
 */
class EmployeeService extends BaseService {
  private static employeeService: EmployeeService;
  private static apiBaseUrl = "http://localhost:55276/api/Employee/";

  private constructor(apiBaseUrl: string) {
    super(apiBaseUrl);
  }

  public static get Instance(): EmployeeService {
    return (this.employeeService || (this.employeeService = new this(this.apiBaseUrl)));
  }

  public async getAllEmployeesAsync(): Promise<IEmployee[]> {
    const { data } = await this.$http.get<IEmployee[]>("GetAllEmployeesAsync");
    return data;
  }

  public async addEmployeeAsync(employee: IEmployee): Promise<any> {
    const config: AxiosRequestConfig = {
      params: { id: employee.Id }
    };
    await this.$http.post("AddEmployeeAsync", employee, config);
  }

  public async deleteEmployeeAsync(employee: IEmployee): Promise<any> {
    const config: AxiosRequestConfig = {
      params: { id: employee.Id }
    };
    await this.$http.delete("DeleteEmployeeAsync", config);
  }

  public async getEmployeeByIdAsync(id: number | null = null): Promise<IEmployee> {
    const config: AxiosRequestConfig = {
      params: { id: id }
    };
    const { data } = await this.$http.get<IEmployee>("GetEmployeeByIdAsync", config);
    return data;
  }
}

export const EmployeeApi = EmployeeService.Instance;
