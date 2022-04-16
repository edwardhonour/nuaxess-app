import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteRequestDashboardComponent } from './quote-request-dashboard.component';

describe('QuoteRequestDashboardComponent', () => {
  let component: QuoteRequestDashboardComponent;
  let fixture: ComponentFixture<QuoteRequestDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteRequestDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteRequestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
