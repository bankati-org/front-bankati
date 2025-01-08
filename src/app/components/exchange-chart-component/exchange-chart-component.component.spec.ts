import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeChartComponent } from './exchange-chart-component.component';

describe('ExchangeChartComponent', () => {
  let component: ExchangeChartComponent;
  let fixture: ComponentFixture<ExchangeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
