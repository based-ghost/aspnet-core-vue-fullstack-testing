import { IEmployee, IDropdownOption } from '@/types';

export const getEmployeesDefault = (): IEmployee[] => [];

export const getActiveEmployeeDefault = (): IEmployee => ({
  firstName: '',
  lastName: '',
  fullTime: false,
  department: 'Claims',
});

export const getDepartmentObjDefault = (): IDropdownOption => ({
  value: 1,
  label: 'Claims',
});
