import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalDisclaimerComponent } from './legal-disclaimer.component';

describe('LegalDisclaimerComponent', () => {
  let component: LegalDisclaimerComponent;
  let fixture: ComponentFixture<LegalDisclaimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalDisclaimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalDisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
