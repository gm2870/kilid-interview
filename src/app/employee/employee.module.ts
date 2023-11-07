import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { EmployeeFormComponent } from './form/form.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeService } from './employee.service';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ConfirmationDirective } from '../confirmation.directive';

@NgModule({
  declarations: [
    EmployeeFormComponent,
    FormLayoutComponent,
    EmployeesListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    EmployeeRoutingModule,
    ToolbarComponent,
    ConfirmationDirective
  ],
  providers: [EmployeeService]
})
export class EmployeeModule {}
