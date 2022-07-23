import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewWorkshopComponent } from './modal-new-workshop.component';

describe('ModalNewWorkshopComponent', () => {
  let component: ModalNewWorkshopComponent;
  let fixture: ComponentFixture<ModalNewWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewWorkshopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
