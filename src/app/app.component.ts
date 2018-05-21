import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Over 9000';
  private data: any;
  public subsetStart: number
  public subsetEnd: number

  constructor(
    private http: Http,
  	) {
  	this.data = false
  	this.subsetStart = 0
  	this.subsetEnd = 10
  	this.getSampleData()
  }

  private getSampleData() {
    return this.http.get(`assets/sample`)
      .toPromise()
      .then((data: Response) => {
        this.data = data.json()
      })
      .catch((e) => console.error({message: `Could not get sample`, e}));

  }

  public filteredData() {
  	return this.data ? this.data.filter((entry, index) => {
  		if (this.subsetStart < index && index < this.subsetEnd) {
  			return true
  		}
  	}) : []
  }

  public goToPreviousSubset(): void {
  	this.subsetStart = this.subsetStart - 10 > 0 ? this.subsetStart - 10 : 0
  	this.subsetEnd = this.subsetStart + 10
  }

  public goToNextSubset(): void {
  	this.subsetStart = this.subsetStart + 10 < this.data.length - 1 ? this.subsetStart + 10 : this.subsetStart
  	this.subsetEnd = this.subsetStart + 10
  }
}
