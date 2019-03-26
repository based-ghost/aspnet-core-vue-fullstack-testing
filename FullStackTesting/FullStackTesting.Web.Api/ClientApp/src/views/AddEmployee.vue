<template>
  <modal
    :name="modalId"
    :width="525"
    :height="450"
    transition="pop-out"
    :draggable="false"
    :clickToClose="false"
  >
    <div id="modal_x" @click="handleModalEvent()">&times;</div>
    <div class="columns modal-columns is-centered">
      <div class="column has-text-centered">
        <div class="modal-title">{{titleMsg}}</div>
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
              >
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
              >
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
          <button type="button" class="button is-block" @click="handleModalEvent()">CANCEL</button>
          <button type="button" class="button is-block" @click="handleAddEmployee()">OK</button>
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
import { dropdownTestData } from '@/utils/constants';
import { alertAxiosSuccess } from '@/utils/helper';
import { IDropdownOption } from '@/types';

@Component({
  components: {
    VCheckbox,
    VDropdown
  }
})
export default class AddEmployee extends Vue {
  private invalidInputs: boolean = false;
  private readonly modalId = "add-employee";
  private readonly dropdownOptions: IDropdownOption[] = dropdownTestData;

  @Prop({ default: "New Employee" }) private titleMsg: string;

  get firstName(): string {
    return EmployeeModule.activeEmployee.FirstName;
  }
  set firstName(value: string) {
    EmployeeModule.UPDATE_FIRST_NAME(value);
  }

  get lastName(): string {
    return EmployeeModule.activeEmployee.LastName;
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
    return EmployeeModule.activeEmployee.FullTime;
  }
  set fullTimeEmployee(value: boolean) {
    EmployeeModule.UPDATE_FULL_TIME_EMPLOYEE(value);
  }

  private handleAddEmployee(): void {
    if (!this.firstName || !this.lastName) {
      this.invalidInputs = true;
      return;
    }

    this.invalidInputs = false;
    const addEmployee = EmployeeModule.activeEmployee;
    addEmployee["Id"] = this.getNewEmployeeId();

    EmployeeModule.AddEmployee(addEmployee).then(() => {
      this.handleModalEvent();
      EmployeeModule.GetAllEmployees().then(() => {
          alertAxiosSuccess('Employee was added!', 'Success', 400);
      });
    });
  }

  private handleModalEvent(): void {
    EmployeeModule.ResetActiveEmployeeFields().then(() => {
      this.$modal.hide(this.modalId);
    });
  }

  private getNewEmployeeId(): number {
    let newId;
    const employeeIds = EmployeeModule.employees.map((employee) => employee.Id) || [];

    do {
      newId = Math.floor(Math.random() * 800) + 10;
    } while (employeeIds.includes(newId));

    return newId;
  }
}
</script>
