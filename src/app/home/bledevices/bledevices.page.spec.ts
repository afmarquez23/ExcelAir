import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BledevicesPage } from './bledevices.page';

describe('BledevicesPage', () => {
  let component: BledevicesPage;
  let fixture: ComponentFixture<BledevicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BledevicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BledevicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
