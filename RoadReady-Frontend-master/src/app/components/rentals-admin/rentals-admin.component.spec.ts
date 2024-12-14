import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsAdminComponent } from './rentals-admin.component';

describe('RentalsAdminComponent', () => {
  let component: RentalsAdminComponent;
  let fixture: ComponentFixture<RentalsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalsAdminComponent]
    });
    fixture = TestBed.createComponent(RentalsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
