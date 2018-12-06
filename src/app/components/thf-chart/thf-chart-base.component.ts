import { EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';

export class ThfChartBaseComponent {

  private _height?: number = 400;

  @Input('t-height') set height(value: number) {
    const number = this.convertToNumber(value);
    this._height = number && number > 0 ? number : 400;
  }

  get height(): number {
    return this._height;
  }

  @Input('t-title') title?: string;

  @Input('series') series;

  @Input('categories') categories?: Array<string>;

  @Input('type') typeChart?: string;

  @Output('t-series-click')
  seriesClick?: EventEmitter<any> = new EventEmitter<any>();

  @Output('t-series-hover')
  seriesHover?: EventEmitter<any> = new EventEmitter<any>();

  onSeriesClick(event: any): void {
    this.seriesClick.emit(event);
  }

  onSeriesHover(event: any): void {
    this.seriesHover.emit(event);
  }

  private convertToNumber(value: number | string): number {
    const number = (typeof value === 'string') ? parseInt(value, null) : value;
    return (number || number === 0) ? number : undefined;
  }

}
