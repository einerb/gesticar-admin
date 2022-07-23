import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignAdminComponent } from './modal-assign-admin.component';

describe('ModalAssignAdminComponent', () => {
  let component: ModalAssignAdminComponent;
  let fixture: ComponentFixture<ModalAssignAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAssignAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAssignAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
