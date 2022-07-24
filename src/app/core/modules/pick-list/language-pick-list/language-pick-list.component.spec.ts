import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagePickListComponent } from './language-pick-list.component';

describe('LanguagePickListComponent', () => {
  let component: LanguagePickListComponent;
  let fixture: ComponentFixture<LanguagePickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagePickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagePickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
