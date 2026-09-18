import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwarkaComponent } from './dwarka.component';

describe('DwarkaComponent', () => {
  let component: DwarkaComponent;
  let fixture: ComponentFixture<DwarkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DwarkaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DwarkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
