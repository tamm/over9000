import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ServicesModule } from 'app/services/services.module';
import { ListModule } from 'app/data/list.module';
import { StartModule } from 'app/start/start.module';
import { ErrorModule } from 'app/error/error.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ServicesModule,
    ListModule,
    StartModule,
    ErrorModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
