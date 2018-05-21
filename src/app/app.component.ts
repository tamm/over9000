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
  	this.data = []
  	this.subsetStart = 0
  	this.subsetEnd = 10
  	this.getSampleData()
  }

  private getSampleData() {
    return this.http.get(`assets/sample`)
      .toPromise()
      .then((data: Response) => {
        this.data = this.data.concat(data.json())
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

  public loadMoreData(): void {
  	// get 1 000 000 entries
  	for (var i = 1; i < 108; i++) {
  		this.getSampleData()
  	}
  }

  public goToFirstSubset(): void {
  	this.subsetStart = 0
  	this.subsetEnd = this.subsetStart + 10
  }

  public goToPreviousSubset(): void {
  	this.subsetStart = this.subsetStart - 10 > 0 ? this.subsetStart - 10 : 0
  	this.subsetEnd = this.subsetStart + 10
  }

  public goToNextSubset(): void {
  	this.subsetStart = this.subsetStart + 10 < this.data.length - 1 ? this.subsetStart + 10 : this.subsetStart
  	this.subsetEnd = this.subsetStart + 10
  }

  public goToLastSubset(): void {
  	this.subsetStart = (this.data.length % 10) * 10
  	this.subsetEnd = this.subsetStart + 10
  }
}
