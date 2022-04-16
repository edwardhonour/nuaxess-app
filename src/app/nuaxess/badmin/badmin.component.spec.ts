import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadminComponent } from './badmin.component';

describe('BadminComponent', () => {
  let component: BadminComponent;
  let fixture: ComponentFixture<BadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
