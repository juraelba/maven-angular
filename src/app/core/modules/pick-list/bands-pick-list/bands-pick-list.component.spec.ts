import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandsPickListComponent } from './bands-pick-list.component';

describe('BandsPickListComponent', () => {
  let component: BandsPickListComponent;
  let fixture: ComponentFixture<BandsPickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandsPickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandsPickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
