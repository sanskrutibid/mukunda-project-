import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyodhyaComponent } from './ayodhya.component';

describe('AyodhyaComponent', () => {
  let component: AyodhyaComponent;
  let fixture: ComponentFixture<AyodhyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AyodhyaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AyodhyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
