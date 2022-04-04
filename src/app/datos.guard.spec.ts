import { TestBed } from '@angular/core/testing';

import { DatosGuard } from './datos.guard';

describe('DatosGuard', () => {
  let guard: DatosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DatosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
