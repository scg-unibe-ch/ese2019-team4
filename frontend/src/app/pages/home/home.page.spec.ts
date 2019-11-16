import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import {HttpClientModule} from '@angular/common/http';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be Logged out initially', () => {
    expect(component.status).toBe('Logged out');
  });
  it('should show Logged in as provider', () => {
    component.username = 'someone';
    component.type = 'provider';
    component.loggedInStatus();
    expect(component.status).toBe('Logged in as someone a provider');
  });
  it('should show Logged in as customer', () => {
    component.username = 'someone else';
    component.type = 'customer';
    component.loggedInStatus();
    expect(component.status).toBe('Logged in as someone else a customer');
  });
  it('login button should be visible', () => {
    expect(document.getElementById('log').style.display).toBe('block');
  });
  it('account button should be hidden', () => {
    expect(document.getElementById('acc').style.display).toBe('none');
  });
  it('login button should be hidden when logged in', () => {
    component.username = 'someone';
    component.loginButtonVisibility();
    expect(document.getElementById('log').style.display).toBe('none');
  });
  it('account button should be visible when logged in', () => {
    component.username = 'someone';
    component.loginButtonVisibility();
    expect(document.getElementById('acc').style.display).toBe('block');
  });
  it('update User should run loggedInStatus() and loginButtonVisibility()', () => {
    spyOn(component, 'loggedInStatus');
    spyOn(component, 'loginButtonVisibility');
    component.updateUser();
    expect(component.loginButtonVisibility).toHaveBeenCalled();
    expect(component.loggedInStatus).toHaveBeenCalled();
  });
});
