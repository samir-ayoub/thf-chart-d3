import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menus = [
    { label: 'Chart Line', link: './chart-line' },
    // { label: 'Chart Line2', link: './chart-line2' },
    { label: 'Chart Bar', link: './chart-bar' },
    { label: 'Pie Bar', link: './chart-pie' },
  ];

}
