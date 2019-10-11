import { IEmployee, IDropdownOption } from '@/types';

export const getEmployeesDefault = (): IEmployee[] => [];

export const getActiveEmployeeDefault = (): IEmployee => ({
  FirstName: '',
  LastName: '',
  FullTime: false,
  Department: 'Claims',
});

export const getDepartmentObjDefault = (): IDropdownOption => ({
  value: 1,
  label: 'Claims',
});
