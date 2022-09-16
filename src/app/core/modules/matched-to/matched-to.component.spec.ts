import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedToComponent } from './matched-to.component';

describe('MatchedToComponent', () => {
  let component: MatchedToComponent;
  let fixture: ComponentFixture<MatchedToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchedToComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchedToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
