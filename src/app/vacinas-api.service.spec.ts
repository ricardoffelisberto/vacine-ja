import { TestBed } from '@angular/core/testing';

import { VacinasApiService } from './vacinas-api.service';

describe('VacinasApiService', () => {
  let service: VacinasApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacinasApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
