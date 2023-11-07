import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { POSITIONS } from 'src/app/constants/positions.const';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { ValidationService } from 'src/app/validation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormProps, ErrorMessages } from '../employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  id = '';
  form: FormGroup = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^0(9)\d{9}$/)]],
      birthDate: [''],
      isActive: [false, Validators.required],
      position: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: [
        this.validationService.matchConfirmItems('password', 'confirmPassword')
      ]
    }
  );
  formErrors = {} as ErrorMessages;
  validationMessages: FormProps = {
    firstName: {
      required: 'First name is required.'
    },
    lastName: {
      required: 'Last name is required.'
    },
    phone: {
      required: 'Phone number is required.',
      pattern: 'Phone number should start with 09.'
    },
    position: {
      required: 'Position is required.'
    },
    password: {
      required: 'Password is required.'
    },
    confirmPassword: {
      required: 'Confirm Password is required.',
      mismatch: 'Password and Confirm Password do not match.'
    }
  };

  positions = POSITIONS;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private validationService: ValidationService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['entityId'];
    if (this.id) {
      this.employeeService.getEmployee(this.id).subscribe({
        next: (emp) => {
          this.form.patchValue(emp);
        }
      });
    }
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.logValidationErrors();
      });
  }
  submit(): void {
    if (this.form.invalid) {
      return;
    }
    if (this.id) {
      this.employeeService.update(this.id, this.form.value).subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Employee successfully updated!'
          );
          this.router.navigate(['/employee/list']);
        }
      });
    } else {
      this.employeeService.create(this.form.value).subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Employee successfully created!'
          );
          this.router.navigate(['/employee/list']);
        }
      });
    }
  }
  logValidationErrors() {
    this.formErrors = this.validationService.getValidationErrors(
      this.form,
      this.validationMessages
    );
  }
}
