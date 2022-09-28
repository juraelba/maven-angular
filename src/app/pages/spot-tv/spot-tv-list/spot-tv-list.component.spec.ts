import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotTvListComponent } from './spot-tv-list.component';

describe('SpotTvListComponent', () => {
  let component: SpotTvListComponent;
  let fixture: ComponentFixture<SpotTvListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotTvListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotTvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
