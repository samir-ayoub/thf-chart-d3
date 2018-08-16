import { ChartLine2Component } from './chart-line-2/chart-line-2.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartLineComponent } from './chart-line/chart-line.component';

const routes: Routes = [
  { path: 'chart-line', component: ChartLineComponent },
  { path: 'chart-line2', component: ChartLine2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
