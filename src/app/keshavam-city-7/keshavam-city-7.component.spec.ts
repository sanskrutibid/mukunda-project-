import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeshavamCity7Component } from './keshavam-city-7.component';

describe('KeshavamCity7Component', () => {
  let component: KeshavamCity7Component;
  let fixture: ComponentFixture<KeshavamCity7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeshavamCity7Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeshavamCity7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
