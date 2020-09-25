import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubhomePage } from './subhome.page';

describe('SubhomePage', () => {
  let component: SubhomePage;
  let fixture: ComponentFixture<SubhomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubhomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
