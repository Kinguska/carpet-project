import { TestBed } from '@angular/core/testing';

import { BuyinfoService } from './buyinfo.service';

describe('BuyinfoService', () => {
  let service: BuyinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
