import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSigninComponent } from './new-signin.component';

describe('NewSigninComponent', () => {
  let component: NewSigninComponent;
  let fixture: ComponentFixture<NewSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
