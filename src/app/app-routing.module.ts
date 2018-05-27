import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { ListComponent } from 'app/data/list.component'
import { StartComponent } from 'app/start/start.component'
import { ErrorComponent } from 'app/error/error.component'

export const routes: Routes = [
  {
    path: 'datalist',
    component: ListComponent,
  },
  {
    path: 'datalist/:page_num',
    component: ListComponent,
  },
  {
    path: 'datalist/:show_num/:page_num',
    component: ListComponent,
  },
  {
    path: 'start',
    component: StartComponent,
  },
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'error',
    pathMatch: 'full',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
