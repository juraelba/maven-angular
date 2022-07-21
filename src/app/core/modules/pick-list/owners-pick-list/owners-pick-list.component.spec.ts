import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersPickListComponent } from './owners-pick-list.component';

describe('OwnersPickListComponent', () => {
  let component: OwnersPickListComponent;
  let fixture: ComponentFixture<OwnersPickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnersPickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnersPickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
