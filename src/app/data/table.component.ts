import { Component, Input } from '@angular/core';

@Component({
  selector: 'data-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {

  @Input('data') data: any;

  constructor(
  	) {
  }
}
