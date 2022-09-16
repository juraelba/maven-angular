import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiverseComponent } from './diverse.component';

describe('DiverseComponent', () => {
  let component: DiverseComponent;
  let fixture: ComponentFixture<DiverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiverseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
