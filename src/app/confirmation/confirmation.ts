import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: 'confirmation.html',
  styleUrls: ['confirmation.scss'],
  imports: [MatButtonModule, MatDialogModule]
})
export class Confirmation {
  constructor(
    public dialogRef: MatDialogRef<Confirmation>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
