import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotTvComponent } from './spot-tv.component';

describe('SpotTvComponent', () => {
  let component: SpotTvComponent;
  let fixture: ComponentFixture<SpotTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotTvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
