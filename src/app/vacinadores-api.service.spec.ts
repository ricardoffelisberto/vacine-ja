import { TestBed } from '@angular/core/testing';

import { VacinadoresApiService } from './vacinadores-api.service';

describe('VacinadoresApiService', () => {
  let service: VacinadoresApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacinadoresApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
