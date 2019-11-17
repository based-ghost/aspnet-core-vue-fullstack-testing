<template>
  <div class="container is-fluid">
    <div class="columns is-centered">
      <div class="column is-8">
        <h1 class="title">Employee Records</h1>
        <div class="box employee-box">
          <div class="field table-controls is-grouped">
            <div class="control is-expanded">
              <h5 class="subtitle is-expanded">
                Employees:
                <strong>{{employeeCount}}</strong>
              </h5>
            </div>
            <div class="control">
              <a
                role="button"
                class="button is-link is-outlined"
                @click="$modal.show(modalIDs.ADD_EMPLOYEE)"
              >
                <strong>&#43;</strong>Employee
              </a>
            </div>
          </div>
          <Spinner :show="loading" />
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
              <tr 
                v-for="employee in employees" 
                :key="employee.id" 
                :id="`row-${employee.id}`"
              >
                <td>{{employee.id}}</td>
                <td>{{employee.firstName}}</td>
                <td>{{employee.lastName}}</td>
                <td>{{employee.department}}</td>
                <td>{{employee.fullTime ? 'Yes' : 'No'}}</td>
                <td>
                  <a
                    role="button"
                    class="delete is-danger is-medium"
                    @click="deleteEmployee(employee)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <p class="buttons is-pagination-group">
            <a class="button is-link" @click="handleGetEmployees()">
              <strong>&lt;</strong>
              Previous
            </a>
            <a class="button is-link" @click="handleGetEmployees()">
              Next
              <strong>&gt;</strong>
            </a>
          </p>
        </div>
      </div>
      <AddEmployee @employeeAdded="handleSuccessfulAdd" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IEmployee } from "@/types";
import Spinner from "@/components/Spinner.vue";
import AddEmployee from "@/components/AddEmployee.vue";
import { modalIDs, ConfigData } from "@/config/constants";
import { isArrayWithLength, alertAxiosSuccess } from "@/utils";
import { EmployeeModule } from "@/store/modules/employee.module";

@Component({
  components: {
    Spinner,
    AddEmployee,
  },
})
export default class Employees extends Vue {
  public loading: boolean = false;
  public readonly modalIDs: ConfigData = modalIDs;

  get employees(): IEmployee[] {
    return EmployeeModule.employees;
  }

  get employeeCount(): number {
    return isArrayWithLength(EmployeeModule.employees)
      ? EmployeeModule.employees.length
      : 0;
  }

  public created(): void {
    if (!isArrayWithLength(this.employees)) {
      this.handleGetEmployees();
    }
  }

  public deleteEmployee(employee: IEmployee): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    EmployeeModule.DeleteEmployee(employee)
      .then(() => {
        EmployeeModule.GetAllEmployees()
          .then(() => {
            alertAxiosSuccess("Employee was deleted!", "Success", 400);
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false;
            }, 50);
          });
      })
      .catch(() => {
        this.loading = false;
      });
  }

  public handleGetEmployees(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    EmployeeModule.GetAllEmployees().then(() => {
      setTimeout(() => {
        this.loading = false;
      }, 50);
    });
  }

  // Method that gets executed as callback from @employeeAdded event fired from child component AddEmployee.vue
  // Event is fired when a new employee is successfully added - highlights the new row after the the employee rows have been rendered in DOM
  public handleSuccessfulAdd(newEmployeeId: number): void {
    this.$nextTick(() => {
      const newEmployeeRow = document.getElementById(`row-${newEmployeeId}`);
      if (newEmployeeRow) {
        newEmployeeRow.classList.add("highlight-new-row");
        setTimeout(() => {
          newEmployeeRow.classList.remove("highlight-new-row");
        }, 250);
      }
    });
  }
}
</script>