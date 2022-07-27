import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEventsComponent } from './service-events.component';

describe('ServiceEventsComponent', () => {
  let component: ServiceEventsComponent;
  let fixture: ComponentFixture<ServiceEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
