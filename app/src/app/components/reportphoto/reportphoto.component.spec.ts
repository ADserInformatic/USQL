import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportphotoComponent } from './reportphoto.component';

describe('ReportphotoComponent', () => {
  let component: ReportphotoComponent;
  let fixture: ComponentFixture<ReportphotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportphotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
