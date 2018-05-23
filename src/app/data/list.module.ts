import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list.component';
import { TableModule } from './table.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
  ],
  exports: [
    ListComponent
  ],
  declarations: [
    ListComponent
  ]
})
export class ListModule { }
