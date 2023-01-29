import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewPreAlertsComponent } from './user-view-pre-alerts.component';

describe('UserViewPreAlertsComponent', () => {
  let component: UserViewPreAlertsComponent;
  let fixture: ComponentFixture<UserViewPreAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewPreAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewPreAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
