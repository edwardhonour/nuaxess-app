import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CensusHistoryComponent } from './census-history.component';

describe('CensusHistoryComponent', () => {
  let component: CensusHistoryComponent;
  let fixture: ComponentFixture<CensusHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CensusHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CensusHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
