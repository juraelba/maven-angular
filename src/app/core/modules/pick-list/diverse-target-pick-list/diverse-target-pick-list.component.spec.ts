import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiverseTargetPickListComponent } from './diverse-target-pick-list.component';

describe('DiverseTargetPickListComponent', () => {
  let component: DiverseTargetPickListComponent;
  let fixture: ComponentFixture<DiverseTargetPickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiverseTargetPickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiverseTargetPickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
