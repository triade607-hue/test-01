import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactivateAccountComponent } from './desactivate-account.component';

describe('DesactivateAccountComponent', () => {
  let component: DesactivateAccountComponent;
  let fixture: ComponentFixture<DesactivateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesactivateAccountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesactivateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
