import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDelComponent } from './users-del.component';

describe('UsersDelComponent', () => {
  let component: UsersDelComponent;
  let fixture: ComponentFixture<UsersDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
