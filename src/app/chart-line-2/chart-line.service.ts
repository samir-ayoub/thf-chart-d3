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
