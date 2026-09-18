import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOfficeComponent } from './home-office.component';

describe('HomeOfficeComponent', () => {
  let component: HomeOfficeComponent;
  let fixture: ComponentFixture<HomeOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOfficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
