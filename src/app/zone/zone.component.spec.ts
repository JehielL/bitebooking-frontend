import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneComponent } from './zone.component';

describe('ZoneComponent', () => {
  let component: ZoneComponent;
  let fixture: ComponentFixture<ZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
