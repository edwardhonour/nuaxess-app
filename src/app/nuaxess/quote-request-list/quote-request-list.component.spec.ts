import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteRequestListComponent } from './quote-request-list.component';

describe('QuoteRequestListComponent', () => {
  let component: QuoteRequestListComponent;
  let fixture: ComponentFixture<QuoteRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
