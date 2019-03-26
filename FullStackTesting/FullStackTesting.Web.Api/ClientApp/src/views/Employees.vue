<template>
  <div class="container is-fluid">
    <div class="columns is-centered">
      <div class="column is-8">
        <h1 class="title">Employee Records</h1>
        <div class="box employee-box">
          <div class="field table-controls is-grouped">
            <div class="control is-expanded">
              <h5 class="subtitle is-expanded">Employees:
                <strong>{{employeeCount}}</strong>
              </h5>
            </div>
            <div class="control">
              <a role="button" class="is-success" @click="$modal.show('add-employee')">
                <strong>&#43;</strong>Employee
              </a>
            </div>
          </div>
          <Spinner :show="loading"/>
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Department</th>
                <th>Full Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employeeList" :key="employee.Id">
                <td>{{employee.Id}}</td>
                <td>{{employee.FirstName}}</td>
                <td>{{employee.LastName}}</td>
                <td>{{employee.Department}}</td>
                <td>{{employee.FullTime ? 'Yes' : 'No'}}</td>
                <td>
                  <a
                    role="button"
                    class="delete is-danger is-medium"
                    @click="deleteEmployee(employee)"
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="buttons is-pagination-group">
            <a class="button is-info" @click="handleGetEmployees()">Previous</a>
            <a class="button is-info" @click="handleGetEmployees()">Next</a>
          </p>
        </div>
      </div>
      <AddEmployee/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Spinner from "@/components/Spinner.vue";
import AddEmployee from "@/views/AddEmployee.vue";
import { EmployeeModule } from "@/store/modules/employee.module";
import { isArrayWithItems, alertAxiosSuccess } from '@/utils/helper';
import { IEmployee } from '@/types';

@Component({
  components: {
    Spinner,
    AddEmployee
  }
})
export default class Employees extends Vue {
  private loading: boolean = false;

  get employeeCount(): number {
    return isArrayWithItems(EmployeeModule.employees) ? EmployeeModule.employees.length : 0;
  }

  get employeeList(): IEmployee[] {
    return EmployeeModule.employees;
  }

  private created(): void {
    if (!isArrayWithItems(this.employeeList)) {
      this.handleGetEmployees();
    }
  }

  private deleteEmployee(employee: IEmployee): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    EmployeeModule.DeleteEmployee(employee)
      .then(() => {
        setTimeout(() => {
          this.loading = false;
        }, 50);

        EmployeeModule.GetAllEmployees().then(() => {
          alertAxiosSuccess('Employee was deleted!', 'Success', 400);
        });
      })
      .catch(() => {
        this.loading = false;
      });
  }

  private handleGetEmployees(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    EmployeeModule.GetAllEmployees().finally(() => {
      setTimeout(() => {
        this.loading = false;
      }, 50);
    });
  }
}
</script>