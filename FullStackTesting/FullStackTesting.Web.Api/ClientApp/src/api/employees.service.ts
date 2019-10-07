import { BaseService } from "@/api/base.service";
import { IEmployee } from "@/types";

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
    return (
      this.employeeService || (this.employeeService = new this(this.apiBaseUrl))
    );
  }

  public async getAllEmployeesAsync(): Promise<IEmployee[]> {
    const { data } = await this.$http.get<IEmployee[]>("GetAllEmployeesAsync");
    return data;
  }

  public async deleteEmployeeAsync(employee: IEmployee): Promise<any> {
    await this.$http.delete("DeleteEmployeeAsync", {
      params: { id: employee.Id }
    });
  }

  public async addEmployeeAsync(employee: IEmployee): Promise<any> {
    await this.$http.post("AddEmployeeAsync", employee, {
      params: { id: employee.Id }
    });
  }

  public async getEmployeeByIdAsync(id: number | null = null): Promise<IEmployee> {
    const { data } = await this.$http.get<IEmployee>("GetEmployeeByIdAsync", { params: { id: id } });
    return data;
  }
}

export const EmployeeApi = EmployeeService.Instance;
