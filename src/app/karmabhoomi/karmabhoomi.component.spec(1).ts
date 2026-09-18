import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarmabhoomiComponent } from './karmabhoomi.component';

describe('KarmabhoomiComponent', () => {
  let component: KarmabhoomiComponent;
  let fixture: ComponentFixture<KarmabhoomiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KarmabhoomiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KarmabhoomiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
