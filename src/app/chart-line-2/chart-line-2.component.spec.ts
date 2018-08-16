import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLine2Component } from './chart-line-2.component';

describe('ChartLine2Component', () => {
  let component: ChartLine2Component;
  let fixture: ComponentFixture<ChartLine2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartLine2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLine2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
