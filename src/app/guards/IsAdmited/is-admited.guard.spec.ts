import { TestBed } from '@angular/core/testing';

import { IsAdmitedGuard } from './is-admited.guard';

describe('IsAdmitedGuard', () => {
  let guard: IsAdmitedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAdmitedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
