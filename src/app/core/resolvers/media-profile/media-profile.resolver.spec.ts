import { TestBed } from '@angular/core/testing';

import { MediaProfileResolver } from './media-profile.resolver';

describe('MediaProfileResolver', () => {
  let resolver: MediaProfileResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MediaProfileResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
