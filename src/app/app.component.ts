import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dataSeries = [
    { category: 'Classical Music', value: 10 },
    { category: 'Alternative Rock', value: 14 },
    { category: 'Pop', value: 2 },
    { category: 'Jazz', value: 12 }
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
    // { label: 'THF Chart', link: './thf-chart-vale' },
  ];

}
