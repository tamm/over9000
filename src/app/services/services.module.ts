import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';

import { DataService } from './data.service';

@NgModule({
  imports: [
    HttpModule,
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    DataService,
  ],
})

export class ServicesModule {
  constructor (@Optional() @SkipSelf() parentModule: ServicesModule) {
    if (parentModule) {
      throw new Error('ServicesModule is already loaded. Import it in the AppModule only');
    }
  }
}