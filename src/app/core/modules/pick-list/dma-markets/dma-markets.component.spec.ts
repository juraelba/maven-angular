import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmaMarketsComponent } from './dma-markets.component';

describe('DmaMarketsComponent', () => {
  let component: DmaMarketsComponent;
  let fixture: ComponentFixture<DmaMarketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmaMarketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmaMarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
