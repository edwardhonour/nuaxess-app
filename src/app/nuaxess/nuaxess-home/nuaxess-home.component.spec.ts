import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuaxessHomeComponent } from './nuaxess-home.component';

describe('NuaxessHomeComponent', () => {
  let component: NuaxessHomeComponent;
  let fixture: ComponentFixture<NuaxessHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuaxessHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuaxessHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
