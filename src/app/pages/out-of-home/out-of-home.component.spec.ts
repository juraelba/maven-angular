import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfHomeComponent } from './out-of-home.component';

describe('OutOfHomeComponent', () => {
  let component: OutOfHomeComponent;
  let fixture: ComponentFixture<OutOfHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutOfHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutOfHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
