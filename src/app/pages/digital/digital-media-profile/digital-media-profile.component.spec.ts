import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalMediaProfileComponent } from './digital-media-profile.component';

describe('DigitalMediaProfileComponent', () => {
  let component: DigitalMediaProfileComponent;
  let fixture: ComponentFixture<DigitalMediaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalMediaProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalMediaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
