import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBroadcastEmailComponent } from './send-broadcast-email.component';

describe('SendBroadcastEmailComponent', () => {
  let component: SendBroadcastEmailComponent;
  let fixture: ComponentFixture<SendBroadcastEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendBroadcastEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendBroadcastEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
