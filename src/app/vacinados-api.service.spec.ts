import { TestBed } from '@angular/core/testing';

import { VacinadosApiService } from './vacinados-api.service';

describe('VacinadosApiService', () => {
  let service: VacinadosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacinadosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
