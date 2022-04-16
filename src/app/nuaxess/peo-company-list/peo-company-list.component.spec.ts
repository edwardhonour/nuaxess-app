import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoCompanyListComponent } from './peo-company-list.component';

describe('PeoCompanyListComponent', () => {
  let component: PeoCompanyListComponent;
  let fixture: ComponentFixture<PeoCompanyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeoCompanyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
