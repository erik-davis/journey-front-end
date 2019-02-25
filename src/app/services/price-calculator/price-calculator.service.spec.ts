import { TestBed } from '@angular/core/testing';

import { PriceCalculatorService } from './price-calculator.service';

describe('PriceCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceCalculatorService = TestBed.get(PriceCalculatorService);
    expect(service).toBeTruthy();
  });
});
