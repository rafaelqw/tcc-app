import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDetailPage } from './sensor-detail.page';

describe('SensorDetailPage', () => {
  let component: SensorDetailPage;
  let fixture: ComponentFixture<SensorDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
