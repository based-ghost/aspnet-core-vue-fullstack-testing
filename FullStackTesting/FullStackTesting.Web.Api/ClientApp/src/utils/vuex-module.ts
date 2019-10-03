import { IEmployee, IDropdownOption } from "@/types";

export const getEmployeesDefault = (): IEmployee[] => {
  return [];
};

export const getDepartmentObjDefault = (): IDropdownOption => {
  return {
    value: 1,
    label: "Claims"
  };
};

export const getActiveEmployeeDefault = (): IEmployee => {
  return {
    FirstName: "",
    LastName: "",
    Department: "Claims",
    FullTime: false
  };
};
