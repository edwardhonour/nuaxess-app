import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectDashboardComponent } from './prospect-dashboard.component';

describe('ProspectDashboardComponent', () => {
  let component: ProspectDashboardComponent;
  let fixture: ComponentFixture<ProspectDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
