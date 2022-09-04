import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotRadioBandsComponent } from './spot-radio-bands.component';

describe('SpotRadioBandsComponent', () => {
  let component: SpotRadioBandsComponent;
  let fixture: ComponentFixture<SpotRadioBandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotRadioBandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotRadioBandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
