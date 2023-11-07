import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './form/form.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';

const employeeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: EmployeesListComponent
  },
  {
    path: 'create',
    component: EmployeeFormComponent
  },
  {
    path: ':entityId',
    component: EmployeeFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(employeeRoutes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
