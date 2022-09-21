import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallHistorySelectComponent } from './call-history-select.component';

describe('CallHistorySelectComponent', () => {
  let component: CallHistorySelectComponent;
  let fixture: ComponentFixture<CallHistorySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallHistorySelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallHistorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
