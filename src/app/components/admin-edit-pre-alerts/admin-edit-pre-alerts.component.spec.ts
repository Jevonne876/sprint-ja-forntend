import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditPreAlertsComponent } from './admin-edit-pre-alerts.component';

describe('AdminEditPreAlertsComponent', () => {
  let component: AdminEditPreAlertsComponent;
  let fixture: ComponentFixture<AdminEditPreAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditPreAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditPreAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
