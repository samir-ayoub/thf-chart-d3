import { ChartPieNativeComponent } from './chart-svg-native/chart-pie-native/chart-pie-native.component';
import { ChartPieCanvasComponent } from './chart-canvas/chart-pie-canvas/chart-pie-canvas.component';
import { ChartLine2Component } from './chart-line-2/chart-line-2.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartLineComponent } from './chart-line/chart-line.component';
import { ChartBarComponent } from './chart-bar/chart-bar.component';
import { ChartPieComponent } from './chart-pie/chart-pie.component';
import { ChartDonutComponent } from './chart-donut/chart-donut.component';
import { ChartBar2Component } from './chart-bar2/chart-bar2.component';

const routes: Routes = [
  { path: 'chart-line', component: ChartLineComponent },
  { path: 'chart-line2', component: ChartLine2Component },
  { path: 'chart-bar', component: ChartBarComponent },
  { path: 'chart-bar2', component: ChartBar2Component },
  { path: 'chart-pie', component: ChartPieComponent },
  { path: 'chart-donut', component: ChartDonutComponent },
  { path: 'chart-pie-canvas', component: ChartPieCanvasComponent },
  { path: 'chart-pie-native', component: ChartPieNativeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
