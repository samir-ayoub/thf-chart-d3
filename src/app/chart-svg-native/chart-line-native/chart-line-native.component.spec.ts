import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLineNativeComponent } from './chart-line-native.component';

describe('ChartLineNativeComponent', () => {
  let component: ChartLineNativeComponent;
  let fixture: ComponentFixture<ChartLineNativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartLineNativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLineNativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
