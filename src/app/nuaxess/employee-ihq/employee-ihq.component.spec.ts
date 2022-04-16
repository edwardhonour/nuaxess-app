import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIHQComponent } from './employee-ihq.component';

describe('EmployeeIHQComponent', () => {
  let component: EmployeeIHQComponent;
  let fixture: ComponentFixture<EmployeeIHQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeIHQComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeIHQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
