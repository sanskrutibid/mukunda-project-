import { TestBed } from '@angular/core/testing';

import { VmvService } from './vmv.service';

describe('VmvService', () => {
  let service: VmvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VmvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
