import { TestBed } from '@angular/core/testing';

import { ExchangeChartComponentService } from './exchange-chart-component.service';

describe('ExchangeChartComponentService', () => {
  let service: ExchangeChartComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeChartComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
