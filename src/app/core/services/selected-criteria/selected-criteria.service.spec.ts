import { TestBed } from '@angular/core/testing';

import { SelectedCriteriaService } from './selected-criteria.service';

describe('SelectedCriteriaService', () => {
  let service: SelectedCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedCriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
