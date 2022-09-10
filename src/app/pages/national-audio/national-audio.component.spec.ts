import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalAudioComponent } from './national-audio.component';

describe('NationalAudioComponent', () => {
  let component: NationalAudioComponent;
  let fixture: ComponentFixture<NationalAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalAudioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationalAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
