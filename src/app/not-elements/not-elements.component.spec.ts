import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotElementsComponent } from './not-elements.component';

describe('NotElementsComponent', () => {
  let component: NotElementsComponent;
  let fixture: ComponentFixture<NotElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotElementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
