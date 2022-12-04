import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAlertsComponent } from './pre-alerts.component';

describe('PreAlertsComponent', () => {
  let component: PreAlertsComponent;
  let fixture: ComponentFixture<PreAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
