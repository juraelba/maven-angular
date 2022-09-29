import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMediaProfileComponent } from './dynamic-media-profile.component';

describe('DynamicMediaProfileComponent', () => {
  let component: DynamicMediaProfileComponent;
  let fixture: ComponentFixture<DynamicMediaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicMediaProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicMediaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
