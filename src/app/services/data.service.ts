import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  public data: BehaviorSubject<Array<any>>;

  constructor(
    private http: Http,
  ) {
    this.data = new BehaviorSubject([])
  }

  public getSampleData() {
    return this.http.get(`assets/sample`)
      .toPromise()
      .then((data: Response) => {
        this.data.next(this.data.value.concat(data.json()))
      })
      .catch((e) => console.error({message: `Could not get sample data`, e}));

  }
}
