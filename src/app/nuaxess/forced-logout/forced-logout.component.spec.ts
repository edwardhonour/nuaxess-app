import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcedLogoutComponent } from './forced-logout.component';

describe('ForcedLogoutComponent', () => {
  let component: ForcedLogoutComponent;
  let fixture: ComponentFixture<ForcedLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForcedLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcedLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
