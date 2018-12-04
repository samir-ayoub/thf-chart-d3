import { Input, ViewChild } from '@angular/core';

export class ThfChartBaseComponent {

@Input('width') width;

@Input('height') height;

@Input('series') series;

@Input('categories') categories;

@ViewChild('svgElement') svgElement;

}
