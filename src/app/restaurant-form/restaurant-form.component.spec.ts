import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFromComponent } from './restaurant-form.component';

describe('RestaurantFromComponent', () => {
  let component: RestaurantFromComponent;
  let fixture: ComponentFixture<RestaurantFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantFromComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
