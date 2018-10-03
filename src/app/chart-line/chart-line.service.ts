import { Injectable } from '@angular/core';

@Injectable()
export class ChartLineService {

  series = [
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

  getCategoriesMonth(): Array<string> {
    return [ 'Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  getCategoriesYears(): Array<string> {
    return [ '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
  }

  getData(): Array<any> {
    return [
      { name: 'Video Game',
        monthlySales: [
          {month: 'Jan', sales: 100},
          {month: 'Fev', sales: 232},
          {month: 'Mar', sales: 300},
          {month: 'Abr', sales: 250},
          {month: 'Mai', sales: 480},
          {month: 'Jun', sales: 600},
          {month: 'Jul', sales: 413},
          {month: 'Ago', sales: 510},
          {month: 'Set', sales: 700},
          {month: 'Out', sales: 860},
          {month: 'Nov', sales: 750},
          {month: 'Dec', sales: 890},
        ]
      },
      { name: 'Notebook',
        monthlySales: [
          {month: 'Jan', sales: 16},
          {month: 'Fev', sales: 19},
          {month: 'Mar', sales: 25},
          {month: 'Abr', sales: 35},
          {month: 'Mai', sales: 27},
          {month: 'Jun', sales: 22},
          {month: 'Jul', sales: 29},
          {month: 'Ago', sales: 30},
          {month: 'Set', sales: 42},
          {month: 'Out', sales: 55},
          {month: 'Nov', sales: 60},
          {month: 'Dec', sales: 53},
        ]
      },
      { name: 'Cellphone',
        monthlySales: [
          {month: 'Jan', sales: 35},
          {month: 'Fev', sales: 72},
          {month: 'Mar', sales: 120},
          {month: 'Abr', sales: 150},
          {month: 'Mai', sales: 110},
          {month: 'Jun', sales: 122},
          {month: 'Jul', sales: 135},
          {month: 'Ago', sales: 200},
          {month: 'Set', sales: 220},
          {month: 'Out', sales: 210},
          {month: 'Nov', sales: 210},
          {month: 'Dec', sales: 215},
        ]
      },
      { name: 'Tablet',
        monthlySales: [
          {month: 'Jan', sales: 100},
          {month: 'Fev', sales: 130},
          {month: 'Mar', sales: 135},
          {month: 'Abr', sales: 150},
          {month: 'Mai', sales: 170},
          {month: 'Jun', sales: 165},
          {month: 'Jul', sales: 180},
          {month: 'Ago', sales: 200},
          {month: 'Set', sales: 220},
          {month: 'Out', sales: 150},
          {month: 'Nov', sales: 135},
          {month: 'Dec', sales: 100},
        ]
      }
    ];
  }

  getSeriesMonth(): Array<any> {
    return [
      { name: 'Video Game', data: [100, 232, 300, 250, 480, 600, 413, 510, 700, 860, 750, 890 ] },
      { name: 'Notebook', data: [16, 19, 25, 35, 27, 22, 29, 30, 42, 55, 60, 53] },
      { name: 'Cellphone', data: [35, 72, 120, 150, 110, 122, 135, 200, 220, 210, 210, 210] },
      { name: 'Tablet', data: [100, 130, 135, 150, 170, 165, 180, 200, 220, 150, 135, 100] }
    ];
  }

  getSeriesYears(): Array<any> {
    return [
      { name: 'Video Game', data: [140, 164, 174, 185, 197, 220, 180, 172] },
      { name: 'Notebook', data: [16, 19, 25, 35, 27, 22, 29, 30] },
      { name: 'Cellphone', data: [35, 72, 120, 150, 110, 122, 135, 200] },
      { name: 'Tablet', data: [100, 130, 135, 150, 170, 165, 180, 200] }
    ];
  }

  constructor() { }

}
