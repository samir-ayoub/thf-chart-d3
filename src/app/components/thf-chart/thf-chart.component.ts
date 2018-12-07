import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { ThfChartBaseComponent } from './thf-chart-base.component';

import { ThfChartColors } from './../../commons/utils';

@Component({
  selector: 'thf-chart',
  templateUrl: './thf-chart.component.html',
  styleUrls: ['./thf-chart.component.css']
})
export class ThfChartComponent extends ThfChartBaseComponent implements OnInit {

  colors = this.setColor();
  margin: number = 32;
  width;
  svgHeight;
  context;
  svgElement;

  chartPieItems;


  chartPieStoredData;

  // chartWrapper;

  @ViewChild('chartWrapper') chartWrapper: ElementRef;

  constructor(private renderer: Renderer2) { super(); }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    this.width = this.chartWrapper.nativeElement.clientWidth;

    this.svgElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );

    this.chartPieStoredData = this.chartPieStoreData();
    this.renderChartPie();
    this.renderLabels();
  }

  chartPieStoreData() {

    const svgData = [];
    const centerX = this.height / 2 - this.margin;
    const totalValue = this.calculateTotalValue();
    let angle = 0; // Angle
    let angleCalcule;
    let arcSweep;
    let angleRadians = 0; // Angle in Rad
    let sideX = 0; // Side x
    let sideY = 0; // Side y
    let sideZ = 0; // Size z
    let coordinateX = 0; // SVG X coordinate
    let coordinateY = 0; // SVG Y coordinate
    let rotation = 0; // Rotation
    
    this.series.map((serie, index) => {
      const dataPercentage = Math.round(100 * serie.data / totalValue) / 100;

      angle = 360 * dataPercentage;
      angleCalcule = (angle > 180) ? 360 - angle : angle;
      angleRadians = angleCalcule * Math.PI / 180;
      sideZ = Math.sqrt(2 * centerX * centerX - (2 * centerX * centerX * Math.cos(angleRadians)));

      if (angleCalcule <= 90) {
        sideX = centerX * Math.sin(angleRadians);
      } else {
        sideX = centerX * Math.sin((180 - angleCalcule) * Math.PI / 180);
      }

      sideY = Math.sqrt(sideZ * sideZ - sideX * sideX);
      coordinateY = sideY;

      if (angle <= 180) {
        coordinateX = centerX + sideX;
        arcSweep = 0;
      } else {
        coordinateX = centerX - sideX;
        arcSweep = 1;
      }

      svgData.push({
        percentage: dataPercentage,
        label: serie.style,
        color: this.colors[index],
        arcSweep: arcSweep,
        centerX: centerX,
        X: coordinateX,
        Y: coordinateY,
        R: rotation
      });

      rotation = rotation + angle;

    });

    return svgData;
  }

  calculateTotalValue() {
    let totalValue = 0;
    this.series.forEach(serie => {
      totalValue += serie.data;
    });
    return totalValue;
  }

  renderChartPie() {
    const centerX = this.chartPieStoredData[0].centerX;
    const centeringChartPie = (this.width / 2) - this.margin - centerX;

    this.svgElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
    this.svgElement.setAttribute('viewBox', `-${centeringChartPie} 0 ${this.width - (this.margin * 2)} ${this.height - (this.margin * 2)}`);

    this.svgElement.setAttributeNS(null, 'style', `width: ${this.width - (this.margin * 2)}px; height: ${this.height - (this.margin * 2)}px`);
    this.chartWrapper.nativeElement.appendChild(this.svgElement);
    
    const svgElementG = document.createElementNS( 'http://www.w3.org/2000/svg', 'g' );
    this.svgElement.appendChild(svgElementG);

    this.chartPieStoredData.map(item => {
      const slicePie = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
      slicePie.setAttributeNS(null, 'fill', item.color);
      slicePie.setAttributeNS(null, 'data-tooltip-text', item.percentage);
      slicePie.setAttributeNS(null, 'd', 'M' + item.centerX + ',' + item.centerX + ' L' + item.centerX + ',0 A' + item.centerX + ',' + item.centerX + ' 1 0,1 ' + item.X + ', ' + item.Y + ' z');
      slicePie.setAttributeNS(null, 'transform', 'rotate(' + item.R + ', ' + item.centerX + ', ' + item.centerX + ')');

      slicePie.addEventListener('mouseover', event => {
        console.log(event.target.getAttributeNS(null, "data-tooltip-text"));
      })

      svgElementG.appendChild(slicePie);

      // this.renderer.listen(slicePie, 'mousemove', (item) => {
      //   return console.log(item)
      // });
    });
  }

  renderLabels() {

  }

  setColor() {
    return ThfChartColors[5];
  }
}
