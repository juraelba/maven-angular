import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnAutoFilterComponent } from './column-auto-filter.component';

describe('ColumnAutoFilterComponent', () => {
  let component: ColumnAutoFilterComponent;
  let fixture: ComponentFixture<ColumnAutoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnAutoFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnAutoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
