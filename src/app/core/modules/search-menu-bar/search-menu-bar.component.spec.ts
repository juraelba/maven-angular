import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMenuBarComponent } from './search-menu-bar.component';

describe('SearchMenuBarComponent', () => {
  let component: SearchMenuBarComponent;
  let fixture: ComponentFixture<SearchMenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMenuBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
