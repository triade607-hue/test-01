import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReferenceComponent } from './product-reference.component';

describe('ProductReferenceComponent', () => {
  let component: ProductReferenceComponent;
  let fixture: ComponentFixture<ProductReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductReferenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
