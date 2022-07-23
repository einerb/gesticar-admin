import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLicenseComponent } from './modal-license.component';

describe('ModalLicenseComponent', () => {
  let component: ModalLicenseComponent;
  let fixture: ComponentFixture<ModalLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLicenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
