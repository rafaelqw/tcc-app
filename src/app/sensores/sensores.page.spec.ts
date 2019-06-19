import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensoresPage } from './sensores.page';

describe('SensoresPage', () => {
  let component: SensoresPage;
  let fixture: ComponentFixture<SensoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
