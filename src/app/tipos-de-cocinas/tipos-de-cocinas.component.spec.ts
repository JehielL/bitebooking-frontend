import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDeCocinasComponent } from './tipos-de-cocinas.component';

describe('TiposDeCocinasComponent', () => {
  let component: TiposDeCocinasComponent;
  let fixture: ComponentFixture<TiposDeCocinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposDeCocinasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiposDeCocinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
