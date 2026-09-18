import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyContactComponent } from './sticky-contact.component';

describe('StickyContactComponent', () => {
  let component: StickyContactComponent;
  let fixture: ComponentFixture<StickyContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
