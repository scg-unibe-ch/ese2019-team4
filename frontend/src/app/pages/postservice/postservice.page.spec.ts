import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PostservicePage} from './postservice.page';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('PostservicePage', () => {
  let component: PostservicePage;
  let fixture: ComponentFixture<PostservicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostservicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostservicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
