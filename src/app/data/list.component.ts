import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { DataService } from 'app/services/data.service'

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent {
  private data: any;
  public listForm: FormGroup
  public subsetStart: number
  public subsetEnd: number
  private formSubscription: Subscription
  public page_num: number
  public loading: boolean

  constructor(
    private http: Http,
    public dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  	) {
    this.listForm = new FormGroup({
      subsetLength: new FormControl(10)
    })
    this.subsetStart = 0
    this.page_num = 1
  	this.loading = false
  	this.subsetEnd = parseInt(this.listForm.controls['subsetLength'].value)

    if (this.dataService.data.value.length < 1) {
      this.loading = true
  	  this.dataService.getSampleData().then(() => {
        this.loading = false
        this.goToPage(this.page_num)
      })
    }

    this.formSubscription = this.listForm.valueChanges.subscribe((new_values) => {
      // this.goToPage(this.page_num)
      console.log(['/datalist', new_values.subsetLength, this.page_num]);
      this.router.navigate(['/datalist', new_values.subsetLength, this.page_num]);
    })
  }

  private ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      if (params.get('show_num')) {
        if (this.listForm.controls['subsetLength'].value != parseInt(params.get('show_num'))) {
          this.listForm.controls['subsetLength'].setValue(parseInt(params.get('show_num')))
        }
      }
      if (params.get('page_num')) {
        this.page_num = parseInt(params.get('page_num'))
        this.goToPage(this.page_num)
      }
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
    this.router.navigate(['/datalist', this.listForm.controls['subsetLength'].value, 1]);
  }

  public goToPreviousSubset(): void {
    if (this.page_num > 1) {
      this.router.navigate(['/datalist', this.listForm.controls['subsetLength'].value, this.page_num - 1]);
    }
  }

  public goToNextSubset(): void {
    const nextPage = this.page_num + 1

    if (nextPage <= Math.floor(this.dataService.data.value.length / parseInt(this.listForm.controls['subsetLength'].value))) {
      this.router.navigate(['/datalist', this.listForm.controls['subsetLength'].value, nextPage]);
    }
  }

  public goToLastSubset(): void {
    this.router.navigate(['/datalist', this.listForm.controls['subsetLength'].value,
      Math.floor(this.dataService.data.value.length / parseInt(this.listForm.controls['subsetLength'].value))
      ]);
  }

  public goToPage(page_num): void {
    if (page_num) {
      if (this.dataService.data.value.length > 0 && page_num > Math.floor(this.dataService.data.value.length / parseInt(this.listForm.controls['subsetLength'].value))) {
        this.goToLastSubset()
      }

      this.subsetStart = (page_num - 1) * parseInt(this.listForm.controls['subsetLength'].value) < this.dataService.data.value.length ? (page_num - 1) * parseInt(this.listForm.controls['subsetLength'].value) : this.subsetStart
      this.subsetEnd = this.subsetStart + parseInt(this.listForm.controls['subsetLength'].value)
    }
  }
}
