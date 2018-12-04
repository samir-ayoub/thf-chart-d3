import { ThfChartColors } from './../../commons/utils';
import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';

import { PieChart } from './model/Piechart';

@Component({
  selector: 'app-chart-pie-canvas',
  templateUrl: './chart-pie-canvas.component.html',
  styleUrls: ['./chart-pie-canvas.component.css']
})
export class ChartPieCanvasComponent implements OnInit {

  ctx;
  colors = this.setColor();
  donutSize = 0.5;
  myCanvas;

  myVinyls = [
    {style: 'Classical Music', data: 10},
    {style: 'Alternative Rock', data: 14},
    {style: 'Pop', data: 2},
    {style: 'Jazz', data: 12}
  ];

  @ViewChild('chartLegend') chartLegend: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderCanvas();
  }

  renderCanvas() {
    // this.width = document.getElementById('chartline').offsetWidth - this.margin.left - this.margin.right;

    this.myCanvas = document.getElementById('myCanvas');
    this.myCanvas.width = 300;
    this.myCanvas.height = 300;
    this.ctx = this.myCanvas.getContext('2d');

    this.drawPie();
    this.drawDonetHole(this.donutSize);
    this.drawLabels();
    this.drawLegend();
  }

  drawLine(ctx, startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();
  }

  drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  }

  drawPie() {
    const total_value = 38;
    let start_angle = 0;
    let slice_angle;
    const color_index = 0;

    this.myVinyls.map((vinyl, index) => {
      // total_value += vinyl.data;
      slice_angle = 2 * Math.PI * vinyl.data / total_value;

      this.drawPieSlice(
        this.ctx,
        this.myCanvas.width / 2,
        this.myCanvas.height / 2,
        Math.min(this.myCanvas.width / 2, this.myCanvas.height / 2),
        start_angle,
        start_angle + slice_angle,
        this.colors[index]
      );
      start_angle += slice_angle;
    });

  }

  drawDonetHole(size) {
    this.drawPieSlice(
      this.ctx,
      this.myCanvas.width / 2,
      this.myCanvas.height / 2,
      size * Math.min(this.myCanvas.width / 2, this.myCanvas.height / 2),
      0,
      2 * Math.PI,
      '#ffffff'
    );
  }

  drawLabels() {
    const total_value = 38;
    let start_angle = 0;
    let slice_angle = 0;


    this.myVinyls.map(vinyl => {
      slice_angle = 2 * Math.PI * vinyl.data / total_value;
      const pieRadius = Math.min(this.myCanvas.width / 2, this.myCanvas.height / 2);

      let labelX = this.myCanvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
      let labelY = this.myCanvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);

      if (this.donutSize) {
        const offset = (pieRadius * this.donutSize) / 2;
        labelX = this.myCanvas.width / 2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
        labelY = this.myCanvas.height / 2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
      }

      const labelText = Math.round(100 * vinyl.data / total_value);
      this.ctx.fillStyle = 'white';
      this.ctx.font = 'bold 16px Arial';
      this.ctx.fillText(labelText + '%', labelX, labelY);
      start_angle += slice_angle;

    });
  }

  drawLegend() {

    this.myVinyls.map((vinyl, index) => {
      const legendItem = this.renderer.createElement('div');
      const legendSquare = this.renderer.createElement('span');
      const legendTextSpan = this.renderer.createElement('span');
      const text = this.renderer.createText(vinyl.style);

      this.renderer.appendChild(this.chartLegend.nativeElement, legendItem);
      this.renderer.addClass(legendItem, 'legend-item');

      this.renderer.appendChild(legendItem, legendSquare );
      this.renderer.addClass(legendSquare, 'legend-square');
      this.renderer.setStyle(legendSquare, 'background-color', this.colors[index]);

      this.renderer.appendChild(legendItem, legendTextSpan );
      this.renderer.appendChild(legendTextSpan, text );
      this.renderer.addClass(legendTextSpan, 'legend-text');
    });
  }

  setColor() {
    return ThfChartColors[5];
  }

}
