import { Component, OnInit, AfterContentInit } from '@angular/core';

import * as d3 from 'd3';

import { ThfChartColors } from './../../commons/utils';
import { ChartLineService } from './chart-line.service';

@Component({
  selector: 'app-chart-line-2',
  templateUrl: './chart-line-2.component.html',
  styleUrls: ['./chart-line-2.component.css'],
  providers: [ChartLineService]
})
export class ChartLine2Component implements OnInit, AfterContentInit {

  categories;
  series;


  height;
  width;
  labels;
  legend;
  line;
  valueLine;
  dots;
  margin;
  svg;
  viz;
  viz2;
  totalValue = 0;
  xScale;
  yScale;
  xAxisGen; // D3 X Axis
  xAxis;
  yAxisGen; // D3 Y Axis
  yAxis;
  tooltip;
  formatTime = d3.timeFormat('%e %B');
  color;

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

  constructor(private chartLineService: ChartLineService) { }

  ngOnInit() {
    this.categories = this.chartLineService.getCategoriesMonth();
    this.series = this.chartLineService.getSeriesMonth();
  }

  ngAfterContentInit() {
    this.createSvg();
  }

  private createSvg() {
    this.setup();
    this.svgBuild();
  }

  private svgBuild() {
    this.buildSvg();
    this.buildAxis();
    this.buildTooltip();
    this.buildLegend();
    this.checkingSeriesAmountToBuildDotsAndLines();
  }

  private checkingSeriesAmountToBuildDotsAndLines() {
    this.series.map((serie, i) => {
      let serieLineValues = [];
      serie.data.map((dataItem, i) => {
        serieLineValues.push({dataX: serie.data[i], dataY: this.categories[i]});
      });
      this.buildLine(serieLineValues, i);
    });
  }
  
  private buildLine(serieData, i) {
    this.valueLine = d3.line()
    .x((d:any) => this.xScale(d.dataY))
    .y((d:any) => this.yScale(d.dataX))
    .curve(d3.curveLinear);

    this.line = this.svg
    .append('g')
    .attr('class', 'line-item')
    .append('path')
    .attr('d', this.valueLine(serieData))
    .attr('stroke', this.color[i])
    .attr('stroke-width', 2)
    .attr('fill', 'none');

    this.buildDots(serieData, i);

  }

  private getCategorieMaxValue(): number {
    let maxX = 0;

    this.series.filter(serie => {
      serie.data.filter(dataNumber => {
        return maxX = dataNumber >= maxX ? dataNumber : maxX;
      });
    });
    return maxX;
  };

  private setup() {
    this.margin = { top: 32, right: 16, bottom: 56, left: 64 };
    this.width = document.getElementById('chartline').offsetWidth - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;

    this.color = this.setColor();

    this.xScale = d3.scalePoint()
    .domain(this.categories.map(categorie => {return categorie}))
    .range([0, this.width]);

    this.yScale = d3.scaleLinear()
    .domain([0, this.getCategorieMaxValue()])
    .range([this.height, 0]);
  }

  private buildSvg() {
        this.svg = d3.select('#chartline')
        .append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr('class', 'svg-element')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  private buildAxis() {
    this.xAxisGen = d3.axisBottom(this.xScale)
    .ticks(this.monthimports.length)
    .tickSize(-this.height);

    this.xAxis = this.svg.append('g')
      .call(this.xAxisGen)
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${this.height})`)
      .selectAll('text')
      .attr('x', -10)
      .attr('y', 15)
      .style('text-anchor', 'start');

    this.yAxisGen = d3.axisLeft(this.yScale)
      .ticks(4)
      .tickSize(-this.width);

    this.yAxis = this.svg.append('g')
      .call(this.yAxisGen)
      .attr('class', 'axis axis--y')
      .selectAll('text')
      .attr('x', - 40)
      .attr('y', 0)
      .style('text-anchor', 'start');
  }

  private buildDots(serieData, i) {
    this.dots = this.svg
    .append('g')
    .selectAll('.dot')
    .data(serieData)
    .enter()
    .append('circle')
    .attr('cx', (d: any) => this.xScale(d.dataY))
    .attr('cy', (d: any) => this.yScale(d.dataX))
    .attr('r', '5')
    .attr('fill', '#ffffff')
    .attr('stroke', this.color[i])
    .attr('stroke-width', 2)
    .on('mouseover', d => {
      // d3.select(this.).attr('r', 10).style('fill', 'red');
      this.tooltip.transition()
        .duration(200)
        .style('opacity', .9);
      this.tooltip.html(d.dataX)
        .style('left', this.xScale(d.dataY) + this.margin.left - 12 + 'px')
        .style('top', this.yScale(d.dataX) - 12 + 'px');
      })
    .on('mouseout', () => {
      this.tooltip.transition()
        .duration(500)
        .style('opacity', 0);
      });
  }

  private buildTooltip() {
    this.tooltip = d3.select('#chartline').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);
  }

  private buildLegend() {
    this.legend = d3.select('#chartline').append('div')
      .attr('class', 'legend');

    this.legend.selectAll('legend')
    .data(this.series)
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
    if (this.series) {
      let index = this.series.length - 1;

      index = index >= 12 ? 11 : index;
      return ThfChartColors[index];
    }

    return ThfChartColors[11];
}




}


// if (this.series) {
//   const chart = this.typeChart;
//   let index = this.series.length - 1;

//   if (chart === 'donut' || chart === 'funnel' || chart === 'pie') {
//     // Caso for donut, funnel ou pie utiliza a propriedade data para recuperar o index.
//     const dataSeries = this.series[index].data;
//     const dataSerieIndex = dataSeries.length - 1;

//     return ThfChartColors[dataSerieIndex];
//   }

//   // Caso houver 12 ou mais series define o index como 11.
//   index = index >= 12 ? 11 : index;
//   return ThfChartColors[index];
// }

// return ThfChartColors[11];
// }