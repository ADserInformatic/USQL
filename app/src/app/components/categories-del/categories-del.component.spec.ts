import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDelComponent } from './categories-del.component';

describe('CategoriesDelComponent', () => {
  let component: CategoriesDelComponent;
  let fixture: ComponentFixture<CategoriesDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
