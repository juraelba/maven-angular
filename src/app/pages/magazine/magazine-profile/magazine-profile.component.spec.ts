import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineProfileComponent } from './magazine-profile.component';

describe('MagazineProfileComponent', () => {
  let component: MagazineProfileComponent;
  let fixture: ComponentFixture<MagazineProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagazineProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagazineProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
