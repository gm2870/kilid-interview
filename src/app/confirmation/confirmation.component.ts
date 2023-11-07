import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: 'confirmation.component.html',
  styleUrls: ['confirmation.component.scss'],
  standalone: true,
  imports: [NgIf, MatButtonModule, MatDialogModule]
})
export class ConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
