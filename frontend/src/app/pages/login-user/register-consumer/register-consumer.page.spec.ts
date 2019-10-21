import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConsumerPage } from './register-consumer.page';

describe('RegisterConsumerPage', () => {
  let component: RegisterConsumerPage;
  let fixture: ComponentFixture<RegisterConsumerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterConsumerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConsumerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
