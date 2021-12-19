import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieAdminComponent } from './cookie-admin.component';

describe('CookieAdminComponent', () => {
  let component: CookieAdminComponent;
  let fixture: ComponentFixture<CookieAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookieAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
