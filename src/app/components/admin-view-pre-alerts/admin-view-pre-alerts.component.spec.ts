import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewPreAlertsComponent } from './admin-view-pre-alerts.component';

describe('AdminViewPreAlertsComponent', () => {
  let component: AdminViewPreAlertsComponent;
  let fixture: ComponentFixture<AdminViewPreAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewPreAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewPreAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
