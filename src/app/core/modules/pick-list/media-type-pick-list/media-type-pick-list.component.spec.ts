import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTypePickListComponent } from './media-type-pick-list.component';

describe('MediaTypePickListComponent', () => {
  let component: MediaTypePickListComponent;
  let fixture: ComponentFixture<MediaTypePickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaTypePickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaTypePickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
