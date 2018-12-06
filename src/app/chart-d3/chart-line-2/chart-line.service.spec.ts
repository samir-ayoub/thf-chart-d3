import { TestBed, inject } from '@angular/core/testing';

import { ChartLineService } from './chart-line.service';

describe('ChartLineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartLineService]
    });
  });

  it('should be created', inject([ChartLineService], (service: ChartLineService) => {
    expect(service).toBeTruthy();
  }));
});
