import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFormComponent } from './restaurant-form.component';

describe('RestaurantFromComponent', () => {
  let component: RestaurantFormComponent;
  let fixture: ComponentFixture<RestaurantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
