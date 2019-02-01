import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ThfChartColors } from './../../commons/utils';
import { SvgConfig } from './svg-config.interface';

@Component({
  selector: 'app-chart-line-native',
  templateUrl: './chart-line-native.component.html',
  styleUrls: ['./chart-line-native.component.css']
})
export class ChartLineNativeComponent implements OnInit {

  colors = this.setColor();
  myCanvas;
  data = [[1, 2, 4, 8]];
  svgElement;
  aspect = { x: 2.3, y: 1 };
  svg_ns = 'http://www.w3.org/2000/svg';
  svg_viewBox;
  svg_config: SvgConfig = {};


  dataChartCoords;

  @ViewChild('svgElement') svgWrapper: ElementRef;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.buildGridLine();
    this.initialSetup();
  }


  initialSetup() {
    this.myCanvas = document.getElementById('svgCanvass');
    this.myCanvas.style.height = '300px';

    this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');


    this.svgElement.setAttribute('xmlns', this.svg_ns);
    this.svgElement.setAttribute('viewBox', this.svg_viewBox);
    this.svgElement.setAttribute('height', '100%');
    this.svgElement.setAttribute('width', '100%');
    this.svgElement.setAttribute('fill', 'none');
    this.svgElement.setAttribute('stroke-linecap', 'round');
    this.svgElement.setAttribute('stroke-width', this.svg_config.line_width);
    this.svgElement.classList.add('c-chart');
    this.svgElement.style.height = '100%';
    this.svgElement.style.width = '100%';

    // grid lines
    const grid_border = document.createElementNS(this.svg_ns, 'rect');
    grid_border.classList.add('c-chart__border');
    grid_border.setAttribute('stroke-width', this.svg_config.gridline_width);
    grid_border.setAttribute('x', '0');
    grid_border.setAttribute('y', '0');
    grid_border.setAttribute('width', this.svg_config.max_x);
    grid_border.setAttribute('height', this.svg_config.max_y);
    this.svgElement.appendChild(grid_border);


    // this.svgElement.setAttributeNS(null, 'style', `width: 100%; height: ${this.myCanvas.style.height}`);
    this.myCanvas.appendChild(this.svgElement);
  }




  // svg.setAttribute('xmlns', svg_ns)
  // svg.setAttribute('viewBox', svg_viewBox)
  // svg.setAttribute('height', '100%')
  // svg.setAttribute('width', '100%')
  // svg.setAttribute('fill', 'none')
  // svg.setAttribute('stroke-linecap', 'round')
  // svg.setAttribute('stroke-width', svg_config.line_width)
  // svg.classList.add('c-chart')
  // svg.style.height = '100%'
  // svg.style.width = '100%'
  // // flip this over to make it a real chart
  // svg.style.transform = 'scaleY(-1)'











  svgGridline(pos, svg_config, is_y_axis: false) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.classList.add('c-chart__gridline');
    line.setAttribute('stroke-width', svg_config.gridline_width);
    if (is_y_axis) {
      line.classList.add('c-chart__gridline--y-axis');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', pos);
      line.setAttribute('x2', svg_config.max_x);
      line.setAttribute('y2', pos);
    } else {
      line.classList.add('c-chart__gridline--x-axis');
      line.setAttribute('x1', pos);
      line.setAttribute('y1', '0');
      line.setAttribute('x2', pos);
      line.setAttribute('y2', svg_config.max_y);
    }
    return line;
  }

  buildGridLine() {
    let axis_x_max = 0;
    let axis_y_max = 0;

    this.data.forEach(series => {
      // console.log('series', series);
      const data_y_max = Math.max(...series);
      // console.log('data y max', data_y_max);
      if (data_y_max > axis_y_max) {
        axis_y_max = data_y_max;
      }

      const data_x_max = Math.ceil((axis_y_max / this.aspect.y) * this.aspect.x);
      if (data_x_max > axis_x_max) {
        axis_x_max = data_x_max;
        // console.log('axis_x_max', axis_x_max);

      }

      this.svg_config.max_x = axis_x_max;
      this.svg_config.max_y = axis_y_max;
      this.svg_config.line_width = this.svg_config.max_y * 0.015;
      this.svg_config.point_radius = this.svg_config.line_width * 1.375;
      this.svg_config.gridline_width = this.svg_config.line_width / 2;
      this.svg_config.gridline_y_count = 4;
      this.svg_config.plot_count = this.data[0].length;
      this.svg_config.font_size = '0.5';

      this.svg_viewBox = `0 0 ${this.svg_config.max_x} ${this.svg_config.max_y}`;

      console.log('svg_config', this.svg_config);

      // see if chart has specified x-axis values. need this as a variable
      // because it is used later in calculating data points
      let coords_x: number = this.data[0].length;

      console.log('coords_x', coords_x);

      let coords_x_max = coords_x - 1;
      if (this.dataChartCoords) {
        // coords_x = JSON.parse(this.dataChartCoords);
        // coords_x_max = Math.max(...coords_x) - coords_x[0];
      }
      this.svg_config.spacing_x = this.svg_config.max_x / coords_x_max;


    });
  }









  setColor() {
    return ThfChartColors[5];
  }

}
