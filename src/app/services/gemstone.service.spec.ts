import { TestBed } from '@angular/core/testing';

import { GemstoneService } from './gemstone.service';

describe('GemstoneService', () => {
  let service: GemstoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GemstoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
