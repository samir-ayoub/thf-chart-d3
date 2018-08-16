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
  dots;
  margin;
  svg;
  viz;
  totalValue = 0;
  xScale;
  yScale;
  xAxis; // D3 X Axis
  xAxisGrid;
  yAxis; // D3 Y Axis

  gridX;
  gridY;

  monthSales = [
    {'month': 10, 'sales': 100},
    {'month': 20, 'sales': 130},
    {'month': 30, 'sales': 250},
    {'month': 40, 'sales': 300},
    {'month': 50, 'sales': 265},
    {'month': 60, 'sales': 225},
    {'month': 70, 'sales': 180},
    {'month': 80, 'sales': 120},
    {'month': 90, 'sales': 145},
    {'month': 100, 'sales': 130}
  ];

  constructor() { }

  ngOnInit() {
    this.setup();
    // this.drawYAxis();
  }

  ngAfterContentInit() {
    this.svgSettings();
  }

  private setup() {

    this.margin = { top: 32, right: 16, bottom: 96, left: 64 };
    this.width = document.getElementById('chartline').offsetWidth - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;

    this.xScale = d3.scaleLinear()
    .domain([10, 100])
    .range([0, this.width]);

    this.yScale = d3.scaleLinear()
    .domain([10, 100])
    .range([this.height, 0]);
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
      .ticks((this.width) / (this.height) * (this.monthSales.length / 2))
      .tickSize(-this.height);

    this.gridX = this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .attr('class', 'axis axis--x')
      .call(this.xAxis)
      .selectAll('text')
      .attr('y', 15)
      .style('text-anchor', 'start');
      
    this.yAxis = d3.axisLeft(this.yScale)
      .ticks(this.monthSales.length)
      .tickSize(this.width);

    this.gridY = this.svg.append('g')
    .attr('transform', `translate(${this.width}, 0)`)
      .attr('class', 'axis axis--y')
      .call(this.yAxis)
      .selectAll('text')
      .attr('x', -this.width - 44)
      .attr('y', -44)
      .style('text-anchor', 'start');







    // escala e tipo da linha
    this.line = d3.line()
      .x((d: any) => this.xScale(d.month))
      .y((d: any) => this.height - d.sales)
      .curve(d3.curveLinear);

    // estilo da linha
    this.viz = this.svg.
      append('path')
      .attr('d', this.line(this.monthSales))
      .attr('stroke', '#00b28e')
      .attr('stroke-this.width', 2)
      .attr('fill', 'none');

      // dotss
      this.dots = this.svg.selectAll('circle')
        .data(this.monthSales)
        .enter()
        .append('circle')
        .attr('cx', (d: any) => this.xScale(d.month))
        .attr('cy', (d: any) => this.height - d.sales)
        .attr('r', '5')
        .attr('fill', '#ffffff')
        .attr('stroke', '#00b28e')
        .attr('stroke-width', 2);

  }



}
