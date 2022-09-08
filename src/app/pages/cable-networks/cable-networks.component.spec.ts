import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CableNetworksComponent } from './cable-networks.component';

describe('CableNetworksComponent', () => {
  let component: CableNetworksComponent;
  let fixture: ComponentFixture<CableNetworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CableNetworksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CableNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
