import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { PRODUCTSALE } from '../shared/imports';

import { ThfChartColors } from '../commons/utils';

@Component({
  selector: 'app-chart-bar2',
  templateUrl: './chart-bar2.component.html',
  styleUrls: ['./chart-bar2.component.css']
})
export class ChartBar2Component implements OnInit {

  data;
  xScaleData;
  x1Scale;
  color;
  keys;
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
  bar;


  categories = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  series = [
    { 'Month': 'Jan', 'Video Game': 270, 'Notebook': 449, 'Cellphone': 270, 'Tablet': 70 },
    { 'Month': 'Feb', 'Video Game': 202, 'Notebook': 327, 'Cellphone': 160, 'Tablet': 90 },
    { 'Month': 'Mar', 'Video Game': 120, 'Notebook': 214, 'Cellphone': 180, 'Tablet': 129 },
    { 'Month': 'Abr', 'Video Game': 114, 'Notebook': 193, 'Cellphone': 290, 'Tablet': 68 },
    { 'Month': 'Mai', 'Video Game': 894, 'Notebook': 155, 'Cellphone': 320, 'Tablet': 189 },
    { 'Month': 'Jun', 'Video Game': 737, 'Notebook': 134, 'Cellphone': 340, 'Tablet': 147 }
  ];


  ngOnInit() {
    this.color = this.setColor();

    this.xScaleData = PRODUCTSALE.map(serie => serie.monthlySales.map(data => data.month))[0];

    this.keys = Object.keys(this.series[0]).slice(1);
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
      .rangeRound([0, this.width])
      .domain(this.series.map(d => d.Month));

    this.x1Scale = d3.scaleBand()
      .domain(this.keys)
      .rangeRound([0, this.xScale.bandwidth()]);

    this.yScale = d3.scaleLinear()
      .domain([0, this.getCategorieMaxValue()])
      .range([this.height, 0]);

    this.line = d3.line()
      .curve(d3.curveLinear)
      .x((d: any) => this.xScale(d.month))
      .y((d: any) => this.yScale(d.sales));

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
    this.bar = this.g.append("g")
      .selectAll("g")
      .data(this.series)
      .enter().append("g")
      .attr("transform", (d) => "translate(" + this.xScale(d.Month) + ",0)");

    this.bar.selectAll("rect")
    .data((d) => this.keys.map((key) => { 
        return { key: key, value: d[key] }; 
         }))
      .enter().append("rect")
      .attr("x", (d) => this.x1Scale(d.key))
      .attr("y", (d) => this.yScale(d.value))
      .attr("width", this.x1Scale.bandwidth())
      .attr("height", (d) => this.height - this.yScale(d.value))
    .attr('fill', (d, i) => this.color[i]);

  }

  setColor() {
    if (PRODUCTSALE) {
      let index = PRODUCTSALE.length - 1;

      index = index >= 12 ? 11 : index;
      return ThfChartColors[index];
    }
    return ThfChartColors[11];
  }

  private getCategorieMaxValue(): number {
    let maxX = 0;

    PRODUCTSALE.map(serie => {
      serie.monthlySales.filter(monthData => {
        return maxX = monthData.sales >= maxX ? monthData.sales : maxX;
      });
    });
    return maxX;
  };

}