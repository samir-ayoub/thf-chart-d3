import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ThfModule } from '@totvs/thf-ui';

import { AppComponent } from './app.component';
import { ChartLineComponent } from './chart-d3/chart-line/chart-line.component';
import { ChartLine2Component } from './chart-d3/chart-line-2/chart-line-2.component';
import { ChartBarComponent } from './chart-d3/chart-bar/chart-bar.component';
import { ChartPieComponent } from './chart-d3/chart-pie/chart-pie.component';
import { ChartDonutComponent } from './chart-d3/chart-donut/chart-donut.component';
import { ChartBar2Component } from './chart-d3/chart-bar2/chart-bar2.component';
import { ThfChartComponent } from './components/thf-chart/thf-chart.component';
import { ChartPieCanvasComponent } from './chart-canvas/chart-pie-canvas/chart-pie-canvas.component';
import { ChartPieNativeComponent } from './chart-svg-native/chart-pie-native/chart-pie-native.component';
import { ComponenteChartComponent } from './componente-chart/componente-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartLineComponent,
    ChartLine2Component,
    ChartBarComponent,
    ChartPieComponent,
    ChartDonutComponent,
    ChartBar2Component,
    ThfChartComponent,
    ChartPieCanvasComponent,
    ChartPieNativeComponent,
    ComponenteChartComponent
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
