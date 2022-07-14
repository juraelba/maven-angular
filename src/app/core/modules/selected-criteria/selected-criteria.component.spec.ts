import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCriteriaComponent } from './selected-criteria.component';

describe('SelectedCriteriaComponent', () => {
  let component: SelectedCriteriaComponent;
  let fixture: ComponentFixture<SelectedCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
