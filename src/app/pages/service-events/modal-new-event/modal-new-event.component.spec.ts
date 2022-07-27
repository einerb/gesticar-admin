import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewEventComponent } from './modal-new-event.component';

describe('ModalNewEventComponent', () => {
  let component: ModalNewEventComponent;
  let fixture: ComponentFixture<ModalNewEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
