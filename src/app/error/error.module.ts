import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
  ],
  declarations: [
    ErrorComponent
  ]
})
export class ErrorModule { }
