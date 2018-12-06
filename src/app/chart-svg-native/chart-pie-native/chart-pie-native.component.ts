import { ThfChartColors } from './../../commons/utils';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chart-pie-native',
  templateUrl: './chart-pie-native.component.html',
  styleUrls: ['./chart-pie-native.component.css']
})
export class ChartPieNativeComponent implements OnInit {

  colors = this.setColor();
  myCanvas;
  myVinyls = [
    {style: 'Classical Music', data: 0.45},
    {style: 'Alternative Rock', data: 0.21},
    {style: 'Pop', data: 0.11},
    {style: 'Jazz', data: 0.23}
  ];
  size: number = 230;
  svgElement;

  chartData;

  @ViewChild('chartLegend') chartLegend: ElementRef;

  constructor() { }

  ngOnInit() {
    this.initialSetup();
  }

  initialSetup() {
    this.myCanvas = document.getElementById('svgCanvas');
    this.myCanvas.width = 300;
    this.myCanvas.height = 300;

    this.chartData = this.calculateSlices();
    this.renderChartPie();
    this.drawDonetHole();
  }

  calculateSlices() {
    const slices = [];
    const l = this.size / 2;

    let a = 0 // Angle
    let aCalc;
    let arcSweep;
    let aRad = 0 // Angle in Rad
    let z = 0 // Size z
    let x = 0 // Side x
    let y = 0 // Side y
    let X = 0 // SVG X coordinate
    let Y = 0 // SVG Y coordinate
    let R = 0 // Rotation

    this.myVinyls.map((item, index) => {
      a = 360 * item.data;
      aCalc = (a > 180) ? 360 - a : a;
      aRad = aCalc * Math.PI / 180;
      z = Math.sqrt(2 * l * l - (2 * l * l * Math.cos(aRad)));

      if (aCalc <= 90) {
        x = l * Math.sin(aRad);
      } else {
        x = l * Math.sin((180 - aCalc) * Math.PI / 180);
      }

      y = Math.sqrt(z * z - x * x);
      Y = y;

      if (a <= 180) {
        X = l + x;
        arcSweep = 0;
      } else {
        X = l - x;
        arcSweep = 1;
      }

      slices.push({
        percentage: item.data,
        label: item.style,
        color: this.colors[index],
        arcSweep: arcSweep,
        L: l,
        X: X,
        Y: Y,
        R: R
      });

      R = R + a;

    });

    return slices;
  }

  renderChartPie() {
    this.svgElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );

    this.svgElement.setAttributeNS(null, 'style', `width: ${this.size}px; height: ${this.size}px`);
    this.myCanvas.appendChild(this.svgElement);

    this.chartData.map(item => {
      const slicePie = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
      slicePie.setAttributeNS(null, 'fill', item.color);
      slicePie.setAttributeNS(null, 'd', 'M' + item.L + ',' + item.L + ' L' + item.L + ',0 A' + item.L + ',' + item.L + ' 1 0,1 ' + item.X + ', ' + item.Y + ' z');
      slicePie.setAttributeNS(null, 'transform', 'rotate(' + item.R + ', ' + item.L + ', ' + item.L+ ')');

      this.svgElement.appendChild(slicePie);
    });
  }

  drawDonetHole() {
    const midCircle = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' );
    midCircle.setAttributeNS(null, 'cx', `${this.size * 0.5}` );
    midCircle.setAttributeNS(null, 'cy', `${this.size * 0.5}`);
    midCircle.setAttributeNS(null, 'r', `${this.size * 0.28}` );
    midCircle.setAttributeNS(null, 'fill', '#ffffff' );

    this.svgElement.appendChild(midCircle);
  }

  setColor() {
    return ThfChartColors[5];
  }

}
