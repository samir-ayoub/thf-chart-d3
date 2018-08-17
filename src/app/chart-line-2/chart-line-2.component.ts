import { Component, OnInit, AfterContentInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-chart-line-2',
  templateUrl: './chart-line-2.component.html',
  styleUrls: ['./chart-line-2.component.css']
})
export class ChartLine2Component implements OnInit, AfterContentInit {

  height;
  width;
  labels;
  line;
  line2;
  dots;
  margin;
  svg;
  viz;
  viz2;
  totalValue = 0;
  xScale;
  yScale;
  xAxis; // D3 X Axis
  xAxisGrid;
  yAxis; // D3 Y Axis
  tooltip;
  formatTime = d3.timeFormat('%e %B');


  gridX;
  gridY;

  monthimports = [
    {'month': 'jan', 'imports': 100, 'exports': 140},
    {'month': 'fev', 'imports': 130, 'exports': 120},
    {'month': 'mar', 'imports': 250, 'exports': 230},
    {'month': 'abr', 'imports': 300, 'exports': 239},
    {'month': 'mai', 'imports': 265, 'exports': 180},
    {'month': 'jun', 'imports': 225, 'exports': 130},
    {'month': 'jul', 'imports': 180, 'exports': 156},
    {'month': 'ago', 'imports': 120, 'exports': 198},
    {'month': 'set', 'imports': 145, 'exports': 290},
    {'month': 'out', 'imports': 130, 'exports': 299}
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.createSvg();
  }

  private setup() {

    this.margin = { top: 32, right: 16, bottom: 96, left: 64 };
    this.width = document.getElementById('chartline').offsetWidth - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;

    this.xScale = d3.scalePoint()
    .domain(this.monthimports.map(function(d) { return d.month; }))
    .range([0, this.width]);

    this.yScale = d3.scaleLinear()
    .domain([0, d3.max(this.monthimports, d => d['imports'])])
    .range([this.height, 0]);

    this.tooltip = d3.select('#chartline').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

  }

  private svgSettings() {

    // building svg
    this.svg = d3.select('#chartline')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('class', 'svg-element')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);




  // grid + axis
    this.xAxis = d3.axisBottom(this.xScale)
      .ticks((this.width) / (this.height) * (this.monthimports.length / 2))
      .tickSize(-this.height);

    this.gridX = this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .attr('class', 'axis axis--x')
      .call(this.xAxis)
      .selectAll('text')
      .attr('x', -10)
      .attr('y', 15)
      .style('text-anchor', 'start');

    this.yAxis = d3.axisLeft(this.yScale)
      .ticks((this.width) / (this.height) * (this.monthimports.length / 2))
      .tickSize(this.width);

    this.gridY = this.svg.append('g')
    .attr('transform', `translate(${this.width}, 0)`)
      .attr('class', 'axis axis--y')
      .call(this.yAxis)
      .selectAll('text')
      .attr('x', -this.width - 44)
      .attr('y', 0)
      .style('text-anchor', 'start');

    // escala e tipo da linha
    this.line = d3.line()
      .x((d: any) => this.xScale(d.month))
      .y((d: any) => this.yScale(d.imports))
      .curve(d3.curveLinear);

      this.line2 = d3.line()
      .x((d: any) => this.xScale(d.month))
      .y((d: any) => this.yScale(d.exports))
      .curve(d3.curveLinear);

    // estilo da linha
    this.viz = this.svg.
      append('path')
      .attr('d', this.line(this.monthimports))
      .attr('stroke', '#00b28e')
      .attr('stroke-this.width', 2)
      .attr('fill', 'none');

      this.viz2 = this.svg.
      append('path')
      .attr('d', this.line2(this.monthimports))
      .attr('stroke', '#c64840')
      .attr('stroke-this.width', 2)
      .attr('fill', 'none');

    // dotss
    this.dots = this.svg.selectAll('circle')
      .data(this.monthimports)
      .enter()
      .append('circle')
      .attr('cx', (d: any) => this.xScale(d.month))
      .attr('cy', (d: any) => this.yScale(d.imports))
      .attr('r', '5')
      .attr('fill', '#ffffff')
      .attr('stroke', '#00b28e')
      .attr('stroke-width', 2)
      .on('mouseover', d => {
        this.tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        this.tooltip.html(d.imports)
          // .style('left', ((this.xScale(d.month) + this.margin.left - (this.tooltip.node().getBoundingClientRect().width / 2)) + 'px'))
          .style('left', this.xScale(d.month) + this.margin.left - 12 + 'px')
          .style('top', this.yScale(d.imports) - 12 + 'px');
        })
      .on('mouseout', () => {
        this.tooltip.transition()
          .duration(500)
          .style('opacity', 0);
        });

        console.log(this.tooltip.node().getBoundingClientRect().width);

        // .attr('x', (d, i) => i * (this.w / this.dataset.length) + (this.w / this.dataset.length - this.padding) / 2)



  }

  private createSvg() {
    this.setup();
    this.svgSettings();
  }



}
