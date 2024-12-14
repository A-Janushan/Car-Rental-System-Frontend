import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCarComponent } from './rent-car.component';

describe('RentCarComponent', () => {
  let component: RentCarComponent;
  let fixture: ComponentFixture<RentCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentCarComponent]
    });
    fixture = TestBed.createComponent(RentCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
