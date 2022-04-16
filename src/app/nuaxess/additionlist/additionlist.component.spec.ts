import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionlistComponent } from './additionlist.component';

describe('AdditionlistComponent', () => {
  let component: AdditionlistComponent;
  let fixture: ComponentFixture<AdditionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
