import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationRequestsComponent } from './donation-requests.component';

describe('DonationRequestsComponent', () => {
  let component: DonationRequestsComponent;
  let fixture: ComponentFixture<DonationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationRequestsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DonationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
