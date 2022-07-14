import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCriteriaDialogComponent } from './selected-criteria-dialog.component';

describe('SelectedCriteriaDialogComponent', () => {
  let component: SelectedCriteriaDialogComponent;
  let fixture: ComponentFixture<SelectedCriteriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCriteriaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedCriteriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
