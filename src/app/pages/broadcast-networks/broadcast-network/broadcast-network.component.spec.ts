import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastNetworkComponent } from './broadcast-network.component';

describe('BroadcastNetworkComponent', () => {
  let component: BroadcastNetworkComponent;
  let fixture: ComponentFixture<BroadcastNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BroadcastNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
