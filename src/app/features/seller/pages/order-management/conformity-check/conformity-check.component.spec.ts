import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformityCheckComponent } from './conformity-check.component';

describe('ConformityCheckComponent', () => {
  let component: ConformityCheckComponent;
  let fixture: ComponentFixture<ConformityCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConformityCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConformityCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
