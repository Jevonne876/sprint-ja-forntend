import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateNewPreAlertsComponent } from './admin-create-new-pre-alerts.component';

describe('AdminCreateNewPreAlertsComponent', () => {
  let component: AdminCreateNewPreAlertsComponent;
  let fixture: ComponentFixture<AdminCreateNewPreAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateNewPreAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateNewPreAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
