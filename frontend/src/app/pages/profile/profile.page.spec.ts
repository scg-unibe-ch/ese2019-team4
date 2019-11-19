import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePage } from './profile.page';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Provide Service button should be hidden for customers', () => {
    component.type = 'customer';
    component.offerButtonVisibility();
    expect(document.getElementById('offer').style.display).toBe('none');
  });
  it('Provide Service button should be visible for providers', () => {
    component.type = 'provider';
    component.offerButtonVisibility();
    expect(document.getElementById('offer').style.display).toBe('block');
  });
  it('updateUser should call offerButtonVisibility', () => {
    spyOn(component, 'offerButtonVisibility');
    component.updateUser()
    expect(component.offerButtonVisibility).toHaveBeenCalled();
  });
});
