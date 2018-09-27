import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})
export class ChartPieComponent implements OnInit {
  arc;
  data;
  g;
  pie;
  color = ['#f44842', '#f4b841', '#f4f141', '#46f441', '#41f4d9', '#4941f4', '#f441d6'];
  margin = { top: 32, right: 16, bottom: 56, left: 64 };
  radius;
  svg;
  label;
  width;
  height;
  pathArea;
  path;


  constructor() {

  }

  ngOnInit() {
    this.data = [
      { city: 'Deesa', beautifulRatio: 30 },
      { city: 'Patan', beautifulRatio: 20 },
      { city: 'Ahmedabad', beautifulRatio: 15 },
      { city: 'Bhabhar', beautifulRatio: 35 },
      { city: 'BHakhasar', beautifulRatio: 50 }];

    this.width = document.getElementById('chartline').offsetWidth - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;

    this.path = d3.arc()
      .outerRadius(this.radius - 20)
      .innerRadius(0)
      .cornerRadius(5);

    this.svg = d3.select('.svg').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + (this.width / 2) + ',' + (this.height / 2) + ')');


    this.pie = d3.pie().sort(null).value(function (d: any) { return d.beautifulRatio; });

    this.arc = this.g.selectAll('.arc')
      .data(this.pie(this.data))
      .enter().append('g')
      .classed('arc', true);

    this.label = d3.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);


    this.drawPath();

    this.drawLabels();
  }

  drawPath() {
    const color = this.color;
    this.pathArea = this.arc.append('path')
      .attr('d', this.path)
      .attr('id', function (d, i) {
        return 'arc-' + i;
      })
      .attr('style', 'fill-opacity: 0.85;')
      .attr('fill', function (d, i) {
        return color[i];
      })
      .attr('data', function (d) {
        d.data['percentage'] = (d.endAngle - d.startAngle) / (2 * Math.PI) * 100;
        return JSON.stringify(d.data);
      });

  }

  drawLabels() {


    this.arc.append('text')
        .data(this.data)
        .attr('transform', function(d) {
          let centroid = this.arc.centroid(d);
          console.log(centroid);
            d3.select(this)
            .attr('x', centroid[0])
            .attr('y', centroid[1])
            .attr('dy', '0.33em')
            .text(d.label);
        })
        .attr('dy', '0.35em')
        .text(function(d) {
            return d.beautifulRatio;
        });
  }

}

// d3.select('g')
// 	.selectAll('text')
// 	.data(arcData)
// 	.enter()
// 	.append('text')
// 	.each(function(d) {
// 		var centroid = arcGenerator.centroid(d);
// 		d3.select(this)
// 			.attr('x', centroid[0])
// 			.attr('y', centroid[1])
// 			.attr('dy', '0.33em')
// 			.text(d.label);