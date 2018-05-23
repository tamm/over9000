import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

import { DataService } from 'app/services/data.service'

@Component({
  selector: 'start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.sass']
})
export class StartComponent {
  constructor(
    private http: Http,
    private dataService: DataService,
  	) {

    if (this.dataService.data.value.length < 1) {
    	this.dataService.getSampleData()
    }
  }

}
