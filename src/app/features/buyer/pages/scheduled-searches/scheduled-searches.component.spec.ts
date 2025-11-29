import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduledSearchesComponent } from './scheduled-searches.component';


describe('ScheduledSearchesComponent', () => {
  let component: ScheduledSearchesComponent;
  let fixture: ComponentFixture<ScheduledSearchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledSearchesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduledSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
