import { Output, HostListener, Directive } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Confirmation } from './confirmation/confirmation';

@Directive({
  selector: '[appConfirmAction]',
  standalone: true
})
export class ConfirmationDirective {
  @Output() confirmed = new Subject<void>();

  constructor(private dialog: MatDialog) {}

  @HostListener('click')
  click(): void {
    this.dialog
      .open(Confirmation, {
        minWidth: '500px',
        minHeight: '150px'
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.confirmed.next();
        }
      });
  }
}
