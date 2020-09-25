import { TestBed } from '@angular/core/testing';

import { GlobVarsService } from './glob-vars.service';

describe('GlobVarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobVarsService = TestBed.get(GlobVarsService);
    expect(service).toBeTruthy();
  });
});
