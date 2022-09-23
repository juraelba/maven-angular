import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotRadioMediaProfileComponent } from './spot-radio-media-profile.component';

describe('SpotRadioMediaProfileComponent', () => {
  let component: SpotRadioMediaProfileComponent;
  let fixture: ComponentFixture<SpotRadioMediaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotRadioMediaProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotRadioMediaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
