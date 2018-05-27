import { Component, Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'data-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {

  @Input('data') data: any;

  @HostListener('scroll', ['$event'])
    checkScroll() {
      const componentPosition = this.el.nativeElement.firstChild.offsetLeft
      const edgeOffset = 10

      if (this.el.nativeElement.scrollLeft > edgeOffset) {
        this.el.nativeElement.classList.add('scrollable-left')
      } else {
        this.el.nativeElement.classList.remove('scrollable-left')
      }

      if (this.el.nativeElement.scrollLeft < this.el.nativeElement.scrollWidth - this.el.nativeElement.clientWidth - edgeOffset) {
        this.el.nativeElement.classList.add('scrollable-right')
      } else {
        this.el.nativeElement.classList.remove('scrollable-right')
      }
    }

   public displayType: number
   public listData: Array<any>

  constructor(
    private el: ElementRef
  	) {

    this.displayType = null

  }

  ngOnInit() {
    if (this.data && this.data.tableType == "ENTITY") {
      this.displayType = 1
      this.data.relation = this.data.relation[0].map((col, i) => this.data.relation.map(row => row[i]))
    }
    if (this.data && this.data.tableType == "RELATION") {
      this.displayType = 2
      this.data.relation = this.data.relation[0].map((col, i) => this.data.relation.map(row => row[i]))
    }
    setTimeout(() => this.checkScroll(), 0)
  }

}
