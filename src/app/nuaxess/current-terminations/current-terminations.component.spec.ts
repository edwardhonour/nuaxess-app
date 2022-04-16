import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTerminationsComponent } from './current-terminations.component';

describe('CurrentTerminationsComponent', () => {
  let component: CurrentTerminationsComponent;
  let fixture: ComponentFixture<CurrentTerminationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentTerminationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTerminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
