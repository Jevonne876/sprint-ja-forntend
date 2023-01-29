import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPackageUserComponent } from './edit-package-user.component';

describe('EditPackageUserComponent', () => {
  let component: EditPackageUserComponent;
  let fixture: ComponentFixture<EditPackageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPackageUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPackageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
