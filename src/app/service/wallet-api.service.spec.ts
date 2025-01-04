import { TestBed } from '@angular/core/testing';

import { WalletService } from './wallet-api.service';

describe('WalletApiService', () => {
  let service: WalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
