import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPickListComponent } from './category-pick-list.component';

describe('CategoryPickListComponent', () => {
  let component: CategoryPickListComponent;
  let fixture: ComponentFixture<CategoryPickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
