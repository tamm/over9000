import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { StartComponent } from './start.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
  ],
  declarations: [
    StartComponent
  ]
})
export class StartModule { }
