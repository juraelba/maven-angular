import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotRadioListComponent } from './spot-radio-list.component';

describe('SpotRadioListComponent', () => {
  let component: SpotRadioListComponent;
  let fixture: ComponentFixture<SpotRadioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotRadioListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotRadioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
