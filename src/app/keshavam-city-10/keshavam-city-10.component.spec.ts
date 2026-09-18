import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeshavamCity10Component } from './keshavam-city-10.component';

describe('KeshavamCity10Component', () => {
  let component: KeshavamCity10Component;
  let fixture: ComponentFixture<KeshavamCity10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeshavamCity10Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeshavamCity10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
