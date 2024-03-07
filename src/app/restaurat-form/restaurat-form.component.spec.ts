import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauratFormComponent } from './restaurat-form.component';

describe('RestauratFormComponent', () => {
  let component: RestauratFormComponent;
  let fixture: ComponentFixture<RestauratFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestauratFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestauratFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
