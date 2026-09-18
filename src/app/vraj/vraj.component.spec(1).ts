import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrajComponent } from './vraj.component';

describe('VrajComponent', () => {
  let component: VrajComponent;
  let fixture: ComponentFixture<VrajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrajComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VrajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
