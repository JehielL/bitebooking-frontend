import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotRestaurantComponent } from './not-restaurant.component';

describe('NotRestaurantComponent', () => {
  let component: NotRestaurantComponent;
  let fixture: ComponentFixture<NotRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotRestaurantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
