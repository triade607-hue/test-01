import { TestBed } from '@angular/core/testing';

import { ConformityService } from './conformity.service';

describe('ConformityService', () => {
  let service: ConformityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConformityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
