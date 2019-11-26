import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserPage } from './login-user.page';

describe('LoginUserPage', () => {
  let component: LoginUserPage;
  let fixture: ComponentFixture<LoginUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('title should be visible', () => {
    expect(document.getElementsByClassName('ion-title')).not.toBeNull();
  })
  it('button should be visible', () => {
    expect(document.getElementsByClassName('ion-button')).not.toBeNull();
  })
  it('login component should be visible', () => {
    expect(document.getElementsByClassName('app-login')).not.toBeNull();
  })
});
