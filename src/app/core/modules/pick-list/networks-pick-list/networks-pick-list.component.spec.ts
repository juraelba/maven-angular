import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworksPickListComponent } from './networks-pick-list.component';

describe('NetworksPickListComponent', () => {
  let component: NetworksPickListComponent;
  let fixture: ComponentFixture<NetworksPickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworksPickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworksPickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
