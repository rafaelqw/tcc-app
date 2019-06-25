import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpreendimentosPage } from './empreendimentos.page';

describe('EmpreendimentosPage', () => {
  let component: EmpreendimentosPage;
  let fixture: ComponentFixture<EmpreendimentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpreendimentosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpreendimentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
