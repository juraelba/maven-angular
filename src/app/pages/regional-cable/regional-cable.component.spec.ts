import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalCableComponent } from './regional-cable.component';

describe('RegionalCableComponent', () => {
  let component: RegionalCableComponent;
  let fixture: ComponentFixture<RegionalCableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionalCableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionalCableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
