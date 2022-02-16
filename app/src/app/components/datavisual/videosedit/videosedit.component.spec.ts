import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoseditComponent } from './videosedit.component';

describe('VideoseditComponent', () => {
  let component: VideoseditComponent;
  let fixture: ComponentFixture<VideoseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoseditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
