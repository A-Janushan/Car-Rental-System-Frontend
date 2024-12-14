import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsComponent } from './rentals.component';

describe('RentalsComponent', () => {
  let component: RentalsComponent;
  let fixture: ComponentFixture<RentalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalsComponent]
    });
    fixture = TestBed.createComponent(RentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
