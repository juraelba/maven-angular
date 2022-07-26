import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPickListComponent } from './market-pick-list.component';

describe('MarketPickListComponent', () => {
  let component: MarketPickListComponent;
  let fixture: ComponentFixture<MarketPickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketPickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketPickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
