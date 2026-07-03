import { Routes } from '@angular/router';
import { EmployeeForm } from './form/form';
import { EmployeesList } from './employees-list/employees-list';

export const employeeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: EmployeesList
  },
  {
    path: 'create',
    component: EmployeeForm
  },
  {
    path: ':entityId',
    component: EmployeeForm
  }
];
