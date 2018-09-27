import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})
export class ChartPieComponent implements OnInit {

  arc;
  path;
  arcc;
  color;
  data;
  g;
  height;
  label;
  margin = { top: 32, right: 16, bottom: 56, left: 64 };
  pie;
  svg;
  width;
  radius;

  constructor() { }

  ngOnInit() {
    this.data = [
      {name: "USA", valor: 60},
      {name: "UK", valor: 20},
      {name: "Canada", valor: 30},
      {name: "Maxico", valor: 15},
      {name: "Japan", valor: 10},
    ];

    this.initChart();

  }

  initChart() {
    this.width = document.getElementById('chartline').offsetWidth - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;

    this.color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888"]);


    this.path = d3.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);

    this.label = d3.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);

    this.pie = d3.pie().sort(null).value(function(d: any) { return d.valor; });


    this.svg = d3.select('.svg').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)

    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + (this.width / 2) + ',' + (this.height / 2) + ')');



    this.arc = this.g.selectAll(".arc")
      .data(this.pie(this.data))
      .enter().append("g")
      .attr("class", "arc");

    this.arc.append("path")
      .attr("d", this.path)
      .attr("fill", function(d) { return this.color(d.data)});

    this.arc.append("text")
      .attr("transform", function (d) { return "translate(" + this.label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function (d) { return d.name; });
  }



  // this.g = this.svg.append('g').attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

  // this.g.append('g')
  //   .selectAll(".arc")
  //   .data(this.pie(this.data))
  //   .enter().append("g")
  //   .attr("class", "arc");

  // this.g.append("path")
  //   .attr("d", this.arc)
  //   .style("fill", function (d) { return this.color(d.data); });

  // this.g.append("text")
  //   .attr("transform", function (d) { return "translate(" + this.labelArc.centroid(d) + ")"; })
  //   .attr("dy", ".35em")
  //   .text(function (d) { return d.data; });

  // this.xScale = d3.scalePoint()
  // .domain(this.xScaleData.map(categorie => {return categorie}))
  //     .range([0, this.width]);

  // this.yScale = d3.scaleLinear()
  // .domain([0, this.getCategorieMaxValue()])
  // .range([this.height, 0]);

  // this.line = d3Shape.line()
  // .curve(d3.curveLinear)
  // .x( (d: any) => this.xScale(d.month) )
  // .y( (d: any) => this.yScale(d.sales) );

  // this.svg = d3.select('.svg').append('svg')
  //   .attr('width', this.width + this.margin.left + this.margin.right)
  //   .attr('height', this.height + this.margin.top + this.margin.bottom)

  // this.g = this.svg.append('g').attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
}

