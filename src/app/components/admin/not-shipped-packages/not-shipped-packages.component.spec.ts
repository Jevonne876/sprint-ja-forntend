import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotShippedPackagesComponent } from './not-shipped-packages.component';

describe('NotShippedPackagesComponent', () => {
  let component: NotShippedPackagesComponent;
  let fixture: ComponentFixture<NotShippedPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotShippedPackagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotShippedPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
