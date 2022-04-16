import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberLookupComponent } from './member-lookup.component';

describe('MemberLookupComponent', () => {
  let component: MemberLookupComponent;
  let fixture: ComponentFixture<MemberLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
