export interface IDropdownOption {
  readonly value?: number;
  readonly label?: string;
}

export interface IEmployee {
  readonly id?: number;
  readonly lastName?: string;
  readonly firstName?: string;
  readonly fullTime?: boolean;
  readonly department?: string;
}