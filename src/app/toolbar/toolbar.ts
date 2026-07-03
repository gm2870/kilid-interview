import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.html',
  styleUrls: ['toolbar.scss'],
  imports: [MatToolbarModule, MatButtonModule, RouterModule]
})
export class Toolbar {}
