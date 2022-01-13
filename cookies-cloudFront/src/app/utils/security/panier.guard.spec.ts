import { TestBed } from '@angular/core/testing';

import { PanierGuard } from './panier.guard';

describe('PanierGuard', () => {
  let guard: PanierGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PanierGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
