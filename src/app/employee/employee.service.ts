import { Injectable, signal } from '@angular/core';
import { Observable, delay, of as observableOf } from 'rxjs';
import { Employee } from './employee.model';
import { StorageService } from '../storage.service';
import { KeyValue } from '@angular/common';

@Injectable()
export class EmployeeService {
  searchChange = signal<KeyValue<string, string>[]>([]);

  constructor(private storageService: StorageService) {}

  getAll(
    searchParams: KeyValue<string, string>[] = []
  ): Observable<Employee[]> {
    const employees: Employee[] = this.storageService.getItems('employees');
    if (!searchParams.length) {
      return observableOf(employees).pipe(delay(1000));
    }
    const filteredEmps: Employee[] = [];
    searchParams.forEach((searchObj: KeyValue<string, string>) => {
      if (searchObj.key === 'name') {
        const emps = employees.filter(
          (x) =>
            x.firstName === searchObj.value || x.lastName === searchObj.value
        );
        emps.length && filteredEmps.push(...emps);
      } else {
        const emps = employees.filter(
          (x: Employee) =>
            x[searchObj.key as keyof Employee] === searchObj.value
        );
        emps.length && filteredEmps.push(...emps);
      }
    });
    return observableOf(filteredEmps).pipe(delay(1000));
  }

  create(data: Employee): Observable<Employee> {
    const id = this.generateId();
    const items = this.storageService.getItems('employees');
    const updatedItems = [
      ...items,
      {
        id,
        ...data
      }
    ];
    this.storageService.setItems('employees', JSON.stringify(updatedItems));
    return observableOf(data).pipe(delay(1000));
  }

  update(id: string, data: Employee): Observable<Employee> {
    const updatedItem = {
      id,
      ...data
    };
    const employees: Employee[] = this.storageService.getItems('employees');
    const items = employees.filter((x) => x.id !== id);

    this.storageService.setItems(
      'employees',
      JSON.stringify([...items, updatedItem])
    );
    return observableOf(updatedItem).pipe(delay(1000));
  }

  getEmployee(id: string): Observable<Employee> {
    const employees: Employee[] = this.storageService.getItems('employees');
    const employee = employees.find((emp) => emp.id === id) as Employee;
    return observableOf(employee).pipe(delay(1000));
  }
  removeEmployee(id: string): Observable<string> {
    const employees: Employee[] = this.storageService.getItems('employees');
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    this.storageService.setItems('employees', JSON.stringify(updatedEmployees));
    return observableOf('success').pipe(delay(1000));
  }

  generateId(): string {
    return Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    ).toString();
  }
}
