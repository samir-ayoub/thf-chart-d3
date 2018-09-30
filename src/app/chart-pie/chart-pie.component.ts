import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { setColor } from '../commons/utils'

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})
export class ChartPieComponent implements OnInit {

  arc;
  categories;
  color;
  data;
  g;
  height;
  legend;
  label;
  labelArc;
  margin = { top: 16, right: 16, bottom: 16, left: 16 };
  path;
  pie;
  pieChart;
  radius;
  svg;
  width;

  constructor() { }

  ngOnInit() {
    this.initChart();
    this.drawPath();
    // this.drawLabels();
    this.drawLegend();
  }

  initChart() {
    this.categories = ['Sudeste', 'Sul', 'Nordeste,', 'Centro-Oeste', 'Norte'];
    this.data = [39, 26, 17, 11, 7];

    this.color = setColor(this.data);

    this.width = document.getElementById('chartline').offsetWidth - this.margin.left - this.margin.right;
    this.height = 300;
    this.radius = Math.min(this.width, this.height) / 2;

    this.path = d3.arc()
      .outerRadius(this.radius - 20)
      .innerRadius(0);

    this.labelArc = d3.arc()
      .outerRadius(this.radius)
      .innerRadius(0);

    this.pie = d3.pie().sort(null).value(function (d: any) { return d; });

    this.svg = d3.select('.svg').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height);

    this.pieChart = this.svg.append('g')
      .attr('transform', 'translate(' + ((this.width + this.margin.left + this.margin.right) / 2) + ',' + ((this.height) / 2) + ')');
  }

  drawPath() {
    const color = this.color;
    const tooltip = d3.select('.tooltip');

    this.pieChart.selectAll('path')
      .data(this.pie(this.data))
      .enter()
      .append('path')
      .attr('d', this.path)
      .attr('id', function (d, i) {
        return 'arc-' + i;
      })
      .attr('fill', function (d, i) {
        return color[i];
      })
      .on('mouseover', (d, i) => {
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        tooltip.html(d.data)
          .style('left', `${(document.getElementById('chartline').offsetWidth - 60) / 2}px`)
          .style('top', `-32px`)
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      })
  }

  drawLabels() {
    this.pieChart.selectAll('text')
      .data(this.pie(this.data))
      .enter()
      .append("text")
      .attr('transform', (d) => 'translate(' + this.labelArc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text(function (d) { return d.data; });
  }

  drawLegend() {
    this.legend = d3.select('.legend');

    this.legend.selectAll('legend')
      .data(this.categories)
      .enter()
      .append('div')
      .attr('class', 'legend-item')
      .each((d, i, n) => {
        const color = this.color;
        const p = d3.select(n[i]);

        p.append('span')
          .attr('class', 'key-square')
          .style('background-color', color[i]);

        p.append('p')
          .attr('class', 'legend-text')
          .text(d);
      });
  }

}
