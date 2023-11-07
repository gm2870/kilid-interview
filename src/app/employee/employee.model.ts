export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  isActive: boolean;
  position: string;
  password: string;
  confirmPassword: string;
}

export interface FormProps {
  firstName: ValidationProps;

  lastName: ValidationProps;

  phone: ValidationProps;

  position: ValidationProps;

  password: ValidationProps;

  confirmPassword: ValidationProps;
}
export interface ErrorMessages {
  firstName: string;

  lastName: string;

  phone: string;

  position: string;

  password: string;

  confirmPassword: string;
}

export interface ValidationProps {
  [key: string]: string;
}
