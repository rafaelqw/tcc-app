import { TestBed } from '@angular/core/testing';

import { EmpreendimentosService } from './empreendimentos.service';

describe('EmpreendimentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpreendimentosService = TestBed.get(EmpreendimentosService);
    expect(service).toBeTruthy();
  });
});
