import { AfterViewInit, Component, ViewChild, effect } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Employee } from '../employee.model';
import { MatPaginator } from '@angular/material/paginator';
import {
  merge,
  startWith,
  switchMap,
  catchError,
  map,
  of as observableOf
} from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { POSITIONS } from 'src/app/constants/positions.const';
import { FormControl, FormGroup } from '@angular/forms';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-employees-list',
  templateUrl: 'employees-list.component.html',
  styleUrls: ['employees-list.component.scss']
})
export class EmployeesListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'fullName',
    'phone',
    'position',
    'isActive',
    'action'
  ];
  data: Employee[] = [];
  searchValue = '';
  resultsLength = 0;
  isLoadingResults = true;
  positions = POSITIONS;

  searchForm = new FormGroup({
    name: new FormControl(''),
    position: new FormControl('')
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searxhParams$ = toObservable(this.employeeService.searchChange);
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngAfterViewInit(): void {
    this.getList();
  }
  getList(): void {
    merge(this.searxhParams$, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.employeeService
            .getAll(this.employeeService.searchChange())
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }
          this.resultsLength = data.length;
          return data;
        })
      )
      .subscribe((data) => (this.data = data));
  }
  navigateToEdit(id: string): void {
    this.router.navigate(['/employee', id]);
  }

  removeEmployee(id: string): void {
    this.isLoadingResults = true;
    this.employeeService.removeEmployee(id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Employee successfully deleted!');
        this.getList();
      }
    });
  }

  onSearch() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchVal: any = this.searchForm.getRawValue();
    const res: KeyValue<string, string>[] = [];
    for (const field in searchVal) {
      if (searchVal[field]) {
        res.push({
          key: field,
          value: searchVal[field]
        });
      }
    }
    this.employeeService.searchChange.set(res);
  }
}
