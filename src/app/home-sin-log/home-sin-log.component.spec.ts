import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSinLogComponent } from './home-sin-log.component';

describe('HomeSinLogComponent', () => {
  let component: HomeSinLogComponent;
  let fixture: ComponentFixture<HomeSinLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSinLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSinLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
