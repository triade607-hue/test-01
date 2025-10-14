import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAssistanceComponent } from './chat-assistance.component';

describe('ChatAssistanceComponent', () => {
  let component: ChatAssistanceComponent;
  let fixture: ComponentFixture<ChatAssistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAssistanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
