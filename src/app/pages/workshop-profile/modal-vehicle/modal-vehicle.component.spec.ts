import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVehicleComponent } from './modal-vehicle.component';

describe('ModalVehicleComponent', () => {
  let component: ModalVehicleComponent;
  let fixture: ComponentFixture<ModalVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
