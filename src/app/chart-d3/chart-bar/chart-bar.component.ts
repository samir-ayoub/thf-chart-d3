import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { PRODUCTSALE } from '../../shared/imports';

import { ThfChartColors } from '../../commons/utils';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.css']
})
export class ChartBarComponent implements OnInit {

  data;
  xScaleData;
  x1Scale;
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
  bar;

  categories = [ 'Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  keys;

  constructor() { }

  ngOnInit() {
    this.color = this.setColor();
    
    this.xScaleData = PRODUCTSALE.map(serie => serie.monthlySales.map(data => data.month))[0];
      
    this.initChart();
    this.drawAxis();
    this.drawBars();
    // this.drawDots();
    // this.drawLegend();
  }

  initChart() {

    this.keys = Object.keys(PRODUCTSALE);

    this.width = document.getElementById('chartline').offsetWidth - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;

    // this.x0.domain(data.map(function(d) { return d.State; }));

    this.xScale = d3.scaleBand()
    .rangeRound([0, this.width])
    .domain(this.categories.map(categorie => categorie));
    // .range([0, this.width]);




    this.x1Scale = d3.scaleBand()
    .domain(this.keys)
    .rangeRound([0, this.xScale.bandwidth()]);


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


    this.bar = this.g.selectAll('bars-group')
      .data(PRODUCTSALE)
      .enter()
      .append('g')
      .attr('class', 'serie-bar-group')
      .attr('fill', (d, i) => this.color[i]);

    this.bar.selectAll('rect')
      .data(d => {console.log(d); return d.monthlySales})
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => this.x1Scale() )
      .attr('y', (d) => this.yScale(d.sales) )
      .attr('width', (d) => this.x1Scale.bandwidth())
      .attr('height', (d) => this.height - this.yScale(d.sales) );


  }


  // this.line = d3.line()
  // .curve(d3.curveLinear)
  // .x( (d: any) => this.xScale(d.month) )
  // .y( (d: any) => this.yScale(d.sales) );


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
