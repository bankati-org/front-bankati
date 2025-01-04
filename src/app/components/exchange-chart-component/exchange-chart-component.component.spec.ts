import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeChartComponentComponent } from './exchange-chart-component.component';

describe('ExchangeChartComponentComponent', () => {
  let component: ExchangeChartComponentComponent;
  let fixture: ComponentFixture<ExchangeChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeChartComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
