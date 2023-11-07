import { Output, HostListener, Directive } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ConfirmationComponent } from './confirmation/confirmation.component';

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
      .open(ConfirmationComponent, {
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
