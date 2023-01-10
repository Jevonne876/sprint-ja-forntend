import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedPackagesComponent } from './shipped-packages.component';

describe('ShippedPackagesComponent', () => {
  let component: ShippedPackagesComponent;
  let fixture: ComponentFixture<ShippedPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippedPackagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippedPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
