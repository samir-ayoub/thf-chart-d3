import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ThfModule } from '@totvs/thf-ui';

import { AppComponent } from './app.component';
import { ChartLineComponent } from './chart-line/chart-line.component';
import { ChartLine2Component } from './chart-line-2/chart-line-2.component';
import { ChartBarComponent } from './chart-bar/chart-bar.component';
import { ChartPieComponent } from './chart-pie/chart-pie.component';
import { ChartDonutComponent } from './chart-donut/chart-donut.component';
import { ChartBar2Component } from './chart-bar2/chart-bar2.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartLineComponent,
    ChartLine2Component,
    ChartBarComponent,
    ChartPieComponent,
    ChartDonutComponent,
    ChartBar2Component
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
