import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { MONTHLYSALES } from '../shared/imports';

import { ThfChartColors } from '../commons/thf-chart-colors';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.css']
})
export class ChartBarComponent implements OnInit {

  data;
  xScaleData;
  color;
  width: number;
  margin = { top: 32, right: 16, bottom: 56, left: 64 };
  xScale;
  yScale: d3.ScaleLinear<number, number>;
  svg: any;
  height: number;
  line: any;
  g: any;
  xAxis: any;
  yAxis: any;

  constructor() { }

  ngOnInit() {
    this.color = this.setColor();
    
    this.xScaleData = MONTHLYSALES.map(serie => serie.monthlySales.map(data => data.month))[0];
      
    this.initChart();
    this.drawAxis();
    this.drawBars();
    // this.drawDots();
    // this.drawLegend();
  }

  initChart() {
    this.width = document.getElementById('chartline').offsetWidth - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;

    this.xScale = d3.scaleBand()
    .domain(this.xScaleData.map(data => {return data}))
    .range([0, this.width]);

    this.yScale = d3.scaleLinear()
    .domain([0, this.getCategorieMaxValue()])
    .range([this.height, 0]);

    this.line = d3.line()
    .curve(d3.curveLinear)
    .x( (d: any) => this.xScale(d.month) )
    .y( (d: any) => this.yScale(d.sales) );

    this.svg = d3.select('.svg').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)

    this.g = this.svg.append('g').attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  private drawAxis() {
    this.xAxis = this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(this.xScale)
        .tickSize(-this.height))
      .selectAll('text')
      .attr('x', -10)
      .attr('y', 15)
      .style('text-anchor', 'start');

    this.yAxis = this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(this.yScale)
        .ticks(4)
        .tickSize(-this.width))
      .selectAll('text')
      .attr('x', - 40)
      .attr('y', 0)
      .style('text-anchor', 'start');
  }

  drawBars() {
    let serieBarItem = this.g.selectAll('bar')
      .data(MONTHLYSALES)
      .enter()
      .append('g')
      .attr('class', 'serie-bar-item');

    serieBarItem.append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => this.xScale(d.month) )
    .attr('y', (d) => this.yScale(d.sales) )
    .attr('width', this.xScale.bandwidth())
    .attr('height', (d) => this.height - this.yScale(d.sales) );

  }

  // serieLineItem.append('path')
  // .attr('class', 'line')
  // .attr('d', (d) => this.line(d.monthlySales))
  // .attr('stroke', (d, i) => this.color[i])
  // .attr('stroke-width', 2)
  // .attr('fill', 'none');


//   private drawBars() {
//     this.g.selectAll('.bar')
//         .data(STATISTICS)
//         .enter().append('rect')
//         .attr('class', 'bar')
//         .attr('x', (d) => this.x(d.letter) )
//         .attr('y', (d) => this.y(d.frequency) )
//         .attr('width', this.x.bandwidth())
//         .attr('height', (d) => this.height - this.y(d.frequency) );
// }


  setColor() {
    if (MONTHLYSALES) {
      let index = MONTHLYSALES.length - 1;

      index = index >= 12 ? 11 : index;
      return ThfChartColors[index];
    }
    return ThfChartColors[11];
  }


  
  private getCategorieMaxValue(): number {
    let maxX = 0;

    MONTHLYSALES.map(serie => {
      serie.monthlySales.filter(monthData => {
        return maxX = monthData.sales >= maxX ? monthData.sales : maxX;
      });
    });
    return maxX;
  };

}
