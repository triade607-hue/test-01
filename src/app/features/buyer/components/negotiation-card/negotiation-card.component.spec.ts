import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiationCardComponent } from './negotiation-card.component';

describe('NegotiationCardComponent', () => {
  let component: NegotiationCardComponent;
  let fixture: ComponentFixture<NegotiationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NegotiationCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegotiationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
