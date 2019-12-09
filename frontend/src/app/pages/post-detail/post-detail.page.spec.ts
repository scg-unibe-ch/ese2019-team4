import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostDetailPage} from './post-detail.page';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('PostDetailPage', () => {
  let component: PostDetailPage;
  let fixture: ComponentFixture<PostDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('title should be visible', () => {
    expect(document.getElementsByClassName('ion-title')).not.toBeNull();
  })
  it('back button should be visible', () => {
    expect(document.getElementsByClassName('ion-back-button')).not.toBeNull();
  })
});
