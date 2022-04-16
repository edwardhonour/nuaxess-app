import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuoteRequestComponent } from './add-quote-request.component';

describe('AddQuoteRequestComponent', () => {
  let component: AddQuoteRequestComponent;
  let fixture: ComponentFixture<AddQuoteRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuoteRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuoteRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
