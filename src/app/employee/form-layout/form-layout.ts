import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-layout',
  templateUrl: 'form-layout.html',
  styleUrls: ['form-layout.scss'],
  imports: [CommonModule, RouterLink, MatButtonModule]
})
export class FormLayout {}
