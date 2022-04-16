import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianLookupComponent } from './guardian-lookup.component';

describe('GuardianLookupComponent', () => {
  let component: GuardianLookupComponent;
  let fixture: ComponentFixture<GuardianLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardianLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
