import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCensusComponent } from './current-census.component';

describe('CurrentCensusComponent', () => {
  let component: CurrentCensusComponent;
  let fixture: ComponentFixture<CurrentCensusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentCensusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCensusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
