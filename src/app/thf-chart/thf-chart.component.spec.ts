import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThfChartComponent } from './thf-chart.component';

describe('ThfChartComponent', () => {
  let component: ThfChartComponent;
  let fixture: ComponentFixture<ThfChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThfChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThfChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
