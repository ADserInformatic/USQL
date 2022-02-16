import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRegComponent } from './main-reg.component';

describe('MainRegComponent', () => {
  let component: MainRegComponent;
  let fixture: ComponentFixture<MainRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
