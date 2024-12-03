import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRequestsComponent } from './car-requests.component';

describe('CarRequestsComponent', () => {
  let component: CarRequestsComponent;
  let fixture: ComponentFixture<CarRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
