export interface IDropdownOption {
  readonly value?: number;
  readonly label?: string;
}

export interface IEmployee {
  readonly Id?: number;
  readonly LastName?: string;
  readonly FirstName?: string;
  readonly FullTime?: boolean;
  readonly Department?: string;
}