import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';

import { ThfChartBaseComponent } from './thf-chart-base.component';

import { ThfChartColors } from './../../commons/utils';

@Component({
  selector: 'thf-chart',
  templateUrl: './thf-chart.component.html',
  styleUrls: ['./thf-chart.component.css']
})
export class ThfChartComponent extends ThfChartBaseComponent implements OnInit {

  colors = this.setColor();
  margin: number = 24;

  svgWidth;
  svgHeight;

  svgElement;
  centerXViewBoxValue;
  centerX;


  chartPieItems;

  chartPieStoredData;

  // chartWrapper;
  // @HostListener('window:resize', ['$event.target'])
  // onResize() {
  //   this.setDimensions();
  //   this.svgElement.setAttributeNS(null, 'style', `width: ${this.svgWidth - (this.margin * 2)}px; height: ${this.svgHeight - (this.margin * 2)}px`);
  // }

  constructor(private renderer: Renderer2, private el: ElementRef) { super(); }

  ngOnInit() {
    this.checkIfHasFixedHeightValue();
    this.setDimensions();
    this.chartPieStoredData = this.chartPieStoreData();
    this.renderChart();
  }

  renderChart() {
    this.renderChartPie();
    this.renderLabels();
  }

  chartPieStoreData() {
    const svgData = [];
    this.centerX = this.calculateCircleCenterDistancePoint();
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
      const dataPercentage = Math.round(100 * serie.value / totalValue) / 100;

      angle = 360 * dataPercentage;
      angleCalcule = (angle > 180) ? 360 - angle : angle;
      angleRadians = angleCalcule * Math.PI / 180;
      sideZ = Math.sqrt(2 * this.centerX * this.centerX - (2 * this.centerX * this.centerX * Math.cos(angleRadians)));

      if (angleCalcule <= 90) {
        sideX = this.centerX * Math.sin(angleRadians);
      } else {
        sideX = this.centerX * Math.sin((180 - angleCalcule) * Math.PI / 180);
      }

      sideY = Math.sqrt(sideZ * sideZ - sideX * sideX);
      coordinateY = sideY;

      if (angle <= 180) {
        coordinateX = this.centerX + sideX;
        arcSweep = 0;
      } else {
        coordinateX = this.centerX - sideX;
        arcSweep = 1;
      }

      svgData.push({
        value: serie.value,
        label: serie.style,
        color: this.colors[index],
        arcSweep: arcSweep,
        centerX: this.centerX,
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
      totalValue += serie.value;
    });
    return totalValue;
  }

  renderChartPie() {

    this.svgElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
    this.svgElement.setAttribute('viewBox', `-${this.centerXViewBoxValue} 0 ${this.svgWidth - (this.margin * 2)} ${this.centerX * 2}`);
    this.svgElement.setAttribute('preserveAspectRatio', 'xMidYMin meet');

    this.svgElement.setAttributeNS(null, 'style', `width: ${this.svgWidth - (this.margin * 2)}px; height: ${this.svgHeight - (this.margin * 2)}px`);
    this.renderer.selectRootElement('.thf-chart').appendChild(this.svgElement);
    
    const svgElementG = document.createElementNS( 'http://www.w3.org/2000/svg', 'g' );
    this.svgElement.appendChild(svgElementG);

    this.chartPieStoredData.map(item => {
      const slicePie = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
      slicePie.setAttributeNS(null, 'fill', item.color);
      slicePie.setAttributeNS(null, 'data-tooltip-text', item.value);
      slicePie.setAttributeNS(null, 'd', 'M' + item.centerX + ',' + item.centerX + ' L' + item.centerX + ',0 A' + item.centerX + ',' + item.centerX + ' 1 0,1 ' + item.X + ', ' + item.Y + ' z');
      slicePie.setAttributeNS(null, 'transform', 'rotate(' + item.R + ', ' + item.centerX + ', ' + item.centerX + ')');

      // slicePie.addEventListener('mouseover', event => {
      //   console.log(event.target.getAttributeNS(null, "data-tooltip-text"));
      // })

      svgElementG.appendChild(slicePie);

      // this.renderer.listen(slicePie, 'mousemove', (item) => {
      //   return console.log(item)
      // });
    });
  }

  renderLabels() {
  }

  calculateCircleCenterDistancePoint() {
    if (this.svgWidth > this.svgHeight) {
      return this.svgHeight / 2 - this.margin;
    } else {
      return this.svgWidth / 2 - this.margin;
    }
  }

  setDimensions() {
    // const svgTitle = this.chartWrapper.nativeElement.getElementsByClassName('.thf-chart-header');
    const svgTitle = this.chartWrapper.nativeElement.children[0].offsetHeight;
    const svgLegend = this.chartWrapper.nativeElement.children[2].clientHeight;

    this.svgWidth = this.chartWrapper.nativeElement.clientWidth;

    if (this.height && this.height > 0) {
      this.svgHeight = this.height - svgTitle - svgLegend - this.margin;
    } else {
      this.svgHeight = this.svgWidth;
    }

    // this.svgHeight = this.height && this.height > 0 ? this.height : this.svgWidth;
    this.centerX = this.calculateCircleCenterDistancePoint();
    this.centerXViewBoxValue = (this.svgWidth / 2) - this.margin - this.centerX;
  }

  checkIfHasFixedHeightValue() {
    return this.hasFixedHeightValue = this.height ? this.height : undefined;
  }

  setColor() {
    return ThfChartColors[5];
  }

  onWindowResize(event) {
    this.setDimensions();

    if (this.hasFixedHeightValue) {
      this.svgElement.setAttributeNS(null, 'style', `width: ${this.svgWidth - (this.margin * 2)}px; height: ${this.svgWidth - (this.margin * 2)}px`);
    } else {
      this.svgElement.setAttributeNS(null, 'style', `width: ${this.svgWidth - (this.margin * 2)}px; height: ${this.svgHeight - (this.margin * 2)}px`);
    }

  }
}
