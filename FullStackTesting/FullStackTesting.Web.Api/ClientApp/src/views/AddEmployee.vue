<template>
  <modal
    :name="modalIDs.ADD_EMPLOYEE"
    :width="525"
    :height="450"
    transition="pop-out"
    :draggable="false"
    :clickToClose="false"
  >
    <div id="modal_x" @click="handleCloseModal()">&times;</div>
    <div class="columns modal-columns is-centered">
      <div class="column has-text-centered">
        <div class="modal-title">
          {{titleMsg}}
        </div>
        <div class="modal-body has-text-left">
          <div class="field">
            <label class="label">Department</label>
            <div class="control">
              <v-dropdown
                :options="dropdownOptions"
                labelKey="label"
                :selectedOptionLabel="department.label"
                wrapperClass="full-width"
                @select="newSelectedOption => department = newSelectedOption"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">First Name</label>
            <div class="control">
              <input
                v-model.trim="firstName"
                name="FirstName"
                type="text"
                :class="['input', { 'is-danger' : invalidInputs && !firstName }]"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input
                v-model.trim="lastName"
                name="LastName"
                type="text"
                :class="['input', { 'is-danger' : invalidInputs && !lastName }]"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Full Time Employee</label>
            <v-checkbox
              controlClass="is-medium"
              :checked="fullTimeEmployee"
              @checked="isCheckedState => fullTimeEmployee = isCheckedState"
            />
          </div>
        </div>
        <div class="modal-dialog-buttons">
          <button 
            type="button" 
            class="button is-block" 
            @click="handleCloseModal()"
          >
            CANCEL
          </button>
          <button 
            type="button" 
            class="button is-block" 
            @click="handleAddEmployee()"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EmployeeModule } from "@/store/modules/employee.module";
import VCheckbox from "@/components/VCheckbox.render";
import VDropdown from "@/components/VDropdown.render";
import { alertAxiosSuccess } from "@/utils/helper";
import { IDropdownOption, IEmployee } from "@/types";
import { dropdownTestData, modalIDs, ConfigData } from "@/config/constants";

@Component({
  components: {
    VCheckbox,
    VDropdown,
  },
})
export default class AddEmployee extends Vue {
  public invalidInputs: boolean = false;
  public readonly modalIDs: ConfigData = modalIDs;
  public readonly dropdownOptions: IDropdownOption[] = dropdownTestData;

  @Prop({ default: "New Employee" }) public readonly titleMsg: string;

  get firstName(): string {
    return EmployeeModule.activeEmployee.firstName;
  }
  set firstName(value: string) {
    EmployeeModule.UPDATE_FIRST_NAME(value);
  }

  get lastName(): string {
    return EmployeeModule.activeEmployee.lastName;
  }
  set lastName(value: string) {
    EmployeeModule.UPDATE_LAST_NAME(value);
  }

  get department(): IDropdownOption {
    return EmployeeModule.departmentObj;
  }
  set department(value: IDropdownOption) {
    EmployeeModule.UPDATE_DEPARTMENT_NAME(value);
  }

  get fullTimeEmployee(): boolean {
    return EmployeeModule.activeEmployee.fullTime;
  }
  set fullTimeEmployee(value: boolean) {
    EmployeeModule.UPDATE_FULL_TIME_EMPLOYEE(value);
  }

  get employeeIds(): number[] {
    return EmployeeModule.employees.map((employee) => employee.id) || [];
  }

  public handleAddEmployee(): void {
    if (!this.firstName || !this.lastName) {
      this.invalidInputs = true;
      return;
    }

    this.invalidInputs = false;

    const newEmployeeId: number = this.getNewEmployeeId();
    const addEmployee: IEmployee = {
      id: newEmployeeId,
      ...EmployeeModule.activeEmployee,
    };

    EmployeeModule.AddEmployee(addEmployee).then(() => {
      this.handleCloseModal();
      EmployeeModule.GetAllEmployees().then(() => {
        setTimeout(() => this.$emit("employeeAdded", newEmployeeId), 250);
        alertAxiosSuccess("Employee was added!", "Success", 400);
      });
    });
  }

  public handleCloseModal(): void {
    EmployeeModule.ResetActiveEmployeeFields().then(() => {
      this.$modal.hide(this.modalIDs.ADD_EMPLOYEE);
    });
  }

  public getNewEmployeeId(): number {
    let newId;

    do {
      newId = Math.floor(Math.random() * 800) + 10;
    } while (this.employeeIds.includes(newId));

    return newId;
  }
}
</script>
