import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBar2Component } from './chart-bar2.component';

describe('ChartBar2Component', () => {
  let component: ChartBar2Component;
  let fixture: ComponentFixture<ChartBar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartBar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
