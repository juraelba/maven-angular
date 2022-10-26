import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfHomeMediaProfileComponent } from './out-of-home-media-profile.component';

describe('OutOfHomeMediaProfileComponent', () => {
  let component: OutOfHomeMediaProfileComponent;
  let fixture: ComponentFixture<OutOfHomeMediaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutOfHomeMediaProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutOfHomeMediaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
