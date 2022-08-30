import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastNetworksComponent } from './broadcast-networks.component';

describe('BroadcastNetworksComponent', () => {
  let component: BroadcastNetworksComponent;
  let fixture: ComponentFixture<BroadcastNetworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastNetworksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BroadcastNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
