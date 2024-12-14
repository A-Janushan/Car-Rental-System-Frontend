import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAdminComponent } from './cars-admin.component';

describe('CarsAdminComponent', () => {
  let component: CarsAdminComponent;
  let fixture: ComponentFixture<CarsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarsAdminComponent]
    });
    fixture = TestBed.createComponent(CarsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
