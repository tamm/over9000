import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from 'app/services/data.service'

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent {
  private data: any;
  public listForm: FormGroup
  public subsetLength: FormControl
  public subsetStart: number
  public subsetEnd: number
  private formSubscription: Subscription

  constructor(
    private http: Http,
    private dataService: DataService,
  	) {
    this.listForm = new FormGroup({
      subsetLength: new FormControl(10)
    })
  	this.subsetStart = 0
  	this.subsetEnd = parseInt(this.listForm.controls['subsetLength'].value)

    if (this.dataService.data.value.length < 1) {
  	  this.dataService.getSampleData()
    }

    this.formSubscription = this.listForm.valueChanges.subscribe(() => {
      this.subsetEnd = this.subsetStart + parseInt(this.listForm.controls['subsetLength'].value)
      console.log(this.filteredData());
    })
  }

  private ngOnDestroy() {
    this.formSubscription.unsubscribe()
  }

  public filteredData() {
  	return this.dataService.data.value ? this.dataService.data.value.filter((entry, index) => {
  		if (this.subsetStart <= index && index < this.subsetEnd) {
  			return true
  		}
  	}) : []
  }

  public loadMoreData(): void {
  	// get 1 000 000 entries
  	for (var i = 1; i < 108; i++) {
  		this.dataService.getSampleData()
  	}
  }

  public goToFirstSubset(): void {
  	this.subsetStart = 0
  	this.subsetEnd = this.subsetStart + parseInt(this.listForm.controls['subsetLength'].value)
  }

  public goToPreviousSubset(): void {
  	this.subsetStart = this.subsetStart - parseInt(this.listForm.controls['subsetLength'].value) > 0 ? this.subsetStart - parseInt(this.listForm.controls['subsetLength'].value) : 0
  	this.subsetEnd = this.subsetStart + parseInt(this.listForm.controls['subsetLength'].value)
  }

  public goToNextSubset(): void {
  	this.subsetStart = this.subsetStart + parseInt(this.listForm.controls['subsetLength'].value) < this.dataService.data.value.length ? this.subsetStart + parseInt(this.listForm.controls['subsetLength'].value) : this.subsetStart
  	this.subsetEnd = this.subsetStart + parseInt(this.listForm.controls['subsetLength'].value)
  }

  public goToLastSubset(): void {
  	this.subsetStart = Math.floor(this.dataService.data.value.length / parseInt(this.listForm.controls['subsetLength'].value)) * parseInt(this.listForm.controls['subsetLength'].value)
  	this.subsetEnd = this.subsetStart + parseInt(this.listForm.controls['subsetLength'].value)
  }
}
