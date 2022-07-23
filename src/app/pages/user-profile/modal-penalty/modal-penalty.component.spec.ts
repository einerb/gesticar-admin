import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPenaltyComponent } from './modal-penalty.component';

describe('ModalPenaltyComponent', () => {
  let component: ModalPenaltyComponent;
  let fixture: ComponentFixture<ModalPenaltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPenaltyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
