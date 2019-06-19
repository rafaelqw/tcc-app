import { TestBed } from '@angular/core/testing';

import { SensoresService } from './sensores.service';

describe('SensoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensoresService = TestBed.get(SensoresService);
    expect(service).toBeTruthy();
  });
});
