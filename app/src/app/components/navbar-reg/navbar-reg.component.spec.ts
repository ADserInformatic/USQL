import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRegComponent } from './navbar-reg.component';

describe('NavbarRegComponent', () => {
  let component: NavbarRegComponent;
  let fixture: ComponentFixture<NavbarRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
