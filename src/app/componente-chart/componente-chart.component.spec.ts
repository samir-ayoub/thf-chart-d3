import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteChartComponent } from './componente-chart.component';

describe('ComponenteChartComponent', () => {
  let component: ComponenteChartComponent;
  let fixture: ComponentFixture<ComponenteChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
