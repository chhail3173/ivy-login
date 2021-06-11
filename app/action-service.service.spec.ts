import { TestBed } from '@angular/core/testing';

import { ActionServiceService } from './action-service.service';

describe('ActionServiceService', () => {
  let service: ActionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
