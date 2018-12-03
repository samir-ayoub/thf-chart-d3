import { Component, OnInit, HostListener } from '@angular/core';
import { ChartLineService } from './chart-line.service';
import { ThfChartColors } from './../commons/utils';

import * as d3 from 'd3';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.css'],
  providers: [ChartLineService]
})
export class ChartLineComponent implements OnInit {

  color;
  data;
  dots;
  g;
  height;
  legend;
  line;
  margin = { top: 32, right: 16, bottom: 56, left: 64 };
  svg;
  xAxis;
  xScale;
  yAxis;
  yScale;
  xScaleData;
  width;

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      d3.select('svg').remove();

      this.initChart();
      this.drawAxis();
      this.drawLines();
      this.drawDots();
  }

  constructor(private chartLineService: ChartLineService) {}

  ngOnInit() {
    this.data = this.chartLineService.getData();
    this.color = this.setColor();

    this.xScaleData = this.data.map(serie => serie.monthlySales.map(data => data.month))[0];

    this.initChart();
    this.drawAxis();
    this.drawLines();
    this.drawDots();
    this.drawLegend();
  }

  initChart() {
    this.width = document.getElementById('chartline').offsetWidth - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;

    this.xScale = d3.scalePoint()
    .domain(this.xScaleData.map(categorie => categorie))
        .range([0, this.width]);

    this.yScale = d3.scaleLinear()
    .domain([0, this.getCategorieMaxValue()])
    .range([this.height, 0]);

    this.line = d3Shape.line()
    .curve(d3.curveLinear)
    .x( (d: any) => this.xScale(d.month) )
    .y( (d: any) => this.yScale(d.sales) );

    this.svg = d3.select('.svg').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

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

  private drawLines() {
    const serieLineItem = this.g.selectAll('.serie-line-item')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'serie-line-item');

    serieLineItem.append('path')
      .attr('class', 'line')
      .attr('d', (d) => this.line(d.monthlySales))
      .attr('stroke', (d, i) => this.color[i])
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  }

  drawDots() {
    const tooltip = d3.select('.tooltip');

    this.dots = this.g.selectAll('circle-group')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'serie-line-dot')
      .attr('stroke', (d, i) => this.color[i])
      .attr('stroke-width', '2')
      .style('fill', '#ffffff')
      .selectAll('circle')
      .data(d => d.monthlySales)
      .enter()
      .append('circle')
      .attr('cx', dd => this.xScale(dd.month))
      .attr('cy', dd =>  this.yScale(dd.sales))
      .attr('r', '5')
      .attr('stroke-width', 2)
      .on('mouseover', (dd, i) => {
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        tooltip.html(dd.sales)
          .style('left', this.xScale(this.xScaleData[i]) + 35 + 'px')
          .style('top', this.yScale(dd.sales) - 25 + 'px');
        })
      .on('mouseout', () => {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
        });
  }

  drawLegend() {
    this.legend = d3.select('.legend');

    this.legend.selectAll('legend')
    .data(this.data)
    .enter()
    .append('div')
    .attr('class', 'legend-item')
    .each((d, i, n) => {
      const color = this.setColor();
      const p = d3.select(n[i]);

      p.append('span')
      .attr('class', 'key-dot')
      .style('border-color', color[i]);

      p.append('p')
      .attr('class', 'legend-text')
        .text(d.name);
      });
  }

  setColor() {
    if (this.data) {
      let index = this.data.length - 1;

      index = index >= 12 ? 11 : index;
      return ThfChartColors[index];
    }
    return ThfChartColors[11];
  }

  private getCategorieMaxValue(): number {
    let maxX = 0;

    this.data.map(serie => {
      serie.monthlySales.filter(monthData => {
        return maxX = monthData.sales >= maxX ? monthData.sales : maxX;
      });
    });
    return maxX;
  }

}
