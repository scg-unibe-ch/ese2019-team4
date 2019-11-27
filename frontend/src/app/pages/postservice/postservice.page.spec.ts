import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostservicePage } from './postservice.page';

describe('PostservicePage', () => {
  let component: PostservicePage;
  let fixture: ComponentFixture<PostservicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostservicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
