import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAdditionsComponent } from './current-additions.component';

describe('CurrentAdditionsComponent', () => {
  let component: CurrentAdditionsComponent;
  let fixture: ComponentFixture<CurrentAdditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentAdditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentAdditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
