import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDetailComponent } from './restaurant-detail.component';

describe('RestaurantDetailComponent', () => {
  let component: RestaurantDetailComponent;
  let fixture: ComponentFixture<RestaurantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
