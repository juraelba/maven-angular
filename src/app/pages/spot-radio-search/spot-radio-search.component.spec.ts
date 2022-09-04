import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotRadioSearchComponent } from './spot-radio-search.component';

describe('SpotRadioSearchComponent', () => {
  let component: SpotRadioSearchComponent;
  let fixture: ComponentFixture<SpotRadioSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotRadioSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotRadioSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
