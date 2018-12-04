import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieNativeComponent } from './chart-pie-native.component';

describe('ChartPieNativeComponent', () => {
  let component: ChartPieNativeComponent;
  let fixture: ComponentFixture<ChartPieNativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPieNativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPieNativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
