import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeshavamCity9Component } from './keshavam-city-9.component';

describe('KeshavamCity9Component', () => {
  let component: KeshavamCity9Component;
  let fixture: ComponentFixture<KeshavamCity9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeshavamCity9Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeshavamCity9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
