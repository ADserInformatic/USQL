import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRegComponent } from './dashboard-reg.component';

describe('DashboardRegComponent', () => {
  let component: DashboardRegComponent;
  let fixture: ComponentFixture<DashboardRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
