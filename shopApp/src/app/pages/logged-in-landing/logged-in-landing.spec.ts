import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInLanding } from './logged-in-landing';

describe('LoggedInLanding', () => {
  let component: LoggedInLanding;
  let fixture: ComponentFixture<LoggedInLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoggedInLanding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedInLanding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
