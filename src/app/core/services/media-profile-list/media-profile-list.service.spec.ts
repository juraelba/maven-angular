import { TestBed } from '@angular/core/testing';

import { MediaProfileListService } from './media-profile-list.service';

describe('MediaProfileListService', () => {
  let service: MediaProfileListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaProfileListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
