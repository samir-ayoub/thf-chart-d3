import { Component, OnInit, HostListener } from '@angular/core';

import { ChartLineService } from './chart-line.service';
import { ThfChartColors } from './../commons/thf-chart-colors';

import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.css'],
  providers: [ChartLineService]
})
export class ChartLineComponent implements OnInit {
  
  categories;
  series;
  margin = { top: 32, right: 16, bottom: 56, left: 64 };
  height;
  width;
  xScale;
  yScale;
  g;
  svg;
  xAxis;
  yAxis;
  line;
  dots;
  data;
  color;

  xScaleData;

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      d3.select('svg').remove();

      this.initChart();
      this.drawAxis();
      this.drawLines();
      // this.drawDots();
  }

  constructor(private chartLineService: ChartLineService) {}

  ngOnInit() {
    this.data = this.chartLineService.getData()
    this.color = this.setColor();
    
    this.xScaleData = this.data.map(serie => serie.monthlySales.map(data => data.month))[0];

    this.initChart();
    this.drawAxis();
    this.drawLines();
    // this.drawDots();

  }

  initChart() {
    this.width = document.getElementById('chartline').offsetWidth - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;

    this.xScale = d3.scalePoint()
    .domain(this.xScaleData.map(data => {return data}))
    .range([0, this.width]);

    this.yScale = d3.scaleLinear()
    .domain([0, this.getCategorieMaxValue()])
    .range([this.height, 0]);

    this.line = d3Shape.line()
    .curve(d3.curveLinear)
    .x( (d: any) => this.xScale(d.month) )
    .y( (d: any) => this.yScale(d.sales) );

    this.svg = d3.select('#chartline').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)

    this.g = this.svg.append('g').attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  private drawAxis() {

    this.xAxis = this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3Axis.axisBottom(this.xScale)
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
    let serieLineItem = this.g.selectAll('.serie-line-item')
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

    this.color.map((color, i) => {
      console.log(color);
      serieLineItem.append('g').selectAll('circle')
      .data(d => d.monthlySales)
      .enter()
      .append('circle')
      .attr('cx', dd => this.xScale(dd.month))
      .attr('cy', dd =>  this.yScale(dd.sales))
      .attr('r', '5')
      .attr('fill', '#ffffff')
      .attr('stroke', color)
      .attr('stroke-width', 2)
    })

  }


  // private drawDots() {

  //   console.log(this.data)
  //   let serieLineDotItem = this.g.selectAll('.dot')
  //     .data(this.data)
  //     .enter()
  //     .append('g')
  //     .attr('class', 'serie-line-dot-item');

  //   serieLineDotItem.append('circle')
  //     .attr('cx', '30')
  //     .attr('cy', '30')

      // .attr('cx', serieItem => serieItem.monthlySales.map(month => this.xScale(month.month) )  )
      // .attr('cy', serieItem => serieItem.monthlySales.map(month => this.xScale(month.sales) )  )



    // serieLineDotItem.append('circle')
    //   .attr('cx', (d: any) => this.xScale(d.monthlySales.month))
    //   .attr('cy', (d: any) => this.yScale(d.monthlySales.sales))
    //   .attr('r', '5')
    //   .attr('fill', '#ffffff')
    
    
    // .attr('stroke', this.color[i])
    // .attr('stroke-width', 2)
    // .on('mouseover', d => {
    //   // d3.select(this.).attr('r', 10).style('fill', 'red');
    //   this.tooltip.transition()
    //     .duration(200)
    //     .style('opacity', .9);
    //   this.tooltip.html(d.dataX)
    //     .style('left', this.xScale(d.dataY) + this.margin.left - 12 + 'px')
    //     .style('top', this.yScale(d.dataX) - 12 + 'px');
    //   })
    // .on('mouseout', () => {
    //   this.tooltip.transition()
    //     .duration(500)
    //     .style('opacity', 0);
    //   });
  




  setColor() {
    if (this.data) {
      let index = this.data.length - 1;

      index = index >= 12 ? 11 : index;
      return ThfChartColors[index];
    }

    return ThfChartColors[11];
  }
    




    // this.valueLine = d3.line()
    // .x((d:any) => this.xScale(d.dataY))
    // .y((d:any) => this.yScale(d.dataX))
    // .curve(d3.curveLinear);

    // this.line = this.svg
    // .append('g')
    // .attr('class', 'line-item')
    // .append('path')
    // .attr('d', this.valueLine(serieData))
    // .attr('stroke', this.color[i])
    // .attr('stroke-width', 2)
    // .attr('fill', 'none');

    // this.buildDots(serieData, i);

  

//   private drawPath(): void {
//     let city = this.g.selectAll('.city')
//         .data(TEMPERATURES)
//         .enter().append('g')
//         .attr('class', 'city');

//     city.append('path')
//         .attr('class', 'line')
//         .attr('d', (d) => this.line(d.values) )
//         .style('stroke', (d) => this.z(d.id) );

//     city.append('text')
//         .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
//         .attr('transform', (d) => 'translate(' + this.x(d.value.date) + ',' + this.y(d.value.temperature) + ')' )
//         .attr('x', 3)
//         .attr('dy', '0.35em')
//         .style('font', '10px sans-serif')
//         .text(function(d) { return d.id; });
// }


  private getCategorieMaxValue(): number {
    let maxX = 0;

    this.data.map(serie => {
      serie.monthlySales.filter(monthData => {
        return maxX = monthData.sales >= maxX ? monthData.sales : maxX;
      });
    });
    return maxX;
  };

}
