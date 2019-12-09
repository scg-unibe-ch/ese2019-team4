import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePage} from './home.page';
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
  it('login button should be visible', () => {
    expect(document.getElementById('log')).not.toBeNull();
  });
  it('account button should be hidden', () => {
    expect(document.getElementById('acc')).toBeNull();
  });
  it('title should be visible', () => {
    expect(document.getElementsByClassName('ion-title')).not.toBeNull();
  })
});
