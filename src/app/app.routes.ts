import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'employee/create', pathMatch: 'full' },

  {
    path: 'employees',
    loadComponent: () =>
      import('./employee/employees-list/employees-list').then(
        (m) => m.EmployeesList
      )
  },
  {
    path: 'employee/create',
    loadComponent: () =>
      import('./employee/form/form').then((m) => m.EmployeeForm)
  }
];
