import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ThfModule } from '@totvs/thf-ui';

import { AppComponent } from './app.component';
import { ChartLineComponent } from './chart-line/chart-line.component';
import { ChartLine2Component } from './chart-line-2/chart-line-2.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartLineComponent,
    ChartLine2Component
  ],
  imports: [
    BrowserModule,
    ThfModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
