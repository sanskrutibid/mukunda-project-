import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionMissionValuesComponent } from './vision-mission-values.component';

describe('VisionMissionValuesComponent', () => {
  let component: VisionMissionValuesComponent;
  let fixture: ComponentFixture<VisionMissionValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionMissionValuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisionMissionValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
