import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserComponent } from './dashboard-user.component';

describe('DashboardUserComponent', () => {
  let component: DashboardUserComponent;
  let fixture: ComponentFixture<DashboardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
