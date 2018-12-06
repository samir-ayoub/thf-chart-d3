import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dataSeries = [
    { style: 'Classical Music', data: 10 },
    { style: 'Alternative Rock', data: 14 },
    { style: 'Pop', data: 2 },
    { style: 'Jazz', data: 12 }
  ];


  menus = [
    { label: 'Chart Line', link: './chart-line' },
    // { label: 'Chart Line2', link: './chart-line2' },
    // { label: 'Chart Bar', link: './chart-bar' },
    { label: 'Chart Bar', link: './chart-bar2' },
    { label: 'Chart Pie', link: './chart-pie' },
    { label: 'Chart Donut', link: './chart-donut' },
    { label: 'Chart Pie Canvas', link: './chart-pie-canvas' },
    { label: 'Chart Pie Native', link: './chart-pie-native' },
    { label: 'THF Chart', link: './thf-chart' },
  ];

}
