import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatsPickListComponent } from './formats-pick-list.component';

describe('FormatsPickListComponent', () => {
  let component: FormatsPickListComponent;
  let fixture: ComponentFixture<FormatsPickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatsPickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatsPickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
