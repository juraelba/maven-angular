import { TestBed } from '@angular/core/testing';

import { MediaProfileService } from './media-profile.service';

describe('MediaProfileService', () => {
  let service: MediaProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
