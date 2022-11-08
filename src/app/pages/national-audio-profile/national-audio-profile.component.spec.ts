import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalAudioProfileComponent } from './national-audio-profile.component';

describe('NationalAudioProfileComponent', () => {
  let component: NationalAudioProfileComponent;
  let fixture: ComponentFixture<NationalAudioProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalAudioProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationalAudioProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
