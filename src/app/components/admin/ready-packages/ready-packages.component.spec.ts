import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyPackagesComponent } from './ready-packages.component';

describe('ReadyPackagesComponent', () => {
  let component: ReadyPackagesComponent;
  let fixture: ComponentFixture<ReadyPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyPackagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
