import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspaperMediaProfileComponent } from './newspaper-media-profile.component';

describe('NewspaperMediaProfileComponent', () => {
  let component: NewspaperMediaProfileComponent;
  let fixture: ComponentFixture<NewspaperMediaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewspaperMediaProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewspaperMediaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
