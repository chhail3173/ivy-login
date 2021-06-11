import { TestBed } from '@angular/core/testing';

import { HookService } from './hook.service';

describe('HookService', () => {
  let service: HookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
