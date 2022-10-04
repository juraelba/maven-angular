import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CableNetworkComponent } from './cable-network.component';

describe('CableNetworkComponent', () => {
  let component: CableNetworkComponent;
  let fixture: ComponentFixture<CableNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CableNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CableNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
