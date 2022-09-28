import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotTvMediaProfileComponent } from './spot-tv-media-profile.component';

describe('SpotTvMediaProfileComponent', () => {
  let component: SpotTvMediaProfileComponent;
  let fixture: ComponentFixture<SpotTvMediaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotTvMediaProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotTvMediaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
